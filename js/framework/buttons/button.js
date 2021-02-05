export default class Button
{
  constructor(rect = PIXI.Rectangle.EMPTY, debug = false)
  {
    var graphics = new PIXI.Graphics();
    var sprite = new PIXI.Sprite();
    graphics.beginFill(0xFF0000, debug ? 0.5 : 0);
    graphics.drawRect(0, 0, rect.width, rect.height);
    graphics.endFill();
    sprite.addChild(graphics);
    sprite.x = rect.x;
    sprite.y = rect.y;
    sprite.interactive = true;
    sprite.buttonMode = true;
    return sprite;
  }
}
