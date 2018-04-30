import { Expose } from 'class-transformer';

export class Player {

    name: string;
    ign: string;
    id: number;
    usn: number;
    @Expose({ name: 'xp_point' })
    experiencePoints: number;
    @Expose({ name: 'total_xp' })
    experiencePointsTotal: number;
    rank: number;
    @Expose({ name: 'rank_title' })
    rankTitle: string;
    isMarshal: boolean;
    
}
