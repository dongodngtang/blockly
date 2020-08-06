class Scratch3AIStarter {
  constructor (runtime) {
    this.runtime = runtime;
  }
  getPrimitives () {
    return {
      AIStarter_SmartBotSetMovment: this.AIStarter_SmartBotSetMovment
    };
  }
  AIStarter_SmartBotSetMovment (args) {
    console.log(args);
  }
}

module.exports = Scratch3AIStarter;
