
export default class Sound
{
  constructor(name)
  {
    var sound = PIXI.sound.find(name);
    return sound;
  }
}
