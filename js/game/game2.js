import AssetLoader from '../framework/assetLoader/assetloader.js';
import ScreenManager from '../framework/screens/screenManager.js';
import ScreenState from '../framework/screens/screenState.js';
import MainScreen from './mainScreen.js';
import MenuScreen from './menuScreen.js';
import ContinueScreen from './continueScreen.js';
//import AnimScreen from './animScreen.js';

import {
  LETTER_NAME_POSTFIX,
  LOWERCASE_PREFIX,
  UPPERCASE_PREFIX,

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
  ANIM03_PURPLE_CHARACTER02_PREFIX,

  ANIM01_TENT_PREFIX,
  ANIM02_TENT_PREFIX,
  ANIM03_TENT_PREFIX,
  ANIM04_TENT_PREFIX,
  ANIM05_TENT_PREFIX,
  ANIM06_TENT_PREFIX,
  ANIM07_TENT_PREFIX,
  ANIM08_TENT_PREFIX,

  LETTER_SOUND_POSTFIX
} from "./constances.js";

import { LetterKeys } from "./gameServices/letterKeys.js";

export default class Game2
{
  constructor()
  {
    this.frames = 0;
  }

  run()
  {
    this.init();
  }

  loadProgressHandler(loader, resource)
  {
    //Check resource.error for error and resource.data for raw binary data.
    console.log("loading:" + resource.url);
    console.log("progress: " + loader.progress + "%");
  }

