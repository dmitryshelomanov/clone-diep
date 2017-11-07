require('pixi'); 
require('p2');
require('phaser');

import 'styles/style.styl';

import BootState from './states/main/boot.state';
import PreloaderState from './states/main/preloader.state';
import MainState from './states/main.state';

export default class App extends Phaser.Game {

  constructor(config: Phaser.IGameConfig) {
    super(config);

    this.state.add('boot', BootState);
    this.state.add('preloader', PreloaderState);
    this.state.add('main', MainState); 

    this.state.start('boot'); 
  }
}

if (!module.parent) {
  window.onload = () => {
    const config: Phaser.IGameConfig = {
      width: window.innerWidth,
      height: window.innerHeight,
      renderer: Phaser.AUTO,
      parent: '',
      resolution: 1,
      forceSetTimeOut: false
    };
    new App(config);
  };
};
