import Container from '../framework/containers/container.js';
import Vector2 from '../framework/utils/vector2.js';
import ScreenManager from '../framework/screens/screenManager.js';
import Sprite from '../framework/sprites/sprite.js';
import randomize from '../framework/utils/randomize.js';
import KLevels from '../data/kLevels.js';
import LettersQuestion from './lettersQuestion.js';

export default class Balloons extends Container
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

        // Get number of zone of this level
        this.zones = this.level[this.index].zone;

        // Localtion of balloon
        var localtionBallon = new Vector2(w/1.8, h/3);

        // Resize balloon Gray Off
        var ballonWidth = w * 308 / 1920;
        var ballonHeigth = ballonWidth * 521 / 308;

        if (this.zones == 3)
        {
            // Locate the hot air balloon Gray Off
            this.gray001 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/3Parts/001.png', localtionBallon);
            this.gray002 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/3Parts/002.png', localtionBallon);
            this.gray003 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/3Parts/003.png', localtionBallon);

            // Resize balloon
            this.gray001.width = ballonWidth;
            this.gray001.height = ballonHeigth; 
            this.gray002.width = ballonWidth;
            this.gray002.height = ballonHeigth; 
            this.gray003.width = ballonWidth;
            this.gray003.height = ballonHeigth;
            
            // Locate bottom part
            this.bottomPart = new Sprite(resources, 'assets/images/HotAirBalloons/BottomPart.png', localtionBallon);

            // Locate 3 parts match
            this.partsMatch = new Sprite(resources, 'assets/images/HotAirBalloons/3PartsMatch.png', localtionBallon);
        }
        else if (this.zones == 5)
        {
            // Locate the hot air balloon Gray Off
            this.gray001 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/5Parts/001.png', localtionBallon);
            this.gray002 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/5Parts/002.png', localtionBallon);
            this.gray003 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/5Parts/003.png', localtionBallon);
            this.gray004 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/5Parts/004.png', localtionBallon);
            this.gray005 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/5Parts/005.png', localtionBallon);

            // Resize balloon
            this.gray001.width = ballonWidth;
            this.gray001.height = ballonHeigth; 
            this.gray002.width = ballonWidth;
            this.gray002.height = ballonHeigth; 
            this.gray003.width = ballonWidth;
            this.gray003.height = ballonHeigth;
            this.gray004.width = ballonWidth;
            this.gray004.height = ballonHeigth;
            this.gray005.width = ballonWidth;
            this.gray005.height = ballonHeigth;
            
            // Locate bottom part
            this.bottomPart = new Sprite(resources, 'assets/images/HotAirBalloons/BottomPart.png', localtionBallon);

            // Locate 5 parts match
            this.partsMatch = new Sprite(resources, 'assets/images/HotAirBalloons/5PartsMatch.png', localtionBallon);
        }
        else if (this.zones == 7)
        {
            // Locate the hot air balloon Gray Off
            this.gray001 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/7Parts/001.png', localtionBallon);
            this.gray002 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/7Parts/002.png', localtionBallon);
            this.gray003 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/7Parts/003.png', localtionBallon);
            this.gray004 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/7Parts/004.png', localtionBallon);
            this.gray005 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/7Parts/005.png', localtionBallon);
            this.gray006 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/7Parts/006.png', localtionBallon);
            this.gray007 = new Sprite(resources, 'assets/images/HotAirBalloons/GrayOff/7Parts/007.png', localtionBallon);

            // Resize balloon
            this.gray001.width = ballonWidth;
            this.gray001.height = ballonHeigth; 
            this.gray002.width = ballonWidth;
            this.gray002.height = ballonHeigth; 
            this.gray003.width = ballonWidth;
            this.gray003.height = ballonHeigth;
            this.gray004.width = ballonWidth;
            this.gray004.height = ballonHeigth;
            this.gray005.width = ballonWidth;
            this.gray005.height = ballonHeigth;
            this.gray006.width = ballonWidth;
            this.gray006.height = ballonHeigth;
            this.gray007.width = ballonWidth;
            this.gray007.height = ballonHeigth;
            
            // Locate bottom part
            this.bottomPart = new Sprite(resources, 'assets/images/HotAirBalloons/BottomPart.png', localtionBallon);
            
            // Locate 7 parts match
            this.partsMatch = new Sprite(resources, 'assets/images/HotAirBalloons/7PartsMatch.png', localtionBallon);
        }
        else
        {
            console.log("Error in the level.js files. Check level " + level);
        }
        // Resize parts match
        this.partsMatch.width = ballonWidth;
        this.partsMatch.height = ballonHeigth;

        // Locate and resize character
        this.characters = [];
        this.characters[0] = new Sprite(resources, 'assets/images/HotAirBalloons/Character01.png', localtionBallon);
        this.characters[1] = new Sprite(resources, 'assets/images/HotAirBalloons/Character02.png', localtionBallon);
        
        // Get the index of char for animation
        this.indexOfChar = randomize(0, 2);
        
        this.character = this.characters[this.indexOfChar];
        this.character.width = ballonWidth;
        this.character.height = ballonHeigth;


        // Colored ballon when student click right answer
        if (this.zones == 3)
        {        
            // Locate and resize the colored hot air balloon
            //this.orange = new Sprite(resources, 'assets/images/HotAirBalloons/Orange/3Parts/3Parts.png', localtionBallon);
            //this.blue = new Sprite(resources, 'assets/images/HotAirBalloons/Blue/3Parts/3Parts.png', localtionBallon);
            this.purple = new Sprite(resources, 'assets/images/HotAirBalloons/Purple/3Parts/3Parts.png', localtionBallon);
        }
        else if (this.zones == 5)
        {
            //this.orange = new Sprite(resources, 'assets/images/HotAirBalloons/Orange/5Parts/5Parts.png', localtionBallon);
            //this.blue = new Sprite(resources, 'assets/images/HotAirBalloons/Blue/5Parts/5Parts.png', localtionBallon);
            this.purple = new Sprite(resources, 'assets/images/HotAirBalloons/Purple/5Parts/5Parts.png', localtionBallon);
        }
        else if (this.zones == 7)
        {
            //this.orange = new Sprite(resources, 'assets/images/HotAirBalloons/Orange/7Parts/7Parts.png', localtionBallon);
            //this.blue = new Sprite(resources, 'assets/images/HotAirBalloons/Blue/7Parts/7Parts.png', localtionBallon);
            this.purple = new Sprite(resources, 'assets/images/HotAirBalloons/Purple/7Parts/7Parts.png', localtionBallon);
        }
        else
        {
            console.log("Error in the level.js files. Check level " + level);
        }
        

        // Resize colored balloons
        //this.orange.width = ballonWidth;
        //this.orange.height = ballonHeigth;
        //this.blue.width = ballonWidth;
        //this.blue.height = ballonHeigth;
        this.purple.width = ballonWidth;
        this.purple.height = ballonHeigth;

        // Random pick one color
        //this.colorBalloons = [this.blue, this.orange, this.purple];
        
        // Get the index of color for animation
        //this.indexOfColor = randomize(0, 3);
        //this.colorBalloonRandom = this.colorBalloons[this.indexOfColor];

        this.addChild(this.bottomPart)
        this.addChild(this.purple);
        this.addChild(this.gray001);
        this.addChild(this.gray002);
        this.addChild(this.gray003);
        if (this.zones > 3)
        {

            this.addChild(this.gray004);
            this.addChild(this.gray005);
        }
        if (this.zones > 5)
        {
            this.addChild(this.gray006);
            this.addChild(this.gray007);
        }
        this.addChild(this.partsMatch);
        
        this.addChild(this.character);
    }

    changeColor()
    {
        if (this.gray001.visible) 
        {
            this.gray001.visible = false;
        }
        else 
        {
            if (this.gray002.visible)
            {
                this.gray002.visible = false;
            }
            else
            {
                if (this.gray003.visible)
                {
                    this.gray003.visible = false;
                }
                else
                {
                    if (this.zones == 3)
                    {
                        console.log('Check again. This stage should be finished');
                    }
                    // this.zones > 3
                    else 
                    {
                        if (this.gray004.visible) 
                        {
                            this.gray004.visible = false;
                        }
                        else
                        {
                            if (this.gray005.visible)
                            {
                                this.gray005.visible = false;
                            }
                            else
                            {
                                if (this.zones == 5)
                                {
                                    console.log('Check again. This stage should be finished');
                                }
                                // this.zones > 5
                                else
                                {
                                    if (this.gray006.visible) 
                                    {
                                        this.gray006.visible = false;
                                    }
                                    else
                                    {
                                        if (this.gray007.visible)
                                        {
                                            this.gray007.visible = false;
                                        }
                                        else
                                        {
                                            console.log('Check again. This stage should be finished');
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    addTextOnBalloon(letter1, letter2)
    {
        // Get ratio, width, height of game screen
        this.screenManager = new ScreenManager(this, this)
        var w = this.screenManager.getWidth();
        var h = this.screenManager.getHeight();

        var xMiddle = 0.635 * w;

        // Get letters to appear in the balloon
        if (this.zones == 3)
        {
            if (this.gray003.visible == false)
            {
                // Set pos letter for gray003
                this.letter1 = new PIXI.Text(letter1, {fontSize: 60 * w / 1920});
                this.letter1.x = xMiddle;
                this.letter1.y = h / 2.33;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 60 * w / 1920});
                this.letter2.x = xMiddle;
                this.letter2.y = h / 1.85;
            }
            else if (this.gray002.visible == false)
            {
                // Set pos letter for gray002
                this.letter1 = new PIXI.Text(letter1, {fontSize: 40 * w / 1920});
                this.letter1.x = 2 * xMiddle - w / 1.74;
                this.letter1.y = h / 2.3;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 40 * w / 1920});
                this.letter2.x = 2 * xMiddle - w / 1.73;
                this.letter2.y = h / 1.85;
            }
            else
            {
                // Set pos letter for gray001
                this.letter1 = new PIXI.Text(letter1, {fontSize: 40 * w / 1920});
                this.letter1.x = w / 1.74;
                this.letter1.y = h / 2.3;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 40 * w / 1920});
                this.letter2.x = w / 1.73;
                this.letter2.y = h / 1.85;
            }
        }
        else if (this.zones == 5)
        {
            if (this.gray005.visible == false)
            {                
                // Set pos letter for gray005
                this.letter1 = new PIXI.Text(letter1, {fontSize: 50 * w / 1920});
                this.letter1.x = xMiddle;
                this.letter1.y = h / 2.32;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 50 * w / 1920});
                this.letter2.x = xMiddle;
                this.letter2.y = h / 1.87;
            }
            else if (this.gray004.visible == false)
            {
                // Set pos letter for gray004
                this.letter1 = new PIXI.Text(letter1, {fontSize: 32 * w / 1920});
                this.letter1.x = xMiddle + (xMiddle - w / 1.695);
                this.letter1.y = h / 2.25;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 32 * w / 1920});
                this.letter2.x = xMiddle + (xMiddle - w / 1.68);
                this.letter2.y = h / 1.85;
            }
            else if (this.gray003.visible == false)
            {
                // Set pos letter for gray003
                this.letter1 = new PIXI.Text(letter1, {fontSize: 32 * w / 1920});
                this.letter1.x = w / 1.695;
                this.letter1.y = h / 2.25;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 32 * w / 1920});
                this.letter2.x = w / 1.68;
                this.letter2.y = h / 1.85;
            }
            else if (this.gray002.visible == false)
            {
                // Set pos letter for gray002
                this.letter1 = new PIXI.Text(letter1, {fontSize: 20 * w / 1920});
                this.letter1.x = xMiddle + (xMiddle - w / 1.77);
                this.letter1.y = h / 2.2;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 20 * w / 1920});
                this.letter2.x = xMiddle + (xMiddle - w / 1.75);
                this.letter2.y = h / 1.83;
            }
            else
            {
                // Set pos letter for gray001
                this.letter1 = new PIXI.Text(letter1, {fontSize: 20 * w / 1920});
                this.letter1.x = w / 1.77;
                this.letter1.y = h / 2.2;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 20 * w / 1920});
                this.letter2.x = w / 1.75;
                this.letter2.y = h / 1.83;
            }
        }
        else // this.zones == 7
        {
            if (this.gray007.visible == false)
            {                
                // Set pos letter for gray007
                this.letter1 = new PIXI.Text(letter1, {fontSize: 40 * w / 1920});
                this.letter1.x = xMiddle;
                this.letter1.y = h / 2.32;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 40 * w / 1920});
                this.letter2.x = xMiddle;
                this.letter2.y = h / 1.87;
            }
            else if (this.gray006.visible == false)
            {
                // Set pos letter for gray006
                this.letter1 = new PIXI.Text(letter1, {fontSize: 32 * w / 1920});
                this.letter1.x = xMiddle + (xMiddle - w / 1.65);
                this.letter1.y = h / 2.3;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 32 * w / 1920});
                this.letter2.x = xMiddle + (xMiddle - w / 1.647);
                this.letter2.y = h / 1.85;
            }
            else if (this.gray005.visible == false)
            {
                // Set pos letter for gray005
                this.letter1 = new PIXI.Text(letter1, {fontSize: 32 * w / 1920});
                this.letter1.x = w / 1.655;
                this.letter1.y = h / 2.3;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 32 * w / 1920});
                this.letter2.x = w / 1.647;
                this.letter2.y = h / 1.85;
            }
            else if (this.gray004.visible == false)
            {
                // Set pos letter for gray004
                this.letter1 = new PIXI.Text(letter1, {fontSize: 26 * w / 1920});
                this.letter1.x = xMiddle + (xMiddle - w / 1.715);
                this.letter1.y = h / 2.25;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 26 * w / 1920});
                this.letter2.x = xMiddle + (xMiddle - w / 1.705);
                this.letter2.y = h / 1.85;
            }
            else if (this.gray003.visible == false)
            {
                // Set pos letter for gray003
                this.letter1 = new PIXI.Text(letter1, {fontSize: 26 * w / 1920});
                this.letter1.x = w / 1.715;
                this.letter1.y = h / 2.25;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 26 * w / 1920});
                this.letter2.x = w / 1.705;
                this.letter2.y = h / 1.85;
            }
            else if (this.gray002.visible == false)
            {
                // Set pos letter for gray002
                this.letter1 = new PIXI.Text(letter1, {fontSize: 20 * w / 1920});
                this.letter1.x = xMiddle + (xMiddle - w / 1.775);
                this.letter1.y = h / 2.2;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 20 * w / 1920});
                this.letter2.x = xMiddle + (xMiddle - w / 1.75);
                this.letter2.y = h / 1.83;
            }
            else
            {
                // Set pos letter for gray001               
                this.letter1 = new PIXI.Text(letter1, {fontSize: 20 * w / 1920});
                this.letter1.x = w / 1.775;
                this.letter1.y = h / 2.2;
                this.letter2 = new PIXI.Text(letter2, {fontSize: 20 * w / 1920});
                this.letter2.x = w / 1.75;
                this.letter2.y = h / 1.83;
            }
        }

        // Pos in middle of match 3
        // this.letter1.x = w / 1.6;
        // this.letter1.y = h / 2.4;

        // Set same style for the letters
        this.letter1.style.fontFamily = 'Muli';
        this.letter1.style.fill = '#fff';
        this.letter1.anchor.set(0.5);
        this.letter2.style.fontFamily = 'Muli';
        this.letter2.style.fill = '#fff';
        this.letter2.anchor.set(0.5);

        this.addChild(this.letter1);
        this.addChild(this.letter2);
    }

    // Get the index of random character
    getIndexOfChar()
    {
        return this.indexOfChar;
    }

    // // this.orange, this.blue, this.purple
    // // 0 = blue, 1 = orange, 2 = purple
    // getIndexOfColor()
    // {
    //     return this.indexOfColor;
    // }

}