  init()
  {
    this.assetLoader = new AssetLoader();
    let listAssets = [
      // Background
      "assets/images/Background.png",
      "assets/images/Frame.png",
      "assets/images/AnimTent/tent.png",

      // Buttons
      "assets/images/Texts/Play.png",
      "assets/images/HomeButton01.png",
      "assets/images/HomeButton02.png",
      "assets/images/BackButton01.png",
      "assets/images/BackButton02.png",
      "assets/images/MusicPlay01.png",
      "assets/images/MusicPlay02.png",
      "assets/images/MusicStop01.png",
      "assets/images/MusicStop02.png",
      "assets/images/Texts/Continue.png",
      "assets/images/Dark.png",
      "assets/images/MockUpLevel1.png",
      "assets/images/FullScreenButton01.png",
      "assets/images/FullScreenButton02.png",

      // Sounds
      "assets/sounds/Music-funny-toys.mp3",
      "assets/sounds/Bravo.mp3",
      "assets/sounds/BravoTuAsReussi.mp3",
      "assets/sounds/VeuxTuContinuer.mp3",
      "assets/sounds/Instruction.mp3",
      // Bravo
      // "assets/images/Texts/Bravo.png",

      // Characters      
      "assets/images/HotAirBalloons/Character01.png",
      "assets/images/HotAirBalloons/Character02.png",
      "assets/images/HotAirBalloons/BottomPart.png",


      // 3 parts - Easy     
      "assets/images/Boxes/BoxLettersEasy.png",
      "assets/images/HotAirBalloons/Purple/3Parts/3Parts.png",

      "assets/images/HotAirBalloons/GrayOff/3Parts/001.png",
      "assets/images/HotAirBalloons/GrayOff/3Parts/002.png",
      "assets/images/HotAirBalloons/GrayOff/3Parts/003.png",
      "assets/images/HotAirBalloons/3PartsMatch.png",

      // 5 parts - Medium     
      "assets/images/Boxes/BoxLettersMedium.png",
      "assets/images/HotAirBalloons/Purple/5Parts/5Parts.png",

      "assets/images/HotAirBalloons/GrayOff/5Parts/001.png",
      "assets/images/HotAirBalloons/GrayOff/5Parts/002.png",
      "assets/images/HotAirBalloons/GrayOff/5Parts/003.png",
      "assets/images/HotAirBalloons/GrayOff/5Parts/004.png",
      "assets/images/HotAirBalloons/GrayOff/5Parts/005.png",
      "assets/images/HotAirBalloons/5PartsMatch.png",

      // 7 parts - Hard     
      "assets/images/Boxes/BoxLettersHard.png",
      "assets/images/HotAirBalloons/Purple/7Parts/7Parts.png",

      "assets/images/HotAirBalloons/GrayOff/7Parts/001.png",
      "assets/images/HotAirBalloons/GrayOff/7Parts/002.png",
      "assets/images/HotAirBalloons/GrayOff/7Parts/003.png",
      "assets/images/HotAirBalloons/GrayOff/7Parts/004.png",
      "assets/images/HotAirBalloons/GrayOff/7Parts/005.png",
      "assets/images/HotAirBalloons/GrayOff/7Parts/006.png",
      "assets/images/HotAirBalloons/GrayOff/7Parts/007.png",
      "assets/images/HotAirBalloons/7PartsMatch.png"
    ];

    // Load Letter assets
    Object.keys(LetterKeys).forEach((key) => {
        listAssets.push(LOWERCASE_PREFIX + LetterKeys[key].name + LETTER_SOUND_POSTFIX);     
        listAssets.push(UPPERCASE_PREFIX + LetterKeys[key].name + LETTER_SOUND_POSTFIX);     
      })

    
    for (let i = 0; i <120; i ++) {
      
      listAssets.push(ANIM01_PURPLE_3PARTS_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX);
      listAssets.push(ANIM01_PURPLE_5PARTS_PREFIX + '/' + i.toString().padStart(3,"0") +  LETTER_NAME_POSTFIX);
      listAssets.push(ANIM01_PURPLE_7PARTS_PREFIX + '/' + i.toString().padStart(3,"0") +  LETTER_NAME_POSTFIX);

      listAssets.push(ANIM01_PURPLE_CHARACTER01_PREFIX + '/' + i.toString().padStart(3,"0") +  LETTER_NAME_POSTFIX);
      listAssets.push(ANIM01_PURPLE_CHARACTER02_PREFIX + '/' + i.toString().padStart(3,"0") +  LETTER_NAME_POSTFIX);
      
      listAssets.push(ANIM02_PURPLE_3PARTS_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX);
      listAssets.push(ANIM02_PURPLE_5PARTS_PREFIX + '/' + i.toString().padStart(3,"0") +  LETTER_NAME_POSTFIX);
      listAssets.push(ANIM02_PURPLE_7PARTS_PREFIX + '/' + i.toString().padStart(3,"0") +  LETTER_NAME_POSTFIX);

      listAssets.push(ANIM02_PURPLE_CHARACTER01_PREFIX + '/' + i.toString().padStart(3,"0") +  LETTER_NAME_POSTFIX);
      listAssets.push(ANIM02_PURPLE_CHARACTER02_PREFIX + '/' + i.toString().padStart(3,"0") +  LETTER_NAME_POSTFIX);

      listAssets.push(ANIM03_PURPLE_3PARTS_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX);
      listAssets.push(ANIM03_PURPLE_5PARTS_PREFIX + '/' + i.toString().padStart(3,"0") +  LETTER_NAME_POSTFIX);
      listAssets.push(ANIM03_PURPLE_7PARTS_PREFIX + '/' + i.toString().padStart(3,"0") +  LETTER_NAME_POSTFIX);

      listAssets.push(ANIM03_PURPLE_CHARACTER01_PREFIX + '/' + i.toString().padStart(3,"0") +  LETTER_NAME_POSTFIX);
      listAssets.push(ANIM03_PURPLE_CHARACTER02_PREFIX + '/' + i.toString().padStart(3,"0") +  LETTER_NAME_POSTFIX);
    } 
    
    for (let i = 0; i <=20; i ++) {
      // tent animation
      listAssets.push(ANIM01_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX);
      listAssets.push(ANIM02_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX);
      listAssets.push(ANIM03_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX);
      listAssets.push(ANIM04_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX);
      listAssets.push(ANIM05_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX);
      listAssets.push(ANIM06_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX);
      listAssets.push(ANIM07_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX);
      listAssets.push(ANIM08_TENT_PREFIX + '/' + i.toString().padStart(3,"0") + LETTER_NAME_POSTFIX);

    }
    this.assetLoader.addAssets(listAssets);


    this.screenManager = new ScreenManager(this, this.assetLoader);
    this.screenManager.init();

    // Responsive the game for website
    window.addEventListener('resize', () => { 
      var size = [1920, 1080];
      var ratio = size[0] / size[1];

      if (window.innerWidth / window.innerHeight >= ratio) {
          var w = window.innerHeight * ratio;
          var h = window.innerHeight;
      } else {
          var w = window.innerWidth;
          var h = window.innerWidth / ratio;
      }
      this.screenManager.canvas.view.style.width = w + 'px';
      this.screenManager.canvas.view.style.height = h + 'px'; 
    });

    this.screenManager.addScreen(new MainScreen('mainScreen', this.screenManager, ScreenState.INACTIVE));
    this.screenManager.addScreen(new ContinueScreen('continueScreen', this.screenManager, ScreenState.INACTIVE));
    this.screenManager.addScreen(new MenuScreen('menuScreen', this.screenManager, ScreenState.ACTIVE));
    //this.screenManager.addScreen(new AnimScreen('animScreen', this.screenManager, ScreenState.INACTIVE));
    this.screenManager.loadContent();

    //this.gameLoop();
    requestAnimationFrame(this.gameLoop.bind(this));
  }


  update(time)
  {
    this.screenManager.update(time);
  }

  draw()
  {
    this.screenManager.draw();
  }

  gameLoop(time)
  {
    requestAnimationFrame(this.gameLoop.bind(this));
    this.update(time);
    this.draw();
  }
}
