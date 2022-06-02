import MainDiscordBot from '@src/MainDiscordBot';
import 'dotenv/config';

const { TOKEN } = process.env;
const discordBot = new MainDiscordBot(TOKEN);

try {
  discordBot.build();
} catch (error: any) {
  console.log(error);
}
