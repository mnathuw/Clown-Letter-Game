export default class Vector2
{
  constructor(x = 0, y = 0)
  {
    this.x = x;
    this.y = y;
  }

  static Zero()
  {
    // this.x = 0;
    // this.y = 0;
    return new Vector2();
  }

  add(v)
  {
    this.x += (new Number(v.x)).valueOf();
    this.y += (new Number(v.y)).valueOf();
  }

  sub(v)
  {
    this.x -= (new Number(v.x)).valueOf();
    this.y -= (new Number(v.y)).valueOf();
  }

  mul(v)
  {
    this.x *= (new Number(v.x)).valueOf();
    this.y *= (new Number(v.y)).valueOf();
  }

  div(v)
  {
    this.x /= (new Number(v.x)).valueOf();
    this.y /= (new Number(v.y)).valueOf();
  }
}
