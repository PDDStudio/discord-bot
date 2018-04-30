import { Player } from './models/player';
import { Request } from './api/request';
import PlayerRankingApiResult from './api/player-ranking-api-result';
import PlayerRankingList from './api/player-ranking-list';
import ResponseMapper from './api/response-mapper';
import { Clan } from './models/clan';
import ClanRankingApiResult from './api/clan-ranking-api-result';

export default class CrossFire {
    private readonly request: Request = new Request();

    constructor() { }

    public async getPlayerRanking(fromPosition: number, toPosition: number): Promise<Player[]> {
        return await this.request
            .execute('ranking.json', {
                startrow: fromPosition,
                endrow: toPosition,
                name: '',
                period: 'week',
                rankType: 'user',
            })
            .then(response => {
                const jsonData = response.data;
                const apiResult: PlayerRankingApiResult = ResponseMapper.mapJson(jsonData).toClass(PlayerRankingApiResult);
                console.log('Mapped jsonData:', jsonData);
                console.log('To Result:', apiResult);
                return Promise.resolve(apiResult.ranking.rankingList);
            })
            .catch(error => {
                console.error('Could not query player ranking!', error);
                return Promise.reject(error);
            });
    }

    public async getClanRanking(fromPosition: number, toPosition: number): Promise<Clan[]> {
        return await this.request
            .execute('ranking.json', {
                startrow: fromPosition,
                endrow: toPosition,
                name: '',
                period: 'week',
                rankType: 'clan',
            })
            .then(response => {
                const jsonData = response.data;
                const apiResult: ClanRankingApiResult = ResponseMapper.mapJson(jsonData).toClass(ClanRankingApiResult);
                console.log('Mapped jsonData:', jsonData);
                console.log('To Result:', apiResult);
                return Promise.resolve(apiResult.ranking.rankingList);
            })
            .catch(error => {
                console.error('Could not query player ranking!', error);
                return Promise.reject(error);
            });
    }
}
