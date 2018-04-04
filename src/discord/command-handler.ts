import { Message, TextChannel } from 'discord.js';
import { BotConfig } from '../config/bot-config';
import { Command } from './command';
import { CommandRegistry } from './command-registry';

export class CommandHandler {

    constructor(private _commandRegistry: CommandRegistry, private _config: BotConfig) {
    }

    private _log(...message: string[]) {
        const values: string[] = ['[CommandHandler]:'];
        message.forEach(entry => values.push(entry));
        console.log(values.join(' '));
    }

    private shouldHandleMessage(message: Message): boolean {
        if (this._config.prefix.enabled) {
            return message.content.startsWith(this._config.prefix.prefixSymbol) && !message.author.bot;
        } else {
            return !message.author.bot;
        }
    }

    private checkCommandRestrictions(command: Command, message: Message): boolean {
        if (command.guildOnly) {
            return !(message.channel instanceof TextChannel);
        } else {
            return true;
        }
    }

    private extractArgsFromMessage(message: Message): string[] {
        if (this._config.prefix.enabled) {
            return message.content.slice(this._config.prefix.prefixSymbol.length).split(/ +/);
        } else {
            return message.content.split(/ +/);
        }
    }

    public handleMessageEvent(message: Message) {
        this._log('Evaluating command for message', `"${message.content}"`);

        if (!this.shouldHandleMessage(message)) {
            this._log('Message should not be handled. Skipping further processing...');
            return;
        }

        const args: string[] = this.extractArgsFromMessage(message);
        const commandName = args.shift().toLowerCase();
        const command = this._commandRegistry.findCommand(commandName);
        if (command === null || command === undefined) {
            this._log('No command specification found for target command:', `"${commandName}"`);
        } else if (!this.checkCommandRestrictions(command, message)) {
            this._log('Command does not match the required restriction policy!');
            message.reply(`I'm not allowed to answer this here, sorry!`);
        } else {
            this._log('Executing target command with args (if any) !');
            try {
                command.execute(message, args);
            } catch (error) {
                this._log('An error occurred when trying to execute command', `${command} with args: ${args}`, error);
                message.reply('Something went wrong while trying to execute this command. Please try again later!');
            }
        }

    }

}