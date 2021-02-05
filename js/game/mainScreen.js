import BaseScreen from '../framework/screens/baseScreen.js';
import ScreenState from '../framework/screens/screenState.js';
import ScreenManager from '../framework/screens/screenManager.js';
import GameMath from './maths/gameMath.js';
import Animation from '../framework/animations/animation.js';
import Sprite from '../framework/sprites/sprite.js';
import Vector2 from '../framework/utils/vector2.js';
import randomize from '../framework/utils/randomize.js'; 
import Button from '../framework/buttons/button.js';
import TextBox from '../framework/box/textBox.js';
import Sound from '../framework/sounds/sound.js';
import BalloonAnim from './balloonAnim.js';
import TentAnim from './tentAnim.js';

import Controls from './controls.js';

import Balloons from './balloons.js';
import Boxes from './boxes.js';
import LettersQuestion from './lettersQuestion.js';

import KLevels from '../data/kLevels.js';

import {
  LETTER_SOUND_POSTFIX,
  LOWERCASE_PREFIX,
  UPPERCASE_PREFIX
} from "./constances.js";

import {
  UPPER_A_Z
} from "../data/letters.js";


export default class MainScreen extends BaseScreen
{
  constructor(name, screenManager, state)
  {
    super(name, screenManager, state);
    /* this.score = 0;
    this.currentGameMathIndex = 0;
    this.currentGameWinIndex = 0;
    this.currentGameWinItemIndex = 0; */

    // The current level
    this.currentLevel = 1;

    // Count on right letters each question (students will win when it count to 2)
    this.countOnRightLetters = 0;

    // Count when student finish the round of level (fill the balloon)
    // Students will when it should be 3, 5, or 7
    this.countOnRightMatch = 0;

    // Count when student fisnih the level and level up (1 or 2 based on level)
    this.countOnRound = 0;
    
    // Deal with level function
    this._kLevel = new KLevels();
    this.level = this._kLevel.getKLevels();
  }

  loadContent()
  {
    // Get ratio, width, height of game screen
    this.screenManager = new ScreenManager(this, this)
    var w = this.screenManager.getWidth();
    var h = this.screenManager.getHeight();
    var ratio = 1920 / 1080;
    var index;

    this.controls = new Controls(this.resources, new Vector2(5, 5));
    
    // Set Music here
    this.controls.setMusic(this.resources['assets/sounds/Music-funny-toys.mp3']);
    this.controls.homeTrigger = this.menuHomeClick.bind(this);
    this.controls.backTrigger = this.menuHomeClick.bind(this);
    
    // The Main Theme of game
    this.background = new Sprite(this.resources, 'assets/images/Background.png');    
    
    // FrameMenu
    this.frame = new Sprite(this.resources, 'assets/images/Frame.png', new Vector2(w / 2, h / 2));
    // center the frame anchor point
    this.frame.anchor.set(0.5);
    // Change size of frame
    this.frame.width = w;
    this.frame.height = w / ratio;

    // Locate Mockup
    this.mockUp = new Sprite(this.resources, 'assets/images/MockUpLevel1.png');


    // Locate the tent
    this.tent = new Sprite(this.resources, 'assets/images/AnimTent/tent.png');
    // Change size of frame    
 
    this.tent.position.x= w/2 - 410;
    this.tent.position.y = h/2 + 80;


    this.tentAnim = new TentAnim(this.resources, new Vector2(0,0));
    index = this.tentAnim.getIndex();     
    this.tentAnim.position.x = w/2 - 410;
    this.tentAnim.position.y = h/2 + 80;     
    // Locate Bravo
    // this.bravoText = new PIXI.Sprite(this.resources['assets/images/Texts/Bravo.png'].texture);
    // this.bravoText.visible = false;

    this.stage.addChild(this.background);
    this.stage.addChild(this.frame);
    this.stage.addChild(this.controls);
    //this.stage.addChild(this.mockUp);
    this.stage.addChild(this.tent);
    this.stage.addChild(this.tentAnim);
    this.initGameMath();
    
  }

  unloadContent()
  {
    this.stage.removeChild(this.background);
    this.stage.removeChild(this.frame);
    this.stage.removeChild(this.controls);
    // this.stage.removeChild(this.score);
    // this.stage.removeChild(this.recap);
  }

