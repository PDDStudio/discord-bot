import { Client, DMChannel, GroupDMChannel, Message, TextChannel } from 'discord.js';
import { CommandRegistry } from './command-registry';
import { BotConfig } from '../config/bot-config';
import { CommandHandler } from './command-handler';
import { Command } from './command';

export class ChatBot {
    private _client: Client;
    private readonly _commandRegistry: CommandRegistry;
    private readonly _commandHandler: CommandHandler;

    constructor(private _config: BotConfig) {
        this._client = new Client();
        this._commandRegistry = new CommandRegistry(_config);
        this._commandHandler = new CommandHandler(this._commandRegistry, this._config);
        console.log(
            '[ChatBot]:',
            'Instance created. Registering event listeners...',
        );
        const cmdCount: number = this._commandRegistry.getAvailableCommandsCount();
        console.log('[ChatBot]:', 'Available commands via registry', cmdCount);
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this._client.on('ready', () => {
            console.log('[ChatBot]:', 'Client is ready!');
            console.log('[ChatBot]:', 'Available commands:');
            // this._commandRegistry.getRegisteredCommandNames().forEach(cmd => console.log('[ChatBot]: > ', cmd));
            const prefix = this._config.prefix.enabled ? this._config.prefix.prefixSymbol : '';
            this._commandRegistry.getAvailableCommands().map((value: Command, key: string) => {
                let aliases;
                if (value.aliases.length > 0) {
                    aliases = value.aliases.join(', ');
                } else {
                    aliases = 'no alias';
                }
                const desc = value.description || 'no description provided';
                return  `${prefix}${key} [${aliases}] - ${desc}`;
            }).forEach(str => console.log('[ChatBot]: >', str));
        });

        this._client.on('message', message => {
            if (!this.checkSelf(message)) {
                this._commandHandler.handleMessageEvent(message);
            }
        });
    }

    private checkSelf(message: Message): boolean {
        return message.author.equals(this._client.user);
    }

    public auth(): void {
        this._client.login(this._config.token);
    }
}
