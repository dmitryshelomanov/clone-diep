import State from "./main/state";
import Enemy from "../gameObj/player/Enemy";
import Player from "../gameObj/player/Player";
// import Emiter from "../socket";
import MobsContrainer from "../gameObj/MobsContrainer";
import config from "../conf";
import Texture, { TextureType } from "../graphics/texture";
import Weapon from "../gameObj/weapon/weapon";

export default class MainState extends State {

  static bw: number = config.wW;
  static bh: number = config.wH;
  private ioEmiter: SocketIOClient.Socket;
  private player: Player;
  private enemies: Phaser.Group;
  private mobs: Phaser.Group;


  constructor() {
    super();
    // this.ioEmiter = Emiter.getEmiter().getIO();
  }

  public create(): void {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, MainState.bw, MainState.bh);
    this.game.add.tileSprite(0, 0, MainState.bw, MainState.bh, "bg");
    this.mobs = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
    this.checkReady();
  }
  /**
   * Подключение юзера и создание карты
   */
  private checkReady(): void { 
    // this.ioEmiter.emit("player:ready", () => { 
      // this.ioEmiter.on("player:join", pl => {
        this.player = new Player(this.game, 200, 200, 0, 1);
        this.game.add.existing(this.player);
        for (let i = 0; i < 1000; i++) { 
          let randomX = Math.floor(Math.random() * MainState.bw);
          let randomY = Math.floor(Math.random() * MainState.bh);
          let type = Math.floor(Math.random() * 3) === 1 ? TextureType.MobTriangle : TextureType.MobSquare;
          this.mobs.add(new MobsContrainer(this.game, randomX, randomY, 100, 0, i, type));
        };
        
      // });
      this.enemies = new Phaser.Group(this.game);
      // this.renderNewUser();
      // this.getAllPlayer();
      // this.checkMove();
      // this.checkMoveMobs();
      // this.playerDisconnect();
    // });
  } 

  /**
   * Создание текущих игроков
   */
  private getAllPlayer(): void { 
    // this.ioEmiter.on("player:get", (pl) => {
      // for (let pop in pl) { 
        // if (pop !== this.player.ids) {
          // let { ids, x, y, r } = pl[pop];
          this.enemies.add(new Enemy(this.game, 300, 300, 0, 2));
        // };
      // };
    // });
  }

  /**
   * Передача координат игрока
   */
  private checkMove(): void { 
    this.ioEmiter.on("player:move-client", async ({ ids, x, y, r }) => {
      let enemy = await this.findEnemy(ids);
      enemy.x = x;
      enemy.y = y;
      enemy.rotation = r;
    });
  }

  /**
   * Рендер подключившегося игрока
   */
  private renderNewUser(): void { 
    this.ioEmiter.on("player:newPlayer", pl => {
      let { ids, x, y, r } = pl;
      this.enemies.add(new Player(this.game, x, y, r, ids));
    });
  }

  /**
   * ОТключение игрока
   */
  private playerDisconnect(): void { 
    this.ioEmiter.on("player:disconnect", async (ids) => {
      let enemy = await this.findEnemy(ids);
      enemy.destroy();
    });
  }

  /**
   * Поиск игрока по ids
   * @param ids 
   */
  private findEnemy(ids: (number | string)) { 
    return new Promise<any>((res, rej) => {
      this.enemies.forEach((item: any): void => {
        if (item.ids === ids) res(item);
      }, this);
      res(false);
    });
  }

    /**
   * Поиск моба по index-у
   * @param ids 
   */
  private findMobs(ids: (number | string)) { 
    return new Promise<any>((res, rej) => {
      this.mobs.forEach((item: any): void => {
        if (item.ids === ids)
          res(item);
      }, this);
      res(false);
    });
  }

  /**
   * Проверка колизий
   */
  private mainCollied(): void { 
    this.game.physics.arcade.collide(this.mobs, this.player);
    this.game.physics.arcade.collide(this.player, this.enemies);
    this.game.physics.arcade.collide(this.mobs, this.enemies);
  }

  public update(): void { 
    if (this.player) { 
      this.mainCollied();
    };
  }


}
