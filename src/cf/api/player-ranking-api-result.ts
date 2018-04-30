import PlayerRankingList from './player-ranking-list';
import { Type, Expose } from 'class-transformer';

export default class PlayerRankingApiResult {
    @Expose({ name: 'APIresult' })
    apiResult: string;

    @Expose({ name: 'APImessage' })
    apiMessage: string;

    @Expose({ name: 'TotalCount' })
    totalCount: number;

    @Expose({ name: 'Count' })
    count: number;
    
    @Type(() => PlayerRankingList)
    @Expose({ name: 'Ranking' })
    ranking: PlayerRankingList;
}
