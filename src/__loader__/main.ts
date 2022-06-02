import DiscordBot from '@src/DiscordBot';
import 'dotenv/config';

const { TOKEN } = process.env;
const discordBot = new DiscordBot(TOKEN);

discordBot.build();
