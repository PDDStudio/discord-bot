import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { Container } from 'typedi';
import { BotConfig, loadConfig } from './config/bot-config';
import { ServicesConfigDi } from './config/services-config-di';
import { ChatBot } from './discord/chat-bot';
import { LoggerService } from './services/logger-service';

dotenv.config();
const config: BotConfig = loadConfig(process.cwd());

ServicesConfigDi.init(config);

const loggerService = Container.get<LoggerService>('logger.service');
const logger = loggerService.createLogger('index');

logger.info('loaded config:', JSON.stringify(config));

logger.info('Debug Output Enabled:', config.debug);

const bot = Container.get<ChatBot>('chat.bot');

bot.auth();
