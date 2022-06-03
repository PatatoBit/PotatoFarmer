import { SlashCommandBuilder } from '@discordjs/builders';
import Command, { CommandInfo } from '@src/commands/Command';
import LitathaBot from '@src/LitathaBot';
import { CommandInteraction, MessageEmbed } from 'discord.js';

export default class HelpCommand implements Command {

  private readonly litathaBot: LitathaBot;

  public constructor(litathaBot: LitathaBot) {
    this.litathaBot = litathaBot;
  }

  public getInfo(): CommandInfo {
    return new SlashCommandBuilder()
      .setName('help')
      .setDescription('show all commands')
      .toJSON();
  }

  public async execute(
    interaction: CommandInteraction,
  ): Promise<void> {
    await interaction.deferReply();
    try {
      const {
        application: { commands },
      } = this.litathaBot.getClient();

      const commandList = await commands.fetch();

      const commandMap = new Map<any, any>();

      commandList.forEach(({ name, description }) => {
        commandMap.set(name, description);
      });

      await interaction.editReply({ embeds: [this.helpEmbed(commandMap)] });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private helpEmbed(commandMap: Map<any, any>): MessageEmbed {
    const helpEmbed = new MessageEmbed()
      .setTitle('')
      .setColor('#89CFF0') // #89CFF0 #4545d6
      .setTimestamp();

    commandMap.forEach((desc, name) => {
      helpEmbed.addField(name, desc);
    });

    return helpEmbed;
  }

}
