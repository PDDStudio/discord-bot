import { Message } from 'discord.js';

export interface Command {
    name: string;
    description: string;
    guildOnly: boolean;
    aliases: string[];
    usage: string;

    execute(message: Message, [...args]: string[]): void;
}