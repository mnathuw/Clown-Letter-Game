import Vector2 from '../utils/vector2.js';

export default class Sprite
{
  constructor(resources, name, position = Vector2.Zero())
  {
    var texture = new PIXI.Sprite(resources[name].texture);
    texture.x = position.x;
    texture.y = position.y;
    return texture;
  }
}
