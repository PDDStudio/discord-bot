import { Player } from './../models/player';
import { Expose, Type } from 'class-transformer';
import { Clan } from '../models/clan';

export default class ClanRankingList {

    @Type(() => Clan)
    @Expose({ name: 'RankList' })
    rankingList: Clan[];

}
