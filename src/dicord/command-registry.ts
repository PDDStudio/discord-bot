import * as fs from 'fs';
import * as path from 'path';
import { Client, Collection, Message } from 'discord.js';
import { Command } from './command';
import { BotConfig } from '../config/bot-config';

export class CommandRegistry {

    private readonly _commandFiles: string[];
    private readonly _commandCollection: Collection<string, Command>;
    private readonly _commandDirFullPath: string;

    constructor(config: BotConfig) {
        const configCommandDir: string = config.commandsDir; // `${__dirname}/commands`
        if (path.isAbsolute(configCommandDir)) {
            this._commandDirFullPath = configCommandDir;
        } else {
            this._commandDirFullPath = path.resolve(__dirname, configCommandDir);
        }

        if (!fs.existsSync(this._commandDirFullPath)) {
            throw new Error(`Directory not found: ${this._commandDirFullPath}`);
        }

        this._commandCollection = new Collection();
        this._commandFiles = fs.readdirSync(this._commandDirFullPath);
        this.registerCommands();
    }

    private registerCommands() {
        for (const file of this._commandFiles) {

            if (!file.includes('.command.')) {
                console.log(`Skipping file ${file} as it doesn't match filter criteria!`);
                continue;
            }
            const pathFull = path.resolve(this._commandDirFullPath, file);
            console.log('[CommandRegistry]', 'Importing command from', file, `(${pathFull})`);
            try {
                const command: Command = require(`${pathFull}`);
                this._commandCollection.set(command.name, command);
            } catch (error) {
                console.log('Error while trying to load command from', file, ':', error);
            }
        }
    }

    public getAvailableCommands(): Collection<string, Command> {
        return this._commandCollection;
    }

    public getAvailableCommandsCount(): number {
        return this._commandCollection.size;
    }

    public getRegisteredCommandNames(): string[] {
        const commands = this._commandCollection.map<string>((value, key) => key);
        return commands;
    }

    public findCommand(commandName: string): Command {
        return this._commandCollection.get(commandName) || this._commandCollection.find(cmd => {
            cmd.aliases.forEach(alias => {
                if (alias.match(commandName)) {
                    return cmd;
                }
            });
            return null;
        });
    }

}
