import AbstractPl from "../player/AbstractPl";

const style = {
  font: "40px bold Roboto",
  fill: "#000"
};

abstract class ParentSkill extends Phaser.Sprite { 

  public cooldown: number;
  public isActive: boolean = false;
  public player: AbstractPl;
  public toggle: boolean = false;
  public lastActive: string = "";
  public textTime: Phaser.Text;
  public timer: Phaser.Timer;

  constructor(game: Phaser.Game, player: AbstractPl, x:number, y: number, k: string) { 
    super(game, x, y, k);
    this.width = 60;
    this.height = 60;
    this.fixedToCamera = true;
    this.player = player;
    this.addChild(new Phaser.Text(this.game, 0, -60, "Q", style));
    this.textTime = new Phaser.Text(this.game, this.width / 2, this.height + 65, "", style);
    this.addChild(this.textTime);
    this.timer = this.game.time.create();
    this.timerLoopConf();
  }

  /**
   * Метод вызываемый для вызова скила
   * Типа изменить состояние скила 
   */
  public preActivate(): void { }

  /**
   * Метода вызываемый конкретно для эффекта скила
   * @param x 
   * @param y 
   */
  public postActivate(x: number, y: number): void { }
  
  /**
   * Зацикливание таймера
   * @param startDelay 
   */
  public timerLoop(startDelay: number): void { 
    if (this.timer.paused) { 
      return this.timer.resume();
    };
    this.timer.start();
  }

  /**
   * Настройка таймера
   * И обновление ткста на скиле
   */
  private timerLoopConf(): void { 
    this.timer.loop(1000, () => { 
      let num = `${Number(this.textTime.text) - 1}`;
      if (Number(num) === 0) { 
        this.textTime.text = "";
        this.isActive = false;
        this.timer.pause();
        return;
      };
      this.textTime.text = num;
    });
  }

}

export default ParentSkill;