import { ChatBot } from './dicord/chat-bot';
import { BotConfig, loadConfig } from './config/bot-config';
import 'reflect-metadata';

const config: BotConfig = loadConfig(process.cwd());
console.log('loaded config:', JSON.stringify(config));

console.log('Debug Output Enabled:', config.debug);

const bot = new ChatBot(config);

bot.auth();
