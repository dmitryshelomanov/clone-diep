import Texture, { TextureType } from "../graphics/texture";
import HealthBar from "./bar/HealthBar";

export default class Sprite extends Phaser.Particle { 

  public game: Phaser.Game;
  public ids: number;
  
  constructor(game: Phaser.Game, x: number, y: number, h: number, r: number, ids: number) { 
    super(game, x, y, new Texture(game, 50, 50, TextureType.mobSquare).generateTexture());
    this.game = game;
    this.ids = ids;
    this.anchor.setTo(0.5, 0.5);
    this.rotation = r;
    this.health = h;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.renderHealth();
  }

  public update(): void { 
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.rotation += 0.01;
  }

  private renderHealth(): void { 
    console.log("health render")
    this.game.add.existing(new HealthBar(this.game, this));
  }

}