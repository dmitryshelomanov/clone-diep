import Texture, { TextureType } from "../../graphics/texture";
import Player from "../Player";
import MobsContrainer from "../MobsContrainer";

export default class HealthBar extends Phaser.Sprite { 

  public game: Phaser.Game;
  private player: (Player|MobsContrainer);
  private healthInner: Phaser.Sprite;
  private offsetHX: number = 0;
  private offsetHY: number = 0;
  
  constructor(game: Phaser.Game, player: (Player|MobsContrainer)) { 
    super(game, 0, -(player.height - 10), new Texture(game, 0, 0, TextureType.HealthBarWrap).generateTexture());
    this.player = player;
    this.offsetHY = player.height;
    this.width = player.width;
    this.anchor.setTo(0.5, 0.5);
  }

}