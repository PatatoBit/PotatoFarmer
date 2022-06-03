import { SlashCommandBuilder } from '@discordjs/builders';
import Command, { CommandInfo } from '@src/commands/Command';
import { Client, CommandInteraction } from 'discord.js';

export default class HelpCommand implements Command {

  private readonly client: Client;

  public constructor(client: Client) {
    this.client = client;
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
      const { application: { commands } } = this.client;
      const commandList = await commands.fetch();

      const commandInfo = new Map<string, string>();

      const commandMap = new Map<any, any>();

      commandList.forEach(({ name, description }) => {
        commandMap.set(name, description);
      });

      let commandString = '';

      commandMap.forEach((desc, name) => {
        console.log(name, desc);
        commandString += `**${name}**: ${desc} \n`;
      });
      // CommandName: description

      await interaction.editReply(commandString);
    } catch (error: any) {
      throw new Error(error.message);
    }

  }

}
