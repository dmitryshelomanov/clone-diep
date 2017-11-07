import Weapon from "../gameObj/weapon/weapon";
import Player from "./Player";

export default class Sprite extends Phaser.Particle { 

  public game: Phaser.Game;
  public weapon: Weapon;
  public player: Player;

  constructor(game: Phaser.Game, x: number, y: number, a: number, player: Player) { 
    super(game, x, y);
    this.game = game;
    this.player = player;
    this.anchor.setTo(0, 0.5);
    this.angle = a;
    this.weapon = new Weapon(game, player, 0, 0xe14a4a, 0x6f2828);
    this.loadTexture(this.weapon.texture.generateTexture());
    this.weapon.trackSprite(this, 0, 0, false);
  }

  public collide(obj: any, cb?:Function): void {
    this.game.physics.arcade.collide(obj, this.weapon.bullets, cb ? cb : null);
  }

  public update() {
    this.weapon.fireAngle = this.player.angle + this.angle;
  }   

}