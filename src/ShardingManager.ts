/* eslint-disable no-underscore-dangle */
import { Shard, ShardingManager as Sharding } from 'discord.js';
import LogInfo from '@utils/LogInfo';

class ShardingManager {

  private readonly manager: Sharding;

  public constructor(TOKEN: string, clientPath: string) {
    this.manager = new Sharding(
      clientPath,
      {
        shardArgs: ['--ansi', '--color'],
        token: TOKEN,
      },
    );
  }

  public async build(): Promise<void> {
    this.manager.on('shardCreate', this.onShardCreate.bind(this));

    this.manager.spawn().then(this.onShardMessage.bind(this));
  }

  private onShardCreate(shard: Shard): void {
    LogInfo.shard(`Shard Launched: ${shard.id}`);
  }

  private onShardMessage(shards: Shard[]): void {
    shards.forEach((shard) => {
      shard.on('message', (message) => LogInfo.shard(
        `${shard.id}: ${message._eval}: ${message._result}`,
      ));

      shard.on('ready', () => LogInfo.shard(
        'Sharding Ready!',
      ));
    });
  }

}

export default ShardingManager;
