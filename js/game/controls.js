import Animation from '../framework/animations/animation.js';
import Button from '../framework/buttons/button.js';
import TextBox from '../framework/box/textBox.js';
import Vector2 from '../framework/utils/vector2.js';

// Allows to have a clickable button/graphic displayed
export default class Controls extends PIXI.Container
{
  constructor(resources, position)
  {
    super();

    // Get home button image
    this.homeBtnNotHoverTexture = resources['assets/images/HomeButton01.png'].texture;
    this.homeBtnHoverTexture = resources['assets/images/HomeButton02.png'].texture;
    
    // Get back button image
    this.backBtnNotHoverTexture = resources['assets/images/BackButton01.png'].texture;
    this.backBtnHoverTexture = resources['assets/images/BackButton02.png'].texture;
    
    // Get music button image (play)
    this.playBtnNotHoverTexture = resources['assets/images/MusicPlay01.png'].texture;
    this.playBtnHoverTexture = resources['assets/images/MusicPlay02.png'].texture;

    // Get music button image (stop)
    this.stopBtnHoverTexture = resources['assets/images/MusicStop02.png'].texture;
    this.stopBtnNotHoverTexture = resources['assets/images/MusicStop01.png'].texture;

    // Get fullscreen button image
    this.fullScreenBtnHoverTexture = resources['assets/images/FullScreenButton02.png'].texture;
    this.fullScreenBtnNotHoverTexture = resources['assets/images/FullScreenButton01.png'].texture;

    this.x = position.x;
    this.y = position.y;

    // Enable interaction home button
    this.home = new PIXI.Sprite(this.homeBtnNotHoverTexture);
    this.home.interactive = true;
    this.home.buttonMode = true;

    // Enable interaction back button
    this.back = new PIXI.Sprite(this.backBtnNotHoverTexture);
    this.back.position.set(0, this.home.width + 5);
    this.back.interactive = true;
    this.back.buttonMode = true;

    // Enable interaction music play button
    this.musicPlay = new PIXI.Sprite(this.playBtnNotHoverTexture);
    this.musicPlay.position.set(0, this.back.y + this.back.width + 5);
    this.musicPlay.interactive = true;
    this.musicPlay.buttonMode = true;

    // Enable interaction music stop button
    this.musicStop = new PIXI.Sprite(this.stopBtnNotHoverTexture);
    this.musicStop.position.set(0, this.musicPlay.y);
    this.musicStop.interactive = false;
    this.musicStop.buttonMode = true;
    this.musicStop.visible = false;

    // Enable interaction fullscreen button
    this.fullScreen = new PIXI.Sprite(this.fullScreenBtnNotHoverTexture);
    this.fullScreen.position.set(0, this.musicPlay.y + this.musicPlay.width + 5);
    this.fullScreen.interactive = true;
    this.fullScreen.buttonMode = true;

    // When user click home button, user will be directed to the index page
    this.home.on('pointerdown', () => window.location.replace("https://www.samamuse.ca/jeux/index.html"));    
    this.home.on('mouseover', this.onHomeBtnMouseOver.bind(this));
    this.home.on('mouseout', this.onHomeBtnMouseOut.bind(this));

    // When user click back button, return to the menuscreen
    this.back.on('pointerdown', this.backClick.bind(this));
    this.back.on('mouseover', this.onBackBtnMouseOver.bind(this));
    this.back.on('mouseout', this.onBackBtnMouseOut.bind(this));
    
    // Set music play/stop
    this.musicPlay.on('pointerdown', this.startMusic.bind(this));
    this.musicStop.on('pointerdown', this.stopMusic.bind(this));

    this.musicPlay.on('mouseover', this.onPlayBtnMouseOver.bind(this));
    this.musicStop.on('mouseover', this.onStopBtnMouseOver.bind(this));

    this.musicPlay.on('mouseout', this.onPlayBtnMouseOut.bind(this));
    this.musicStop.on('mouseout', this.onStopBtnMouseOut.bind(this));

    // When user click fullscreen button, the game will be in fullscreen mode
    this.fullScreen.on('pointerdown',this.openFullscreen.bind(this));    
    this.fullScreen.on('mouseover', this.onFullScreenMouseOver.bind(this));
    this.fullScreen.on('mouseout', this.onFullScreenMouseOut.bind(this));

    this.addChild(this.home);
    this.addChild(this.back);
    this.addChild(this.musicPlay);
    this.addChild(this.musicStop);
    this.addChild(this.fullScreen);
  }

  setMusic(music)
  {
    if (music) {
      this.music = music;
      this.music.sound.loop = true;
    } else {
      // Should throw error
      console.error("setMusic(music) has taken undefined as parameter, please check the resource key")
    }
  }

  // On Hover
  onHomeBtnMouseOver(){
    this.home.texture = this.homeBtnHoverTexture
  }

  onBackBtnMouseOver(){
    this.back.texture = this.backBtnHoverTexture
  }

  onPlayBtnMouseOver() {
    this.musicPlay.texture = this.playBtnHoverTexture
  }
  
  onStopBtnMouseOver() {
    this.musicStop.texture = this.stopBtnHoverTexture
  }

  onFullScreenMouseOver(){
    this.fullScreen.texture = this.fullScreenBtnHoverTexture
  }

  // On not hover
  onHomeBtnMouseOut(){
    this.home.texture = this.homeBtnNotHoverTexture
  }

  onBackBtnMouseOut(){
    this.back.texture = this.backBtnNotHoverTexture
  }

  onPlayBtnMouseOut() {
    this.musicPlay.texture = this.playBtnNotHoverTexture
  }
  
  onStopBtnMouseOut() {
    this.musicStop.texture = this.stopBtnNotHoverTexture
  }

  onFullScreenMouseOut() {
    this.fullScreen.texture = this.fullScreenBtnNotHoverTexture
  }
  
  startMusic()
  {
    this.toggleMusicButton();
    this.musicPlaying = true;
    this.music.sound.play();
  }

  stopMusic()
  {
    this.toggleMusicButton();
    this.musicPlaying = false;
    this.music.sound.stop();
  }

  toggleMusicButton()
  {
    this.musicPlay.visible = !this.musicPlay.visible;
    this.musicStop.visible = !this.musicStop.visible;
    this.musicPlay.interactive = !this.musicPlay.interactive;
    this.musicStop.interactive = !this.musicStop.interactive;
  }

  homeClick()
  {
    if (this.homeTrigger !== undefined) {
      this.homeTrigger();
    }
  }

  backClick()
  {
    if (this.backTrigger !== undefined) {
      
      this.backTrigger();
    }
  }

  // This fullscreen in progress. It may not work on ios browsers.
  // You may check this website: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API in browser compatibility
  openFullscreen() {
  if (document.getElementsByTagName('canvas')[0].requestFullscreen) {
    document.getElementsByTagName('canvas')[0].requestFullscreen();
  } else if (document.getElementsByTagName('canvas')[0].mozRequestFullScreen) { /* Firefox */
    document.getElementsByTagName('canvas')[0].mozRequestFullScreen();
  } else if (document.getElementsByTagName('canvas')[0].webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    document.getElementsByTagName('canvas')[0].webkitRequestFullscreen();
  } else if (document.getElementsByTagName('canvas')[0].msRequestFullscreen) { /* IE/Edge */
    document.getElementsByTagName('canvas')[0].msRequestFullscreen();
  }
}
}
