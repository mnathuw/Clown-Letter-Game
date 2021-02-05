import Vector2 from '../utils/vector2.js';


export default class Animation
{
  constructor(name, animLength, position = Vector2.Zero(), loop = false, anchor = Vector2.Zero(), speed = 0.5)
  {
    //Animation("Symbol 22900", 64, {x, y});
    var frames = []
    for (var i = 0; i < animLength; i++) {
      var val = i < 10 ? '0' + i : i;
      // magically works since the spritesheet was loaded with the pixi loader
      frames.push(PIXI.Texture.fromFrame(name + val));
    }

    this.anim = new PIXI.extras.AnimatedSprite(frames);
    this.anim.x = position.x;
    this.anim.y = position.y;
    this.anim.anchor.set(anchor.x, anchor.y);
    this.anim.animationSpeed = speed;
    this.anim.loop = loop;
    return this.anim;
  }
}
