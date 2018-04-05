import { Container } from 'typedi';
import { ChatBot } from '../discord/chat-bot';
import { LoggerService } from '../services/logger-service';
import { BotConfig } from './bot-config';

export class ServicesConfigDi {

    public static init(botConfig: BotConfig): void {
        Container.set([
            { id: 'logger.service', value: new LoggerService() },
            { id: 'chat.bot', value: new ChatBot(botConfig) },
        ]);
    }

    private constructor() {}

}
