import State from "./state";

const bg = require("assets/images/bg.png"); 

//skols icon
const blink = require("assets/images/blink.png");
const envise = require("assets/images/envise.png");

export default class PreloaderState extends State {

  preload(): void {
    this.game.load.image("bg", bg);
    this.game.load.image("blink", blink);
    this.game.load.image("envise", envise);
  }

  create(): void {
    this.game.state.start("main"); 
  }
  
}
