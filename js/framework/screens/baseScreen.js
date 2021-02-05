
export default class BaseScreen
{
  constructor(name, screenManager, state)
  {
    this.name = name;
    this.sm = screenManager;
    this.state = state;
    this.stage = new PIXI.Container();
    // this.tink = new Tink(PIXI, thi.sm.canvas.view);
    this.resources = screenManager.assetLoader.resources;
    this.delay = 0;
    
  }

  loadContent()
  {

  }

  unloadContent()
  {

  }

  setDelay(delay)
  {
    this.delay = delay * 1000 / 30;
  }
  
  update(time)
  {
    if (this.delay > 0) {
      this.delay--;
      if (this.delay < 0) {
        this.delay = 0;
      }
    }
  }

  draw()
  {
    this.sm.canvas.render(this.stage);
  }
}
