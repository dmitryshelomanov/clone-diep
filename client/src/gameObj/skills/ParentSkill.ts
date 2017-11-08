import AbstractPl from "../player/AbstractPl";

export const Style = {
  font: "40px Roboto",
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
  public timerCb: Array<Function> = [];
  protected aliveTime: number = 5;

  constructor(game: Phaser.Game, player: AbstractPl, x:number, y: number, k: string) { 
    super(game, x, y, k);
    this.width = 60;
    this.height = 60;
    this.fixedToCamera = true;
    this.player = player;
    this.textTime = new Phaser.Text(this.game, this.width / 2, this.height + 65, "", Style);
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
   * Прерывание скила
   */
  public abort(): void { }

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
  public timerLoop(cb?: Function): void { 
    if (cb) {
      this.timerCb.push(cb);
    };
    if (this.timer.paused) { 
      return this.timer.resume();
    };
    this.timer.start();
  }

  /**
   * Удаление таймера
   */
  public abortTimer(): void { 
    this.timer.pause();
    this.textTime.text = "";
  }

  protected timerCbProcess(): void { 
    for (let i = 0; i < this.timerCb.length; i++) { 
      console.log(this.timerCb[i])
      this.timerCb[i]();
      this.timerCb.shift();
    };
  }

  /**
   * Настройка таймера
   * И обновление ткста на скиле
   */
  private timerLoopConf(cb?: Function): void { 
    this.timer.loop(1000, () => { 
      let num = `${Number(this.textTime.text) - 1}`;
      if (Number(num) === 0) { 
        this.timerCbProcess();
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