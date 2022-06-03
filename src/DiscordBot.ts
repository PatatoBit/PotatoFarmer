import { Client, Intents, Interaction } from 'discord.js';
import { REST as DiscordAPI } from '@discordjs/rest';
import CommandManager from '@src/commands/CommandManager';

abstract class DiscordBot {

  protected readonly client: Client;

  private readonly intents: number[] = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ];

  private readonly discordAPI: DiscordAPI;

  protected readonly commandManager: CommandManager;

  private readonly TOKEN: string;

  public constructor(TOKEN: string) {
    this.client = new Client({ intents: this.intents });
    this.discordAPI = new DiscordAPI({ version: '10' }).setToken(TOKEN);
    this.commandManager = new CommandManager(this.client, this.discordAPI);
    this.TOKEN = TOKEN;

    process.on('SIGINT', async () => {
      this.client.destroy();
      console.log('Good Bye');
    });
  }

  public async build(): Promise<void> {
    await this.client.login(this.TOKEN);

    this.client.on('ready', this.onReady.bind(this));
    this.client.on('interactionCreate', this.onInteractionCreate.bind(this));
  }

  protected abstract onReady(): void;

  protected abstract onInteractionCreate(interaction: Interaction): Promise<void>;

}

export default DiscordBot;
