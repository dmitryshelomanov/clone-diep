import AbstractPL from "./AbstractPl";
import Texture, { TextureType } from "../../graphics/texture";

export default class Enemy extends AbstractPL { 

  constructor(game: Phaser.Game, x: number, y: number, r: number, ids: number = 0) { 
    super(game, x, y, r, ids, (new Texture(game, 0, 0, TextureType.CIRCLE, 0x7699c9, 0x3f5e89, 60)).generateTexture());
    this.addWeapon(0);
    this.renderWeapon();
    this.addChild(new Texture(game, 0, 0, TextureType.CIRCLE, 0x7699c9, 0x3f5e89, 60));
  }
  
}