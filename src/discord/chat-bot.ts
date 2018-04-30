import { Client, Message } from 'discord.js';
import { Inject, Service } from 'typedi';
import { BotConfig } from '../config/bot-config';
import { LoggerService } from '../services/logger-service';
import { Logger } from '../utils/logger';
import { Command } from './command';
import { CommandHandler } from './command-handler';
import { CommandRegistry } from './command-registry';

@Service('chat.bot')
export class ChatBot {
    private _client: Client;

    private readonly _logger: Logger;

    commandRegistry: CommandRegistry;
    commandHandler: CommandHandler;
    config: BotConfig;

    constructor(
        @Inject('logger.service') loggerService: LoggerService,
        @Inject('command.registry') commandRegistry: CommandRegistry,
        @Inject('command.handler') commandHandler: CommandHandler,
        @Inject('bot.config') config: BotConfig,
    ) {
        this._client = new Client();
        this.commandHandler = commandHandler;
        this.commandRegistry = commandRegistry;
        this.config = config;
        this._logger = loggerService.createLogger('ChatBot');
        this._logger.log('Instance created. Registering event listeners...');
        const cmdCount: number = this.commandRegistry.getAvailableCommandsCount();
        this._logger.log('Available commands via registry', cmdCount);
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this._client.on('ready', () => {
            this._logger.log('Client is ready!');
            this._logger.log('Available commands:');
            // this.commandRegistry.getRegisteredCommandNames().forEach(cmd => console.log('[ChatBot]: > ', cmd));
            const prefix = this.config.prefix.enabled ? this.config.prefix.prefixSymbol : '';
            this.commandRegistry.getAvailableCommands().map((value: Command, key: string) => {
                let aliases;
                if (value && value.aliases && value.aliases.length > 0) {
                    aliases = value.aliases.join(', ');
                } else {
                    aliases = 'no alias';
                }
                const desc = value.description || 'no description provided';
                return `${prefix}${key} [${aliases}] - ${desc}`;
            }).forEach(str => this._logger.log('[ChatBot]: >', str));
        });

        this._client.on('message', message => {
            if (!this.checkSelf(message)) {
                this.commandHandler.handleMessageEvent(message);
            }
        });
    }

    private checkSelf(message: Message): boolean {
        return message.author.equals(this._client.user);
    }

    public auth(): void {
        this._client.login(this.config.token);
    }
}
