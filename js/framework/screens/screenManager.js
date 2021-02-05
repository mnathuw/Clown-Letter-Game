import ScreenState from './screenState.js';
import AssetLoader from '../assetLoader/assetloader.js';
import LoadingScreen from './loadingScreen.js';

export default class ScreenManager
{
  constructor(game, assetLoader)
  {
    this.game = game;
    this.screens = new Array();
    this.assetLoader = assetLoader;
    // Deal with responsive for mobile device
    this.ratio = 1920 / 1080;

    this.canvas = new PIXI.CanvasRenderer(1920,1080);
    this.resize();

    window.onresize =()  =>{
      this.resize();
  };
  }

  resize() 
  {
    if (window.innerWidth / window.innerHeight >= this.ratio) {
			var ancho = ~~(window.innerHeight * this.ratio);
			var alto= window.innerHeight;

			this.canvas.view.style.position = 'absolute';
			this.canvas.view.style.width = ancho + 'px';
			this.canvas.view.style.height = alto + 'px';
			//console.log("A");
			
			this.canvas.view.style.left = ~~((window.innerWidth-ancho)/2) + 'px';
      this.canvas.view.style.top = '0px';
      //this.canvas.view.style.top = (window.innerHeight-(alto/2)) + 'px'
			
    } else {
			
			ancho = window.innerWidth;
			alto = ~~(window.innerWidth / this.ratio);

		  this.canvas.view.style.position = 'absolute';
			this.canvas.view.style.width = ancho + 'px';
			this.canvas.view.style.height = alto + 'px';
			//console.log("B");
			this.canvas.view.style.left = 0 + 'px';
		  this.canvas.view.style.top = (window.innerheight-(alto/2)) + 'px';
			
    }
  }

  init()
  {
    document.body.appendChild(this.canvas.view);
  }

  getWidth(w)
  {
    return this.canvas.width;
  }

  getHeight(h)
  {
    return this.canvas.height;
  }

  loadContent()
  {
    this.loadingScreen = new LoadingScreen('loadingScreen', this, ScreenState.ACTIVE);
    this.loadingScreen.loadContent();
    this.addScreen(this.loadingScreen);
    this.assetLoader.loadContent(this, this.contentLoaded, this.loadProgressHandler.bind(this));
  }

  contentLoaded()
  {
    this.removeScreen(this.loadingScreen);
    for(var i=0;i<this.screens.length;i++)
    {
      if (this.screens[i].state === ScreenState.ACTIVE) {
        this.screens[i].loadContent();
      }
    }
  }

  loadProgressHandler(loader, resource)
  {
    this.loadingScreen.progress(loader.progress);
    console.log("loading:" + resource.url);
    console.log("progress: " + loader.progress + "%");
  }

  addScreen(screen)
  {
    this.screens.push(screen);
  }

  removeScreen(screen)
  {
    for (var i=0;i<this.screens.length;i++) {
      if (this.screens[i].name === screen.name) {
        this.screens[i].unloadContent();
        this.screens.splice(i,1);
      }
    }
  }

  getScreen(screenName)
  {
    for (var i=0;i<this.screens.length;i++) {
      if (this.screens[i].name === screenName) {
        return this.screens[i];
      }
    }
    return null;
  }

  changeScreenState(screenName, newState)
  {
    for(var i=0;i<this.screens.length;i++) {
      if (this.screens[i].name === screenName) {
        this.screens[i].state = newState;
        return;
      }
    }
  }

  update(time)
  {
    for(var i=0;i<this.screens.length;i++)
    {
      if (this.screens[i].state === ScreenState.ACTIVE)
        this.screens[i].update();
    }
  }

  draw()
  {
    for(var i=0;i<this.screens.length;i++)
    {
      if (this.screens[i].state === ScreenState.ACTIVE || this.screens[i].state === ScreenState.FROZEN)
        this.screens[i].draw();
    }
  }
}


