import Vector2 from '../utils/vector2.js';

export default class TextBox
{
  constructor(value, font, size, position = Vector2.Zero(), style = {})
  {
    var defaultStyle = {
      fontFamily: font,
      fontSize: size,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fill: 'black',
      stroke: '',
      strokeThickness: 0,
      dropShadow: false,
      dropShadowColor: '#000',
      dropShadowBlur: 0,
      dropShadowAngle: 0,
      dropShadowDistance: 0,
      wordWrap: false,
      wordWrapWitdh: 0
    }

    jQuery.extend(defaultStyle, style);

    var style = new PIXI.TextStyle(defaultStyle);
    var text = new PIXI.Text(value, style);
    text.x = position.x;
    text.y = position.y;
    return text;
  }


}
