import Emiter from "../../socket";
import Texture, { TextureType } from "../../graphics/texture";
import Weapon from "../weapon/weapon";
import WeaponContainer from "../WeaponContainer";
import ParentSkill from "../skills/ParentSkill";

abstract class AbstractPl extends Phaser.Sprite {
  
  public game: Phaser.Game;
  public speed: number = 300;
  static x: number = 200;
  static y: number = 200;
  public ids: (string|number) = 0;
  public maxHealth: number = 100;
  public weapons: Array<any> = [];
  public alive: boolean = true;
  protected skills: Array<ParentSkill> = [];

  /**
   * Общий класс для плеера и врага
   * @param game 
   * @param x 
   * @param y 
   * @param r 
   * @param ids
   * @param t
   */
  public constructor(game: Phaser.Game, x: number, y: number, r: number, ids: number = 0, t: any) { 
    super(game, x, y, t);
    this.ids = ids;
    this.anchor.setTo(0.5, 0.5);
    this.rotation = r;
    this.game.physics.arcade.enable(this, true);
    this.body.drag.set(this.speed + 100);
    this.body.maxVelocity.set(this.speed);
    this.body.collideWorldBounds = true;
    this.addChild(new Texture(game, 0, 0, TextureType.CIRCLE, 0xe14a4a, 0x6f2828, 60));
  }

  /**
   * Рендер оружия
   */
  protected renderWeapon(): void { 
    for (let i = 0; i < this.weapons.length; i++) { 
      this.addChildAt(this.weapons[i], 0);
    };
  }

  /**
   * Метод для стрельбы
   */
  public fire(): void { 
    for (let i = 0; i < this.weapons.length; i++) { 
      this.weapons[i].weapon.fire();
    };
  }

  /**
   * Коллизия для пуль
   * @param obj 
   * @param cb 
   */
  protected collideWithWeapon(obj: any, cb?:Function): void { 
    for (let i = 0; i < this.weapons.length; i++) { 
      this.weapons[i].collide(obj, (ob1, ob2, weapon) => { 
        if (cb) cb(ob1, ob2, this.weapons[i].weapon.damage);
      });
    };
  }

  /**
   * Добавление оружия
   * @param angle 
   */
  protected addWeapon(angle: number): void { 
    this.weapons.push(new WeaponContainer(this.game, 0, 0, angle, this));
  }

  /**
   * Обновление пушек
   */
  protected updateWeaponContainer(): void { 
    for (let i = 0; i < this.weapons.length; i++) { 
      this.weapons[i].update();
    };
  }

  protected addSkill(skill: ParentSkill): void { 
    this.skills.push(skill);
  }

  protected renderSkills(): void { 
    for (let i = 0; i < this.skills.length; i++) { 
      this.game.add.existing(this.skills[i]);
    };
  }

  protected abordSkills(): void { 
    for (let i = 0; i < this.skills.length; i++) { 
      this.skills[i].abort();
    };
  }

  protected acticateSkill(): void { 
    if (this.game.input.keyboard.downDuration(Phaser.Keyboard.Q, 10)) { 
      this.skills[0].preActivate();
    };
    if (this.game.input.keyboard.downDuration(Phaser.Keyboard.E, 10)) { 
      this.skills[1].preActivate();
    };
  }
 
  public update(): void { 
    this.updateWeaponContainer();
  }

}

export default AbstractPl;