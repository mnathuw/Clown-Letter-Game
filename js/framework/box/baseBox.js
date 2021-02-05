import Vector2 from '../utils/vector2.js';
import TextBox from './textBox.js';

export default class BaseBox extends PIXI.Container
{
  constructor(value, font, size, position = Vector2.Zero(), style = {})
  {
    super();
    var defaultStyle = {
      fontFamily: font,
      fontSize: size,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fill: '#000',
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
  }

}
