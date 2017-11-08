import AbstractPL from "./AbstractPl";
import Texture, { TextureType } from "../../graphics/texture";
import SkillBlink from "../skills/Blink";

export default class Player extends AbstractPL { 
  
  constructor(game: Phaser.Game, x: number, y: number, r: number, ids: number = 0) { 
    super(game, x, y, r, ids, (new Texture(game, 0, 0, TextureType.CIRCLE, 0xe14a4a, 0x6f2828, 60)).generateTexture());
    this.addWeapon(0);
    this.renderWeapon();
    this.addSkill(new SkillBlink(this.game, this));
    this.renderSkills();
    this.game.camera.follow(this);
  }

  private rotationToPointer(): void { 
    this.rotation = this.game.physics.arcade.angleToPointer(this);
  }

  private move(): void { 
    this.rotationToPointer();
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) { 
      this.body.velocity.y -= this.speed;
    };
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) { 
      this.body.velocity.y = this.speed;
    };
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) { 
      this.body.velocity.x = this.speed;
    };
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) { 
      this.body.velocity.x -= this.speed;
    };
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) { 
      this.fire();
    };
  }

  public update(): void { 
    this.move();
    this.updateWeaponContainer();
    this.acticateSkill();
  }

}