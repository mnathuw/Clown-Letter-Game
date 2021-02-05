import Vector2 from '../utils/vector2.js';
import TextBox from './textBox.js';

export default class DigitBox extends PIXI.Container
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

    var style = new PIXI.TextStyle(defaultStyle);
    var padding = 2;
    
    var fatChar = new PIXI.Text("T", style);
    var spaceChar = new PIXI.Text(" ", style);

    this.digits = [];

    for (let i = 0; i < value.length; i++) {
      var val = value[i];
      //var pixiText = new PIXI.Text(val, style);
      var paddingGraph = new PIXI.Graphics();
      var graphics = new PIXI.Graphics();
      var char = fatChar;
      if (val === " " || val === "'") {
        char = spaceChar;
      }
      paddingGraph.beginFill(0x00FF00, 0);     //green?
      paddingGraph.drawRect(0, 0, char.width + padding, char.height + padding);
      paddingGraph.endFill();
      paddingGraph.addChild(graphics);
      
      graphics.beginFill(0xFF0000, 0);    //red
      graphics.drawRect(padding / 2, padding / 2, char.width, char.height);
      graphics.endFill();
      
      var pixiText = new TextBox(val, font, size, position, style);
      pixiText.anchor.set(0.5);
      pixiText.position.x = padding / 2 + char.width / 2;
      pixiText.position.y = padding / 2 + char.height / 2;
      pixiText.revealed = false;
      this.digits.push(pixiText);

      graphics.addChild(pixiText);
      var bounds = this.getBounds();
      paddingGraph.x += bounds.width;
      
      this.addChild(paddingGraph);
    }

    this.x = position.x;
    this.y = position.y;
  }

  v(word = null, visible = false)
  {
    if (word === null) {
      //reveal all characters.
      for (let i = 0; i < this.digits.length; i++) {
        this.digits[i].visible = visible;
      }
    } else {
      //reveal only this word, if multiple word, reveal the one after.
      word = word.toLowerCase();
      let letters = word.split("");
      let letter = letters[0];  //the first letter
      for (let i = 0; i < this.digits.length; i++)
      {
        if (this.digits[i].text.toLowerCase() === letter && this.digits[i].revealed === false) {
          let startLetterIndex = i;
          //let charFound = letter;
          let charFound = "";
          for (let j = 0; j < letters.length; j++) {
            let nextLetterIndex = startLetterIndex + j;
            if (letters[j] !== this.digits[nextLetterIndex].text.toLowerCase()) {
              break;
            } else {
              //char found.
              charFound += this.digits[nextLetterIndex].text.toLowerCase();
              if (charFound === word) {
                for (let f = startLetterIndex; f < startLetterIndex + letters.length; f++) {
                  this.digits[f].revealed = visible;
                  this.digits[f].visible = visible;
                }
                return;
              }
            }
          }
        }
      }  
    }
  }

  reveal(word = null)
  {
    this.v(word, true);
  }

  hide(word = null)
  {
    this.v(word, false);
  }
}
