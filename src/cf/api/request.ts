import { default as axios, AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import PlayerRankingApiResult from './player-ranking-api-result';

export class Request {

    private static AXIOS_CONFIG: AxiosRequestConfig = {
        baseURL: 'http://crossfire.z8games.com/rest/',
        responseType: 'json',
        withCredentials: true,
        headers: {
            Referer: 'http://crossfire.z8games.com/playerranking.html',
        },
        transformRequest: [(request, headers) => Request.mapRequest(request, headers)],
        transformResponse: [response => Request.mapResponse(response)],
    };

    private static mapRequest(request: any, headers: any): any {
        console.log('Get-Request Header: ', headers);
        try {
            headers['Referer'] = 'http://crossfire.z8games.com/playerranking.html';
            headers.common['Referer'] = 'http://crossfire.z8games.com/playerranking.html';
            console.log('Get-Request Header (v2): ', headers);
        } catch (error) {
            console.log('Error:"', error);
        }
        return request;
    }

    private static mapResponse(res: any): any {
        console.log('Get-Response:', res);
        try {
            res.headers['Access-Control-Allow-Origin'] = '*';
            res.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS';
            res.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Content-Length, X-Requested-With';
            // const apiRepsonse = PreDefinedMapping.callDeserialize(PlayerRankingApiResult, res);
        } catch (error) {
            console.log('Error', error);
        }
        return res;
    }

    private readonly http: AxiosInstance;

    constructor() {
        this.http = axios.create(Request.AXIOS_CONFIG);
        console.log('Created Axios Instance:', this.http);
    }

    public execute(subUrl: string, optionalParams?: any): AxiosPromise {
        if (optionalParams) {
            return this.http.get(subUrl, {
                url: subUrl,
                method: 'get',
                params: optionalParams,
            });
        }
        return this.http.get(subUrl, {
            url: subUrl,
            method: 'get',
        });
    }
}
