import { Command } from '../command';
import { Container } from 'typedi';
import { CrossFireService } from '../../services/crossfire-service';
import { Message } from 'discord.js';
import { Player, Clan } from '../../cf';

export class RankingCommand implements Command {
    name: string = 'ranking';
    description: string = 'Get information about the current Top Player / Clan Ranking';
    guildOnly: boolean = false;
    aliases: string[] = ['ranked'];
    usage: string = '[command] or [command alias] clan|player';

    execute(message: Message, [...args]: string[]): void {
        const crossFireService = Container.get<CrossFireService>('crossfire.service');
        if (message.content.endsWith('player')) {
            this.printPlayerRanking(crossFireService).then(response => {
                message.reply('This is the current Player Ranking:');
                response.forEach(player => {
                    message.reply(`Rank ${player.rank}. ${player.name} (USN: ${player.usn})`);
                });
            });
        } else if (message.content.endsWith('clan')) {
            this.printClanRanking(crossFireService).then(response => {
                message.reply('This is the current Clan Ranking:');
                response.forEach(clan => {
                    message.reply(`Rank ${clan.rank}. ${clan.clanName} (XP: ${clan.xpPoints})`);
                });
            });
        }
    }

    private async printPlayerRanking(crossfireService: CrossFireService): Promise<Player[]> {
        return await crossfireService.getPlayerRanking(1, 10);
    }

    private async printClanRanking(crossfireService: CrossFireService): Promise<Clan[]> {
        return await crossfireService.getClanRanking(1, 10);
    }

}

module.exports = new RankingCommand();
