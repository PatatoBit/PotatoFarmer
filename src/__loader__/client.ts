import MainDiscordBot from '@src/MainDiscordBot';
import 'dotenv/config';

const { TOKEN } = process.env;
const discordBot = new MainDiscordBot(TOKEN);

discordBot.build();
