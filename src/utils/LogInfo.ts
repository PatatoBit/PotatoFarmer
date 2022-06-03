class LogInfo {

  public static client(...args: any[]) {
    console.log(`[Client]: ${args}`);
  }

  public static shard(...args: any[]) {
    console.log(`[Shard]: ${args}`);
  }

  public static cmdmanager(...args: any[]) {
    console.log(`[CommandManager]: ${args}`);
  }

}

export default LogInfo;