  initGameMath() //(math)
  {
    /* this.currentGameMathIndex = 0;
    this.currentGameMath = math;
    this.currentGameWinItemIndex = 0; */

    // this.currentGameWin = this.currentGameMath.items[this.currentGameWinIndex].gameWins;
    
    // this.init(math.level);
    this.init(this.currentLevel);
  }

  init(level)
  {
    this.currentLevel = level;
    
    // this.firstGame = true;
    this.startConsigne();
  }

  startConsigne()
  {
    //play consigne.
/*     this.consigne = new Sound("assets/sounds/Instruction.mp3");
    this.consigne.play().on('end', this.consigneCompleted.bind(this)); */
    this.consigneCompleted();
  }

  consigneCompleted()
  {
    //Get the current winning game, will call the playQuestion.
    this.initNewGame();
  }

  initNewGame()
  {
    // this.currentGameWinItem = this.currentGameWin.items[this.currentGameWinItemIndex++];
    this.playQuestion();
  }

  playQuestion()
  {
    // let question = this.currentGameWinItem.question;
    this.questionCompleted();
  }

  questionCompleted()
  {
    //When the question has completed we can start playing the game.
    this.startNewGame(this.currentLevel);
  }

  startNewGame(level)
  {
    // Get level
    level = this.currentLevel;

    // Balloon
    this.balloon = new Balloons(this.resources, new Vector2(0,0), this.currentLevel);

    // Get index of char and color for animation
    this.indexOfChar = this.balloon.getIndexOfChar();
    //this.indexOfColor = this.balloon.getIndexOfColor();

    this.box = new Boxes(this.resources, new Vector2(0,0), this.currentLevel);
   
    this.stage.addChild(this.balloon);
    this.stage.addChild(this.box);

    console.log("The level of This Stage: " + this.currentLevel);
    console.log("The win rounds This Level: " + this.countOnRound);
    
    this.refeshQuestion();
  }

  refeshQuestion()
  {
    // Get letters
    this.question = new LettersQuestion(this.resources, new Vector2(0,0), this.currentLevel);
    this.stage.addChild(this.question);

    // Get right letter 1
    this.rightLetter1 = this.question.getRightLetter1();
    // Get right letter 2
    this.rightLetter2 = this.question.getRightLetter2();

    // Get index of right answer
    this.indexRightAnswer1 = this.question.getIndexRightAnswer1();
    this.indexRightAnswer2 = this.question.getIndexRightAnswer2();

    for (let i = 0; i < this.question.letters.length; i++)
    {
      // Pass the current index letter which student click
      this.question.letters[i].currentLetter = i;
      this.question.letters[i].on('pointerdown', this.onAnswerClick.bind(this));
    }
  }

  onAnswerClick(e)
  {

    //this.resources["assets/sounds/Sorry01.mp3"].sound.stop();
    this.resources["assets/sounds/Bravo.mp3"].sound.stop();
    // Get index of clicked letter
    this.clickedLetterIndex = e.target.currentLetter;

    // Disable click letter
    this.question.letters[this.clickedLetterIndex].interactive = false;

    let uppercaseSound = this.resources[UPPERCASE_PREFIX + this.question.letters[this.clickedLetterIndex]._text + LETTER_SOUND_POSTFIX].sound;
    let lowercaseSound = this.resources[LOWERCASE_PREFIX + this.question.letters[this.clickedLetterIndex]._text + LETTER_SOUND_POSTFIX].sound;

    // If the clicked letter in the UPPER array (true)
    if(UPPER_A_Z.includes(this.question.letters[this.clickedLetterIndex]._text)){
      uppercaseSound.play(); 

    }
    else{
      lowercaseSound.play(); 
    }

    if (this.clickedLetterIndex == this.indexRightAnswer1 || this.clickedLetterIndex == this.indexRightAnswer2)
    {
      this.question.letters[this.clickedLetterIndex].style.fill = '#f07f0b';
      this.countOnRightLetters++;
      if (this.countOnRightLetters == 2)
      {
        //this.onWinGame();
        setTimeout(() => this.onWinGame(),2500);
      }
    }
    else
    {
      //this.resources["assets/sounds/Sorry01.mp3"].sound.play();

      this.question.letters[this.clickedLetterIndex].style.fill = '#d3eaed';
    }
    
  }
  
