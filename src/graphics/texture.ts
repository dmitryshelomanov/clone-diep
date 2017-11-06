export enum TextureType {
  CIRCLE = 1,
  WEAPON = 2,
  mobSquare = 3,
  HealthBarWrap = 4,
  HealthBarInner = 5
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
      case TextureType.mobSquare:
        this.mobSquare();
        break;
      case TextureType.HealthBarWrap:
        this.healthBarWrap();
        break;
      case TextureType.HealthBarInner:
        this.healthBarInner();
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
    this.lineStyle(5, 0xbdac4f, 1);
    this.drawRect(this.x, this.y, 40, 40);
  }

  public healthBarWrap(): void { 
    this.beginFill(0x85e37d, 1);
    this.drawRect(this.x, this.y, 100, 8);
  }

  public healthBarInner(): void { 
    this.beginFill(0x85e37d, 1);
    this.drawRect(this.x, this.y, 96, 6);
  }

}