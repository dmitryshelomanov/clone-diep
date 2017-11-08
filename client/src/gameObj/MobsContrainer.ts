import Texture, { TextureType } from "../graphics/texture";
import HealthBar from "./bar/healthBar";

export default class Sprite extends Phaser.Particle { 

  public game: Phaser.Game;
  public ids: number;
  public maxHealth: number = 100;
  private bar: HealthBar;
  constructor(game: Phaser.Game, x: number, y: number, h: number, r: number, ids: number, t: number) { 
    super(game, x, y, new Texture(game, 50, 50, t).generateTexture());
    this.game = game;
    this.ids = ids;
    this.anchor.setTo(0.5, 0.5);
    this.rotation = r;
    this.health = h;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.maxVelocity.set(100);
    this.body.collideWorldBounds = true;
    this.body.drag.set(300);
    this.body.maxVelocity.set(200);
    this.autoCull = true;
  }

  public update(): void {

  }

}