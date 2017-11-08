export enum TextureType {
  CIRCLE = 1,
  WEAPON = 2,
  MobSquare = 3,
  HealthBarWrap = 4,
  HealthBarInner = 5,
  MobTriangle = 6,
  BlinkCursor = 7
};

export default class extends Phaser.Graphics { 

  public game: Phaser.Game;
  private radius: number;
  private color: number;
  private borderColor: number;

  public constructor(
    game: Phaser.Game, x: number, y: number, t?: number, c?: number, b?: number, r: number = 80
  ) { 
    super(game, x, y);
    this.color = c;
    this.borderColor = b;
    this.game = game;
    this.radius = r;
    this.position.x = x;
    this.position.y = y;
    switch (t) {  
      case TextureType.CIRCLE:
        this.renderCircle();
        break;
      case TextureType.WEAPON:
        this.weaponA();
        break;
      case TextureType.MobSquare:
        this.mobSquare();
        break;
      case TextureType.MobTriangle:
        this.mobTriangle();
        break;
      case TextureType.HealthBarWrap:
        this.healthBarWrap();
        break;
      case TextureType.HealthBarInner:
        this.healthBarInner();
        break;
      case TextureType.BlinkCursor:
        this.blinkCursor();
        break;
    };
  }

  public renderCircle(): void { 
    this.pivot.set(0.5, 0.5);
    this.beginFill(this.color, 1);
    this.lineStyle(3, this.borderColor, 1);
    this.drawCircle(0, 0, this.radius);
  }

  public weaponA(): void { 
    this.beginFill(this.color, 1);
    this.lineStyle(3, this.borderColor, 1);
    this.drawRect(this.x, this.y, 50, 30);
  }

  public mobSquare(): void { 
    this.beginFill(0xffe765, 1);
    this.lineStyle(3, 0xbdac4f, 1);
    this.drawRect(this.x, this.y, 32, 32);
  }

  public mobTriangle(): void {
    this.beginFill(0xec2560, 1);
    this.lineStyle(3, 0xc12755, 1);
    this.drawTriangle([
      new Phaser.Point(0, 0),
      new Phaser.Point(32, 32),
      new Phaser.Point(50, 0)
    ]);
  }

  public healthBarWrap(): void { 
    this.beginFill(0x85e37d, 1);
    this.drawRect(this.x, this.y, 100, 8);
  }

  public healthBarInner(): void { 
    this.beginFill(0x85e37d, 1);
    this.drawRect(this.x, this.y, 96, 6);
  }

  public blinkCursor(): void { 
    this.beginFill(0xb2a1b1, .5);
    this.lineStyle(3, 0xdb283a, .5);
    this.drawCircle(0, 0, this.radius);
  }

}