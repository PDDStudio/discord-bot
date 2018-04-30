import { Expose } from 'class-transformer';

export class Clan {
    id: number;

    @Expose({ name: 'clankey' })
    clanKey: number;

    @Expose({ name: 'clanname' })
    clanName: string;

    @Expose({ name: 'marklayer01' })
    markLayer01: number;

    @Expose({ name: 'marklayer02' })
    markLayer02: number;

    @Expose({ name: 'marklayer03' })
    markLayer03: number;

    @Expose({ name: 'marklayer04' })
    markLayer04: number;

    @Expose({ name: 'xp_point' })
    xpPoints: number;

    rank: number;
    pattern: string;

}
