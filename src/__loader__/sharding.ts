import ShardingManager from '@src/ShardingManager';
import 'dotenv/config';

const { TOKEN } = process.env;
const shardManager = new ShardingManager(TOKEN, 'dist/client.js');

shardManager.build();
