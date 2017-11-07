import Player from "../Player";
import Texture, { TextureType } from "../../graphics/texture";

export default class Weapon extends Phaser.Weapon { 

  public game: Phaser.Game;
  public texture: Texture;
  public sprite: Phaser.Sprite;
  public damage: number = 10;

  constructor(
    game: Phaser.Game, player: Player, a: number = null, c: number, b: number
  ) { 
    super(game, null);
    this.game = game;
    this.texture = new Texture(game, player.anchor.x, player.anchor.y, TextureType.WEAPON, 0xb2a0a0, 0x655656);
    this.bulletSpeed = 1000;
    this.fireRate = 100;
    this.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
    this.bulletKillDistance = 1000;
    this.game.physics.enable(this, Phaser.Physics.ARCADE, false);
    this.createBullets(20, new Texture(game, 0, 0, TextureType.CIRCLE, c, b, 20).generateTexture());
    
  }


}