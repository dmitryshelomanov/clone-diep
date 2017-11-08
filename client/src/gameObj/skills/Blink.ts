import ParentSkill from "./ParentSkill";
import AbstractPl from "../player/AbstractPl";

export default class Blink extends ParentSkill {

  constructor(game: Phaser.Game, player: AbstractPl) { 
    super(game, player, 60, window.innerHeight - 120, "blink");
    this.cooldown = 5;
  }

  public preActivate(): void {
    if (Number(this.lastActive) + this.cooldown * 1000 > Number(Date.now().toString())) return;
    if (this.toggle) {
      this.alpha = 1;
      this.toggle = false;
    } else { 
      this.alpha = 0.5;
      this.toggle = true;
    };
  }

  public update(): void {
    if (this.game.input.activePointer.leftButton.isDown &&
      this.toggle &&
      (Number(this.lastActive) + this.cooldown * 1000 < Number(Date.now().toString()) || this.lastActive.length === 0)) {
      this.postActivate(this.game.input.x, this.game.input.y);
      this.preActivate();
      this.lastActive = Date.now().toString();
      this.textTime.text = `${this.cooldown}`;
      this.timerLoop(5000);
    };
  }

  public postActivate(x: number, y: number): void {
    this.player.x = x;
    this.player.y = y;
    this.isActive = true;
  }

}