  onWinGame()
  {
    //setTimeout(() => this.resources["assets/sounds/Bravo.mp3"].sound.play(), 2000);
    this.resources["assets/sounds/Bravo.mp3"].sound.play();
    this.balloon.changeColor();
    this.balloon.addTextOnBalloon(this.rightLetter1, this.rightLetter2);
    this.clearPreviousQuestion();
    this.refeshQuestion();

    this.countOnRightMatch++;
    
    // Get number of zones of this level
    this.zones = this.level[this.currentLevel - 1].zone;

    if (this.countOnRightMatch == this.zones)
    {
      this.countOnRound++;
      
      setTimeout(() => this.resources["assets/sounds/BravoTuAsReussi.mp3"].sound.play(), 2500);

      // Get ratio, width, height of game screen
      this.screenManager = new ScreenManager(this, this)
      var w = this.screenManager.getWidth();
      var h = this.screenManager.getHeight();
      var ratio = 1920 / 1080;

      // Add Balloon Animation
      this.animation = new BalloonAnim(this.resources, new Vector2(w/2 - 500,h/2 - 550), this.currentLevel, this.indexOfChar, this.indexOfColor);
      // // Change size of animation
      // this.tentAnim.position.x = w/2 - 410;
      // this.tentAnim.position.y = h/2 + 80;

      setTimeout(() => this.stage.addChild(this.animation), 2500);
      //this.stage.addChild(this.animation);
      // Remove other stuff
      setTimeout(() => this.stage.removeChild(this.balloon), 2500);
      this.stage.removeChild(this.box);
      this.stage.removeChild(this.question);
      this.stage.removeChild(this.bottomPart);

      setTimeout(() => this.stage.addChild(this.frame), 2500);


      // this.stage.removeChild(this.tent);
      // this.stage.removeChild(this.tentAnim);

      // Get number of round of this level
      this.rounds = this.level[this.currentLevel - 1].round;

      if (this.countOnRound < this.rounds)
      {
        setTimeout(() => this.startNewGame(this.currentLevel), 14000);
        this.countOnRightMatch = 0;
      }
      else if (this.countOnRound == this.rounds)
      {
        setTimeout(() => this.levelUp(), 14000);
      }
      else
      {
        console.log("Error")
      }
    }
  }

  clearPreviousQuestion()
  {
    this.stage.removeChild(this.question);
    this.countOnRightLetters = 0;
    for (let i = 0; i < this.question.letters.length; i++)
    {
      this.question.letters[i].interactive = true;
      this.question.letters[i].style.fill = '#00a4bc';
    }
  }

  levelUp()
  {
    this.resources["assets/sounds/VeuxTuContinuer.mp3"].sound.play();
    this.countOnRightMatch = 0;
    this.countOnRightLetters = 0;
    this.countOnRound = 0;

    this.currentLevel++;

    this.sm.changeScreenState('mainScreen', ScreenState.INACTIVE);
    var continueScreen = this.sm.getScreen('continueScreen');
    continueScreen.state = ScreenState.ACTIVE;
    continueScreen.loadContent();
    this.unloadContent();
  }

  clearPreviousGame()
  {

  }

  // Shuffle an array
  shuffle(array)
  {
    var cl = [];
    var nA = [];
    jQuery.extend(cl, array);
    while(cl.length > 0)
    {
      var r = Math.floor(Math.random() * cl.length);
      nA.push(cl[r]);
      cl.splice(r,1);
    }
    return nA;
  }

  menuHomeClick()
  {
    this.indexWrong = [];
    this.countOnWrong = 0;
    this.countOnRight = 0;
    this.stage.removeChild(this.statement);
    this.sm.changeScreenState('mainScreen', ScreenState.INACTIVE);
    var menuScreen = this.sm.getScreen('menuScreen');
    menuScreen.state = ScreenState.ACTIVE;
    menuScreen.loadContent();
    this.unloadContent();
  }

  update(time)
  {
    super.update(time);
    // if (this.arrows) {
    //   this.arrows.update(time);
    // }
  }

  draw()
  {
    super.draw();
  }
}
