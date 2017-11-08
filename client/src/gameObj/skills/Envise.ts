import ParentSkill, { Style } from "./ParentSkill";
import AbstractPl from "../player/AbstractPl";

export default class Envise extends ParentSkill {

  constructor(game: Phaser.Game, player: AbstractPl) { 
    super(game, player, (60 * 2) + 20, window.innerHeight - 120, "envise");
    this.cooldown = 5;
    this.aliveTime = 5;
    this.addChild(new Phaser.Text(this.game, 0, -60, "E", Style));
  }

  public preActivate(): void {
    if (this.isActive) return;
    this.alpha = .5;
    this.textTime.text = this.aliveTime.toString();
    this.isActive = true;
    this.postActivate();
  }

  public postActivate(): void {
    this.timerLoop(this.abort);
    this.player.alpha = .5;
    this.player.body.checkCollision.none = true;
  } 

  public abort(): void {
    console.log("abort1");
    if (!this.isActive) return;
    console.log("abort");
    this.abortTimer();
    this.textTime.text = this.cooldown.toString();
    this.timerLoop(() => { 
      this.alpha = 1;
      this.isActive = false;
    });
    this.player.alpha = 1;
    this.player.body.checkCollision.none = false;
  }

  public update(): void {

  }

}