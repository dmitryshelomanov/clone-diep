import State from "./state";

const bg = require("assets/images/bg.png"); 
const bullet = require("assets/images/bullet.png");
const bullet1 = require("assets/images/bullet1.png");
const health = require("assets/images/health.png");
const healthIn = require("assets/images/healthIn.png");
const pl = require("assets/images/pl.png");
const pl1 = require("assets/images/pl1.png");

export default class PreloaderState extends State {

  preload(): void {
    this.game.load.image("bg", bg);
    this.game.load.image("bullet", bullet);
    this.game.load.image("bullet1", bullet1);
    this.game.load.image("health", health);
    this.game.load.image("healthIn", healthIn);
    this.game.load.image("pl", pl);
    this.game.load.image("pl1", pl1);
  }

  create(): void {
    this.game.state.start("main"); 
  }
  
}
