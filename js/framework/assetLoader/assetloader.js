export default class AssetLoader
{
  constructor()
  {
    this.loader = PIXI.loader;
    this.resources = PIXI.loader.resources;
    this.assets = [];
  }

  addAssets(assets)
  {
    jQuery.extend(this.assets, assets);
  }

  loadContent(caller, finish_callback, progressCallback)
  {
    this.loader.add(this.assets, {crossOrigin: true})
    .on("progress", progressCallback)
    .load( (loader, resources) => {
      finish_callback.call(caller, loader, resources);
    });
    return this;
  }


}
