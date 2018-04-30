import { Service } from 'typedi';
import { CrossFire, Player, Clan } from '../cf';

@Service('crossfire.service')
export class CrossFireService {

    private crossFire: CrossFire;
    constructor() {
        this.crossFire = new CrossFire();
    }

    public async getPlayerRanking(fromPosition: number, toPosition: number): Promise<Player[]> {
        return await this.crossFire.getPlayerRanking(fromPosition, toPosition);
    }

    public async getClanRanking(fromPosition: number, toPosition: number): Promise<Clan[]> {
        return await this.crossFire.getClanRanking(fromPosition, toPosition);
    }

}
