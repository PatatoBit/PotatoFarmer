import DiscordBot from '@src/DiscordBot';
import { Interaction } from 'discord.js';
import PingCommand from '@src/commands/common/PingCommand';
import HelpCommand from '@src/commands/common/HelpCommand';

class MainDiscordBot extends DiscordBot {

  protected async onReady(): Promise<void> {
    console.info(`Logged in as ${this.client.user.tag} !`);

    this.commandManager.registerCommand([
      new PingCommand(),
      new HelpCommand(this.client),
    ]);
  }

  protected async onInteractionCreate(interaction: Interaction): Promise<void> {
    if (!interaction.isCommand()) return;
    await this.commandManager.executeCommand(interaction);
  }

}
export default MainDiscordBot;
