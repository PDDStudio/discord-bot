import ClanRankingList from './clan-ranking-list';
import { Type, Expose } from 'class-transformer';

export default class ClanRankingApiResult {
    @Expose({ name: 'APIresult' })
    apiResult: string;

    @Expose({ name: 'APImessage' })
    apiMessage: string;

    @Expose({ name: 'TotalCount' })
    totalCount: number;

    @Expose({ name: 'Count' })
    count: number;

    @Type(() => ClanRankingList)
    @Expose({ name: 'Ranking' })
    ranking: ClanRankingList;
}
