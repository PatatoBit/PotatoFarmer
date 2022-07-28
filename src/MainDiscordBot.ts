import DiscordBot from '@src/DiscordBot';
import { Interaction, PresenceData } from 'discord.js';
import PingCommand from '@src/commands/common/PingCommand';
import HelpCommand from '@src/commands/common/HelpCommand';
import LogInfo from '@utils/LogInfo';

class MainDiscordBot extends DiscordBot {

  private presence: PresenceData = {
    status: 'online',
    activities: [{
      name: 'Under Development',
      type: 'PLAYING',
    }],
  };

  protected async onReady(): Promise<void> {
    LogInfo.client(`✅Logged in as ${this.client.user.tag} !`);

    const setPresence = () => this.client.user.setPresence(this.presence);

    setPresence();
    setInterval(setPresence, 5 * 60 * 1000);

    this.commandManager.registerCommand([
      new PingCommand(),
      new HelpCommand(this),
    ]);
  }

  protected async onInteractionCreate(interaction: Interaction): Promise<void> {
    if (!interaction.isCommand()) return;
    await this.commandManager.executeCommand(interaction);
  }

}
export default MainDiscordBot;
