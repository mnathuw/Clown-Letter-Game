import BaseScreen from './baseScreen.js';
import ScreenState from './screenState.js';

export default class LoadingScreen extends BaseScreen
{
  constructor(name, screenManager, state)
  {
    super(name, screenManager, state);
  }

  init()
  {

  }

  loadContent()
  {
    this.loadBackground = PIXI.Sprite.fromImage('assets/images/Preloader.png');
    this.loadingBar = PIXI.Sprite.fromImage('assets/images/LoadingBar.png');
    this.loadingBar.x = 220;
    this.loadingBar.y = 760;

    this.mask = new PIXI.Graphics();
    this.mask.beginFill(0x0, 0);
    this.mask.drawRect(116, 543, 0, 35);

    this.loadingBar.mask = this.mask;
    this.stage.addChild(this.loadBackground);
    this.stage.addChild(this.loadingBar);
  }

  unloadContent()
  {
    console.log("Unloading content of loadingScreen.");
    this.stage.removeChild(this.loadBackground);
    this.stage.removeChild(this.loadingBar);
  }

  progress(percent)
  {
    var w = this.loadingBar.width * percent / 100;
    this.mask.drawRect(116, 543, w*1.10, 500);
  }
}
