import { CommandInteraction } from 'discord.js';

/* eslint-disable semi */
export type CommandInfo = {
  name: string;
  description: string;
  options: any;
  default_permission: boolean;
}
export default interface Command {
  getInfo(): CommandInfo;

  execute(interaction: CommandInteraction): Promise<void>;

}
