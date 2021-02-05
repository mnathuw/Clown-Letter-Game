import Container from '../framework/containers/container.js';
import Vector2 from '../framework/utils/vector2.js';
import ScreenManager from '../framework/screens/screenManager.js';
import Sprite from '../framework/sprites/sprite.js';
import KLevels from '../data/kLevels.js';

export default class Boxes extends Container
{
    constructor(resources, pos, level)
    {
        super(pos);

        // Get ratio, width, height of game screen
        this.screenManager = new ScreenManager(this, this)
        var w = this.screenManager.getWidth();
        var h = this.screenManager.getHeight();

        // Deal with level function
        this._kLevel = new KLevels();
        this.level = this._kLevel.getKLevels();

        // Get index in level js file
        this.index = level - 1;

        // Get number of letters of this level
        this.letters = this.level[this.index].letters;

        if (this.letters <= 6)
        {
            // Locate the box
            this.box = new Sprite(resources, 'assets/images/Boxes/BoxLettersEasy.png', new Vector2(w / 2.58, h / 2.48));

            // Resize box
            this.box.width = w * 332 / 1920;
            this.box.height = this.box.width * 224 / 332;
        }
        else if (this.letters > 6 && this.letters < 12)
        {
            // Locate the box
            this.box = new Sprite(resources, 'assets/images/Boxes/BoxLettersMedium.png', new Vector2(w / 2.58, h / 2.48));

            // Resize box
            this.box.width = w * 342 / 1920;
            this.box.height = this.box.width * 314 / 342;
        }
        else if (this.letters >= 12)
        {
            // Locate the box
            this.box = new Sprite(resources, 'assets/images/Boxes/BoxLettersHard.png', new Vector2(w / 2.58, h / 2.48));

            // Resize box
            this.box.width = w * 422 / 1920;
            this.box.height = this.box.width * 354 / 422;
        }
        else
        {
            console.log("Error in level file. Check " + level);
        }
        this.box.anchor.set(0.5);

        this.addChild(this.box);
    }
}
