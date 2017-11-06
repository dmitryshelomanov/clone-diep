import Emiter from "../socket";
import Texture, { TextureType } from "../graphics/texture";
import Weapon from "../gameObj/weapon/weapon";
import WeaponContainer from "../gameObj/WeaponContainer";
import HealthBar from "./bar/HealthBar";

export default class Player extends Phaser.Particle { 
  
  public game: Phaser.Game;
  public speed: number = 500;

  static x: number = 200;
  static y: number = 200;
  public ids: (string|number) = 0;
  public isPlayer: boolean;
  private ioEmiter: SocketIOClient.Socket;

  public weapons: Array<any> = [];

  public constructor(game: Phaser.Game, x: number, y: number, r: number, ids: number = 0, isPlayer: boolean = false) { 
    super(game, x, y, new Texture(game, 0, 0, TextureType.CIRCLE, 0xe14a4a, 0x6f2828, 60).generateTexture());
    this.ids = ids;
    this.isPlayer = isPlayer;
    this.anchor.setTo(0.5, 0.5);
    this.rotation = r;
    this.game.physics.enable(this, Phaser.Physics.ARCADE, true);
    this.body.collideWorldBounds = true;
    this.addWeapon(0);
    this.addWeapon(180);
    this.addWeapon(90);
    this.addWeapon(-90);
    this.renderWeapon();
    this.renderHealth();
    this.addChild(new Texture(game, 0, 0, TextureType.CIRCLE, 0xe14a4a, 0x6f2828, 60));
    if (!isPlayer) return;
    this.game = game;
    this.game.world.camera.follow(this); 
    this.ioEmiter = Emiter.getEmiter().getIO();
  }

  private move(): void { 
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    if (!this.isPlayer) return;
    this.rotation = this.game.physics.arcade.angleToPointer(this);
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) { 
      this.body.velocity.x = this.speed;
    };
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) { 
      this.body.velocity.x = -this.speed;
    };
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) { 
      this.body.velocity.y = -this.speed;
    };
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) { 
      this.body.velocity.y = this.speed;
    };
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) { 
      this.fire();
    };
    this.ioEmiter.emit("player:move", { ids: this.ids, x: this.x, y: this.y, r: this.rotation });
  }

  private renderWeapon() { 
    this.weapons.forEach((sprite: WeaponContainer) => {
      this.addChildAt(sprite, 0);
    });
  }

  public fire(): void { 
    this.weapons.forEach((sprite: WeaponContainer) => {
      if (this.isPlayer) this.ioEmiter.emit("player:fire", this.ids);
      sprite.weapon.fire();
    });
  }

  public collideWithWeapon(obj: any, cb?:Function) { 
    this.weapons.forEach((sprite: WeaponContainer) => {
      sprite.collide(obj, cb);
    });
  }

  private addWeapon(angle: number): void { 
    this.weapons.push(new WeaponContainer(this.game, 0, 0, angle, this));
  }

  private renderHealth(): void { 
    this.game.add.existing(new HealthBar(this.game, this));
  }

  public update() { 
    this.move();
    this.weapons.forEach((sprite: WeaponContainer) => {
      sprite.update();
    });
  }
  
};