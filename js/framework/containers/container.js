import Vector2 from "../utils/vector2.js";

export default class Container extends PIXI.Container
{
  constructor(pos)
  {
    super();
    this.delay = 0;
    //this.pos = pos;
    this.position.x = pos.x;
    this.position.y = pos.y;
    this.vel = new Vector2();
    this.acc = new Vector2();
  }

  setDelay(delay)
  {
    this.delay = delay * 1000 / 30;
  }

  applyForce(f)
  {
    this.acc = f;
  }

  update(time)
  {
    if (this.delay > 0) {
      this.delay--;
      if (this.delay < 0) {
        this.delay = 0;
      }
    }

    this.vel.add(this.acc);
    this.position.x += this.vel.x;
    this.position.y += this.vel.y;
  }
}
