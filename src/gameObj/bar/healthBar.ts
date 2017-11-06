import Texture, { TextureType } from "../../graphics/texture";
import Player from "../Player";
import MobsContrainer from "../MobsContrainer";

export default class HealthBar extends Phaser.Particle { 

  public game: Phaser.Game;
  private player: (Player|MobsContrainer);
  private healthInner: Phaser.Sprite;
  private offsetHX: number = 0;
  private offsetHY: number = 40;

  constructor(game: Phaser.Game, player: (Player|MobsContrainer)) { 
    super(game, 0, 0, new Texture(game, 0, 0, TextureType.HealthBarWrap).generateTexture());
    this.player = player;
    this.width = player.width;
    this.anchor.setTo(0.5, 0.5);
    this.healthInner = this.game.make.sprite(0, 0, new Texture(game, 0, 0, TextureType.HealthBarInner).generateTexture());
    this.healthInner.anchor.setTo(0.5, 0.5);
  }

  update(): void { 
    this.x = this.player.x + this.offsetHX;
    this.y = this.player.y + this.offsetHY;
  }

}