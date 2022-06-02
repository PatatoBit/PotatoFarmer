import { Client, Intents } from 'discord.js';

class DiscordBot {

  private readonly client: Client;

  private readonly intents: number[] = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ];

  private readonly TOKEN: string;

  public constructor(TOKEN: string) {
    this.client = new Client({ intents: [this.intents] });
    this.TOKEN = TOKEN;
  }

  public build(): void {
    this.client.login(this.TOKEN);
  }

}

export default DiscordBot;
