import State from "./state";

export default class BootState extends State {
  create(): void {
    this.game.state.start("preloader");
  }
};
