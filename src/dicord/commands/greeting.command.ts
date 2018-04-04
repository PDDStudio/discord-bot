import {Command} from "../command";
import {Channel, DMChannel, GroupDMChannel, Message, TextChannel} from "discord.js";

export class GreetingCommand implements Command {
    name: string = 'hello';
    description: string = 'Get a warm welcome message from (almost) a human.';
    aliases: string[] = ['hi', 'hey'];
    guildOnly: boolean = false;
    usage: string = '[command] or [command alias]';

    execute(message: Message, [...args]: string[]) {
        /*const channel: TextChannel | DMChannel | GroupDMChannel = message.channel;
        if(channel instanceof TextChannel) {
            const chat = channel as TextChannel;
            message.reply(`hey there, how's it going?`);

        } else if (channel instanceof DMChannel) {

        } else if (channel instanceof GroupDMChannel) {

        } else {

        }*/
        message.reply('Yooo, wazzaappppp ? ;) How are you bro?');
    }

}

module.exports = new GreetingCommand();
