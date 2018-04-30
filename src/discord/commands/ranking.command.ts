import { Command } from '../command';
import { Container } from 'typedi';
import { CrossFireService } from '../../services/crossfire-service';
import { Message } from 'discord.js';
import { Player } from '../../cf';

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

        }
    }

    private async printPlayerRanking(crossfireService: CrossFireService): Promise<Player[]> {
        return await crossfireService.getPlayerRanking(1, 10);
    }

    private printClanRanking() { }
}

module.exports = new RankingCommand();
