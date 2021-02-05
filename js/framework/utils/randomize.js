import mul from './mul.js';

export default function randomize(min, max)
{
  var r = Math.floor(Math.random() * max) + min;
  return r;
}
