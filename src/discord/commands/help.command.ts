import { Message } from 'discord.js';
import { Command } from '../command';

export class HelpCommand implements Command {
    name: string = 'help';
    description: string = 'Ask for available commands or get information about a command.';
    guildOnly: boolean = false;
    aliases: string[] = ['--help', '-h'];
    usage: string = '[command] or [command alias] [COMMAND]';

    execute(message: Message, [...args]: string[]): void {
        message.reply('This functionality is about to come soon!');
    }
}

module.exports = new HelpCommand();
