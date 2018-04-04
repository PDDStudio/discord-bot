import 'reflect-metadata';
import { BotConfig, loadConfig } from './config/bot-config';
import { ChatBot } from './discord/chat-bot';

const config: BotConfig = loadConfig(process.cwd());
console.log('loaded config:', JSON.stringify(config));

console.log('Debug Output Enabled:', config.debug);

const bot = new ChatBot(config);

bot.auth();
