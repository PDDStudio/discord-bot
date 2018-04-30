import { Message } from 'discord.js';
import { Command } from '../command';
import { CommandHandler } from '../command-handler';
import Container from 'typedi';
import { CommandRegistry } from '../command-registry';

export class HelpCommand implements Command {
    name: string = 'help';
    description: string = 'Ask for available commands or get information about a command.';
    guildOnly: boolean = false;
    aliases: string[] = ['--help', '-h'];
    usage: string = '[command] or [command alias] [COMMAND]';

    execute(message: Message, [...args]: string[]): void {
        const commandRegistry = Container.get<CommandRegistry>('command.registry');
        const responseLines = [];
        responseLines.push('The following commands are available');
        commandRegistry.getAvailableCommands().map((command: Command, commandName: string) => {
            responseLines.push(`${command.name} [${command.aliases.join('. ')}] - ${command.description}`);
        });
        message.reply(responseLines.join('\n'));
    }
}

module.exports = new HelpCommand();
