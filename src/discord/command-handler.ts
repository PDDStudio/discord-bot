import { Message, TextChannel } from 'discord.js';
import { Inject, Service } from 'typedi';
import { BotConfig } from '../config/bot-config';
import { LoggerService } from '../services/logger-service';
import { Logger } from '../utils/logger';
import { Command } from './command';
import { CommandRegistry } from './command-registry';

@Service('command.handler')
export class CommandHandler {

    private readonly logger: Logger;
    config: BotConfig;
    commandRegistry: CommandRegistry;

    constructor(@Inject('bot.config') config: BotConfig,
                @Inject('command.registry') commandRegistry: CommandRegistry,
                @Inject('logger.service') loggerService: LoggerService) {
        this.logger = loggerService.createLogger('CommandHandler');
        this.config = config;
        this.commandRegistry = commandRegistry;
    }

    private shouldHandleMessage(message: Message): boolean {
        if (this.config.prefix.enabled) {
            return message.content.startsWith(this.config.prefix.prefixSymbol) && !message.author.bot;
        }
        return !message.author.bot;
    }

    private checkCommandRestrictions(command: Command, message: Message): boolean {
        if (command.guildOnly) {
            return !(message.channel instanceof TextChannel);
        }
        return true;
    }

    private extractArgsFromMessage(message: Message): string[] {
        if (this.config.prefix.enabled) {
            return message.content.slice(this.config.prefix.prefixSymbol.length).split(/ +/);
        }
        return message.content.split(/ +/);
    }

    public handleMessageEvent(message: Message) {
        this.logger.log('Evaluating command for message', `"${message.content}"`);

        if (!this.shouldHandleMessage(message)) {
            this.logger.log('Message should not be handled. Skipping further processing...');
            return;
        }

        const args: string[] = this.extractArgsFromMessage(message);
        const commandName = args.shift().toLowerCase();
        const command = this.commandRegistry.findCommand(commandName);
        if (command === null || command === undefined) {
            this.logger.log('No command specification found for target command:', `"${commandName}"`);
        } else if (!this.checkCommandRestrictions(command, message)) {
            this.logger.log('Command does not match the required restriction policy!');
            message.reply(`I'm not allowed to answer this here, sorry!`);
        } else {
            this.logger.log('Executing target command with args (if any) !');
            try {
                command.execute(message, args);
            } catch (error) {
                this.logger.log('An error occurred when trying to execute command', `${command} with args: ${args}`, error);
                message.reply('Something went wrong while trying to execute this command. Please try again later!');
            }
        }

    }

}