import Container from '../framework/containers/container.js';
import randomize from '../framework/utils/randomize.js'; 
import KLevels from '../data/kLevels.js';
import {
    LETTER_NAME_POSTFIX,

    ANIM01_PURPLE_3PARTS_PREFIX,
    ANIM01_PURPLE_5PARTS_PREFIX,
    ANIM01_PURPLE_7PARTS_PREFIX,
    ANIM01_PURPLE_CHARACTER01_PREFIX,
    ANIM01_PURPLE_CHARACTER02_PREFIX,

    ANIM02_PURPLE_3PARTS_PREFIX,
    ANIM02_PURPLE_5PARTS_PREFIX,
    ANIM02_PURPLE_7PARTS_PREFIX,
    ANIM02_PURPLE_CHARACTER01_PREFIX,
    ANIM02_PURPLE_CHARACTER02_PREFIX,

    ANIM03_PURPLE_3PARTS_PREFIX,
    ANIM03_PURPLE_5PARTS_PREFIX,
    ANIM03_PURPLE_7PARTS_PREFIX,
    ANIM03_PURPLE_CHARACTER01_PREFIX,
    ANIM03_PURPLE_CHARACTER02_PREFIX
  } from "./constances.js";

import Balloons from './balloons.js';

export default class balloonAnim extends Container
{
    constructor(resources, pos, level, indexOfChar, indexOfColor)
    {
        super(pos);

        // Deal with level function
        this._kLevel = new KLevels();
        this.level = this._kLevel.getKLevels();

        // Get index in level js file
        this.index = level - 1;

        // Get number of zone of this level
        this.zones = this.level[this.index].zone;

        // Get which array will use
        this.balloonAnimation1 = [];
        this.characterAnimation1 = [];
        this.balloonAnimation2 = [];
        this.characterAnimation2 = [];
        this.balloonAnimation3 = [];
        this.characterAnimation3 = [];

        for(let i = 0; i < 120; i++) 
        {
            // Get the number of zones for this level
            if (this.zones == 3)
            {
                // Get the color of balloon for animation
                this.balloonAnimation1[i] = resources[ ANIM01_PURPLE_3PARTS_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                this.balloonAnimation2[i] = resources[ ANIM02_PURPLE_3PARTS_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                this.balloonAnimation3[i] = resources[ ANIM03_PURPLE_3PARTS_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                // Get the character of animation
                if (indexOfChar == 0)
                {
                    this.characterAnimation1[i] = resources[ANIM01_PURPLE_CHARACTER01_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                    this.characterAnimation2[i] = resources[ANIM02_PURPLE_CHARACTER01_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                    this.characterAnimation3[i] = resources[ANIM03_PURPLE_CHARACTER01_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                }
                else
                {
                    this.characterAnimation1[i] = resources[ANIM01_PURPLE_CHARACTER02_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                    this.characterAnimation2[i] = resources[ANIM02_PURPLE_CHARACTER02_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                    this.characterAnimation3[i] = resources[ANIM03_PURPLE_CHARACTER02_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                }                            
            }
            else if (this.zones == 5)
            {
                this.balloonAnimation1[i] = resources[ ANIM01_PURPLE_5PARTS_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                this.balloonAnimation2[i] = resources[ ANIM02_PURPLE_5PARTS_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                this.balloonAnimation3[i] = resources[ ANIM03_PURPLE_5PARTS_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;

                // Get the character of animation
                if (indexOfChar == 0)
                {
                    this.characterAnimation1[i] = resources[ANIM01_PURPLE_CHARACTER01_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                    this.characterAnimation2[i] = resources[ANIM02_PURPLE_CHARACTER01_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                    this.characterAnimation3[i] = resources[ANIM03_PURPLE_CHARACTER01_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                }
                else
                {
                    this.characterAnimation1[i] = resources[ANIM01_PURPLE_CHARACTER02_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                    this.characterAnimation2[i] = resources[ANIM02_PURPLE_CHARACTER02_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                    this.characterAnimation3[i] = resources[ANIM03_PURPLE_CHARACTER02_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                }                
                
            }
            else 
            {
                this.balloonAnimation1[i] = resources[ ANIM01_PURPLE_7PARTS_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                this.balloonAnimation2[i] = resources[ ANIM02_PURPLE_7PARTS_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                this.balloonAnimation3[i] = resources[ ANIM03_PURPLE_7PARTS_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                // Get the character of animation
                if (indexOfChar == 0)
                {
                    this.characterAnimation1[i] = resources[ANIM01_PURPLE_CHARACTER01_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                    this.characterAnimation2[i] = resources[ANIM02_PURPLE_CHARACTER01_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                    this.characterAnimation3[i] = resources[ANIM03_PURPLE_CHARACTER01_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                }
                else
                {
                    this.characterAnimation1[i] = resources[ANIM01_PURPLE_CHARACTER02_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                    this.characterAnimation2[i] = resources[ANIM02_PURPLE_CHARACTER02_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                    this.characterAnimation3[i] = resources[ANIM03_PURPLE_CHARACTER02_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
                }                
                
            }
        }

        this.characterAnimations = [ this.characterAnimation1 , this.characterAnimation2, this.characterAnimation3 ];
        this.balloonAnimations = [ this.balloonAnimation1 , this.balloonAnimation2, this.balloonAnimation3 ];
        this.randomAnimation = randomize(0,3);
        this.characterAnimation = this.characterAnimations[this.randomAnimation];
        this.balloonAnimation = this.balloonAnimations[this.randomAnimation];
        
        let characterAnim = new PIXI.extras.AnimatedSprite(this.characterAnimation);
        let balloonAnim = new PIXI.extras.AnimatedSprite(this.balloonAnimation);

        characterAnim.animationSpeed = 0.225; 
        balloonAnim.animationSpeed = 0.225;
        characterAnim.loop = false;
        balloonAnim.loop = false;
        setTimeout(() => characterAnim.play(), 2500);
        setTimeout(() => balloonAnim.play(), 2500);

        this.addChild(balloonAnim);
        this.addChild(characterAnim);
    }
}
