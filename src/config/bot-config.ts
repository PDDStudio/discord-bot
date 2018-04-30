import * as fs from 'fs';
import * as path from 'path';

export interface BotConfig {
    prefix: PrefixOptions;
    debug: boolean;
    token: string;
    commandsDir: string;
    pusherConfig: PusherConfig;
}

export interface PrefixOptions {
    enabled: boolean;
    prefixSymbol: string;
}

export interface PusherConfig {
    appId: string;
    key: string;
    secret: string;
    cluster: string;
    encrypted: boolean;
}

export function loadConfig(dirPath: string, configFileName: string = 'bot.config.json'): BotConfig {
    const fullPath = path.resolve(dirPath, configFileName);
    console.log('[BotConfig]: Trying to load config from: ', fullPath);
    try {
        const config: BotConfig = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        console.log('Loaded configuration at', fullPath);
        // Object.assign(config, defaultConfig);
        return config;
    } catch (error) {
        console.error('Unable to parse config file:', dirPath, 'file:', configFileName, error);
        process.exit(-1);
    }
}