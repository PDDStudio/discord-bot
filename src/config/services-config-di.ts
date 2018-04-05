import { Container } from 'typedi';
import { ChatBot } from '../discord/chat-bot';
import { CommandHandler } from '../discord/command-handler';
import { CommandRegistry } from '../discord/command-registry';
import { LoggerService } from '../services/logger-service';
import { BotConfig } from './bot-config';

export class ServicesConfigDi {

    public static init(botConfig: BotConfig): void {
        Container.set('bot.config', botConfig);
        Container.set('logger.service', new LoggerService());
        Container.set('command.registry', new CommandRegistry(botConfig));
        Container.set('command.handler', new CommandHandler(
            Container.get<BotConfig>('bot.config'),
            Container.get<CommandRegistry>('command.registry'),
            Container.get<LoggerService>('logger.service'),
        ));
        Container.set('chat.bot', new ChatBot(
            Container.get<LoggerService>('logger.service'),
            Container.get<CommandRegistry>('command.registry'),
            Container.get<CommandHandler>('command.handler'),
            Container.get<BotConfig>('bot.config'),
        ));
    }

    private constructor() {}

}
