import Vector2 from '../utils/vector2.js';

export default class Gravity extends Vector2
{
  constructor(v)
  {
    super();
    this.add(v);
  }

  update(time)
  {
    super.update(time);
  }
}
