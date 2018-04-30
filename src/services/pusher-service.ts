import { Container } from 'typedi';
import { LoggerService } from './logger-service';
import { Logger } from '../utils/logger';
import { checkServerIdentity } from 'tls';
import { BotConfig } from '../config/bot-config';

const Pusher = require('pusher');

export default class PusherService {

    private pusher;
    private logger: Logger;

    constructor() {
        this.logger = Container.get<LoggerService>('logger.service').createLogger('PusherService');
        const config = Container.get<BotConfig>('bot.config');
        this.pusher = new Pusher(config.pusherConfig);
        this.logger.debug('PusherService initialized!');
    }

    public triggerEvent(channel: string, eventName: string, payload: any) {
        this.pusher.trigger(channel, eventName, payload);
    }
}
