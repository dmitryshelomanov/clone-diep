import State from "./main/state";
import Player from "../gameObj/Player";
import Emiter from "../socket";
import MobsContrainer from "../gameObj/MobsContrainer";
import config from "../conf";
import Texture, { TextureType } from "../graphics/texture";

export default class MainState extends State {

  static bw: number = config.wW;
  static bh: number = config.wH;
  private ioEmiter: SocketIOClient.Socket;
  private player: Player;
  private enemies: Phaser.Group;
  private mobs: Phaser.Group;


  constructor() {
    super();
    this.ioEmiter = Emiter.getEmiter().getIO();
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
    this.ioEmiter.emit("player:ready", () => { 
      this.ioEmiter.on("player:join", pl => {
        this.player = new Player(this.game, pl.x, pl.y, pl.r, pl.ids, true);
        this.game.add.existing(this.player);
      });
      this.enemies = new Phaser.Group(this.game);
      this.renderNewUser();
      this.getAllPlayer();
      this.checkMove();
      this.handleFire();
      this.renderMobs();
      this.checkMoveMobs();
      this.playerDisconnect();
    });
  } 

  /**
   * Создание текущих игроков
   */
  private getAllPlayer(): void { 
    this.ioEmiter.on("player:get", (pl) => {
      for (let pop in pl) { 
        if (pop !== this.player.ids) {
          let { ids, x, y, r } = pl[pop];
          this.enemies.add(new Player(this.game, x, y, r, ids));
        };
      };
    });
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
   * Рендер мобов
   */
  private renderMobs() { 
    this.ioEmiter.on("maps:get", map => {
      map.forEach(({ ids, x, y, h, r }) => {
        this.mobs.add(new MobsContrainer(this.game, x, y, h, r, ids));
      });
    });
  }

  /**
   * Проверка движения мобов
   */
  private checkMoveMobs(): void { 
    this.ioEmiter.on("map:move-client", async ({ ids, x, y }) => {
      let mob = await this.findMobs(ids);
      mob.x = x;
      mob.y = y;
    });
  }

  /**
   * Отрисовка стрельбы
   */
  private handleFire(): void { 
    this.ioEmiter.on("player:fire-client", async (ids) => { 
      let pl: Player = await this.findEnemy(ids);
      pl.fire();
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
  private collide(): void { 
    this.game.physics.arcade.collide(this.mobs, this.player, (player: Player, mob: MobsContrainer) => { 
      setTimeout(() => { 
        this.ioEmiter.emit("map:move", { ids: mob.ids, x: mob.x, y: mob.y });
      }, 0);
    });
    // this.game.physics.arcade.collide(this.player, this.enemies);
    // this.game.physics.arcade.collide(this.mobs, this.mobs, (mob1: MobsContrainer, mob2: MobsContrainer) => { 
    //   this.ioEmiter.emit("map:move", { ids: mob1.ids, x: mob1.x, y: mob1.y });
    //   this.ioEmiter.emit("map:move", { ids: mob2.ids, x: mob2.x, y: mob2.y });
    // });
    this.player.collideWithWeapon(this.mobs, (mob: MobsContrainer, bullet: Phaser.Bullet) => { 
      bullet.kill();
      setTimeout(() => { 
        this.ioEmiter.emit("map:move", { ids: mob.ids, x: mob.x, y: mob.y });
      }, 0);
    });
    // this.player.collideWithWeapon(this.enemies);
  }

  public update(): void { 
    if (this.player) { 
      this.collide();
    };
  }

  public render(): void { 
    this.game.debug.cameraInfo(this.camera, 100, 100);
  }

}
