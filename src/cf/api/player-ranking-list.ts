import { Player } from './../models/player';
import { Expose, Type } from 'class-transformer';

export default class PlayerRankingList {
    
    @Type(() => Player)
    @Expose({ name: 'RankList' })
    rankingList: Player[];

}
