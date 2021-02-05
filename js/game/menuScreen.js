import BaseScreen from '../framework/screens/baseScreen.js';
import ScreenState from '../framework/screens/screenState.js';
import ScreenManager from '../framework/screens/screenManager.js';
import Button from '../framework/buttons/button.js';
import Sprite from '../framework/sprites/sprite.js';
import Vector2 from '../framework/utils/vector2.js';

export default class MenuScreen extends BaseScreen
{
  constructor(name, screenManager, state)
  {
    super(name, screenManager, state);
  }

  loadContent()
  {
    super.loadContent();
  
    // Get ratio, width, height of game screen
    this.screenManager = new ScreenManager(this, this)
    var w = this.screenManager.getWidth();
    var h = this.screenManager.getHeight();
    var ratio = 1920 / 1080;

    this.backgroundMenu = new Sprite(this.resources, 'assets/images/Background.png');
    this.dark = new Sprite(this.resources, 'assets/images/Dark.png');

    // PlayMenu
    this.playMenu = new Sprite(this.resources, 'assets/images/Texts/Play.png', new Vector2(w / 2, h / 2));
    // center the playMenu anchor point
    this.playMenu.anchor.set(0.5);
    // Change size of playMenu
    // The number based of size of image, change them if the size of image changed
    this.playMenu.width = w * 1024 / 1920;
    this.playMenu.height = this.playMenu.width / 1024 * 768;

    // FrameMenu
    this.frame = new Sprite(this.resources, 'assets/images/Frame.png', new Vector2(w / 2, h / 2));
    // center the frame anchor point
    this.frame.anchor.set(0.5);
    // Change size of frame
    this.frame.width = w;
    this.frame.height = w / ratio;


    // Jeour button
    var btnLevel1 = new Button(new PIXI.Rectangle(w / 2 - w / 8, h / 2 - h / 7, w / 4, h / 10));
    btnLevel1.on('pointerdown', this.onLevelClick.bind(this, 1));

    this.stage.addChild(this.backgroundMenu);
    this.stage.addChild(this.dark);
    this.stage.addChild(this.frame);
    this.stage.addChild(this.playMenu);
    this.stage.addChild(btnLevel1);
  }

  unloadContent()
  {
    this.stage.removeChild(this.backgroundMenu);
    this.stage.removeChild(this.frame);
    this.stage.removeChild(this.dark);
    this.stage.removeChild(this.playlMenu);
  }

  onLevelClick(level)
  {
    this.sm.changeScreenState('menuScreen', ScreenState.INACTIVE);
    var mainScreen = this.sm.getScreen('mainScreen');
    mainScreen.state = ScreenState.ACTIVE;
    mainScreen.loadContent();
    this.unloadContent();
  }

  update()
  {

  }
}
