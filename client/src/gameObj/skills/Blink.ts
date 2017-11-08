import ParentSkill, { Style } from "./ParentSkill";
import AbstractPl from "../player/AbstractPl";
import Texture, { TextureType } from "../../graphics/texture";

export default class Blink extends ParentSkill {

  private cursorTexture: any;

  constructor(game: Phaser.Game, player: AbstractPl) { 
    super(game, player, 60, window.innerHeight - 120, "blink");
    this.cooldown = 5;
    this.addChild(new Phaser.Text(this.game, 0, -60, "Q", Style));
    this.cursorTexture = new Texture(this.game, 20, 20, TextureType.BlinkCursor);
    this.game.add.existing(this.cursorTexture);
    this.cursorTexture.visible = false;
  }

  public preActivate(): void {
    if (Number(this.lastActive) + this.cooldown * 1000 > Number(Date.now().toString())) return;
    if (this.toggle) {
      this.alpha = 1;
      this.toggle = false;
      this.cursorTexture.visible = false;
    } else { 
      this.alpha = 0.5;
      this.toggle = true;
      this.cursorTexture.visible = true;
    };
  }

  public update(): void {
    if (this.toggle) { 
      this.cursorTexture.x = this.game.input.x + this.game.camera.x;
      this.cursorTexture.y = this.game.input.y + this.game.camera.y;
    };
    if (this.game.input.activePointer.leftButton.isDown &&
      this.toggle &&
      (Number(this.lastActive) + this.cooldown * 1000 < Number(Date.now().toString()) || this.lastActive.length === 0)) {
      this.postActivate(this.game.input.x + this.game.camera.x, this.game.input.y + this.game.camera.y);
      this.preActivate();
      this.lastActive = Date.now().toString();
      this.textTime.text = `${this.cooldown}`;
      this.timerLoop();
    };
  }

  public postActivate(x: number, y: number): void {
    this.player.x = x;
    this.player.y = y;
    this.isActive = true;
  }

}