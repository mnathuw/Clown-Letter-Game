import Container from '../framework/containers/container.js';
import {
    LETTER_NAME_POSTFIX,
    ANIM01_TENT_PREFIX,
    ANIM02_TENT_PREFIX,
    ANIM03_TENT_PREFIX,
    ANIM04_TENT_PREFIX,
    ANIM05_TENT_PREFIX,
    ANIM06_TENT_PREFIX,
    ANIM07_TENT_PREFIX,
    ANIM08_TENT_PREFIX  
  } from "./constances.js";
import randomize from '../framework/utils/randomize.js'; 

  

export default class tentAnim extends Container
{
    constructor(resources, pos)
    {
        super(pos);

        this.tentRandoms = [];
        this.indexOfTent = randomize(0,8);
        this.tentRandom = this.tentRandoms[this.indexOfTent];
        this.tentAnimation = [];

        for(let i=0; i<= 20; i++){
          if(this.indexOfTent == 0){
            //Monkey 01
            this.tentAnimation[i] = resources[ANIM01_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
          }
          
          if(this.indexOfTent == 1){
            //Lion 01
            this.tentAnimation[i] = resources[ANIM02_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
          }
          
          if(this.indexOfTent == 2){
            //Giraffe 01
            this.tentAnimation[i] = resources[ANIM03_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
          }
          
          if(this.indexOfTent == 3){
            //Hippo 01
            this.tentAnimation[i] = resources[ANIM04_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
          }
          
          if(this.indexOfTent == 4){
            //Monkey 02
            this.tentAnimation[i] = resources[ANIM05_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
          }
          
          if(this.indexOfTent == 5){
            //Lion 02
            this.tentAnimation[i] = resources[ANIM06_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
          }
          
          if(this.indexOfTent == 6){
            //Giraffe 02
            this.tentAnimation[i] = resources[ANIM07_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
          }
          
          if(this.indexOfTent == 7){
            //Elephant 01
            this.tentAnimation[i] = resources[ANIM08_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX].texture;
          }
          
        }
        let tentAnim = new PIXI.extras.AnimatedSprite(this.tentAnimation);
        tentAnim.animationSpeed = 0.225; 
        tentAnim.loop = false;
        tentAnim.play();

        this.addChild(tentAnim);                      
    }
    // Get index of random tent animation
    getIndex()
    {
      return this.indexOfTent;
    }

    

}
