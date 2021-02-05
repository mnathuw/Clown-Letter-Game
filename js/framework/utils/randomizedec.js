export default class randomizedec
{
  constructor(min, max, dec)
  {
    // min = String(min).replace(',','.');
    // max = String(max).replace(',','.');
    var r = Math.random() * max + min;
    r = Number(r).toFixed(dec);
    // r = r.replace('.',',');
    this.min = min;
    this.max = max;
    this.dec = dec;
    this.value = r;
  }
}
