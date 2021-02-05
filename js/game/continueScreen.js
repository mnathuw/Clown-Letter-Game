import BaseScreen from '../framework/screens/baseScreen.js';
import ScreenState from '../framework/screens/screenState.js';
import ScreenManager from '../framework/screens/screenManager.js';
import Button from '../framework/buttons/button.js';
import Sprite from '../framework/sprites/sprite.js';
import Vector2 from '../framework/utils/vector2.js';


export default class ContinueScreen extends BaseScreen
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

    this.continueMenu = new Sprite(this.resources, 'assets/images/Texts/Continue.png', new Vector2(w / 2, h / 2));
    // center the playMenu anchor point
    this.continueMenu.anchor.set(0.5);
    
    // Change size of playMenu
    // The number based of size of image, change them if the size of image changed
    this.continueMenu.width = w * 1024 / 1920;
    this.continueMenu.height = this.continueMenu.width / 1024 * 768;

    this.frame = new Sprite(this.resources, 'assets/images/Frame.png', new Vector2(w / 2, h / 2));
    // center the frame anchor point
    this.frame.anchor.set(0.5);
    // Change size of frame
    this.frame.width = w;
    this.frame.height = w / ratio;

    // Buttons to continue play game
    var btnContinue = new Button(new PIXI.Rectangle(w / 2 - w / 6, h / 2 - h / 8, w / 3, h / 10));
    btnContinue.on('pointerdown', this.onLevelClick.bind(this, 1));

    this.stage.addChild(this.backgroundMenu);
    this.stage.addChild(this.frame);
    this.stage.addChild(this.dark);
    this.stage.addChild(this.continueMenu);
    this.stage.addChild(btnContinue);

  }

  unloadContent()
  {
    this.stage.removeChild(this.backgroundMenu);
    this.stage.removeChild(this.frame);
    this.stage.removeChild(this.dark);
    this.stage.removeChild(this.continueMenu);
  }

  onLevelClick(level)
  {
    this.sm.changeScreenState('continueScreen', ScreenState.INACTIVE);
    var mainScreen = this.sm.getScreen('mainScreen');
    mainScreen.state = ScreenState.ACTIVE;
    mainScreen.loadContent();
    this.unloadContent();
  }

  update()
  {

  }
}
