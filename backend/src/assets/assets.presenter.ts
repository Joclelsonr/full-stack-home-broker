import { Asset } from './entities/asset.entity';

export class AssetsPresenter {
  constructor(private assets: Asset) {}

  toJSON() {
    return {
      _id: this.assets._id,
      name: this.assets.name,
      symbol: this.assets.symbol,
      price: this.assets.price,
      image_url: `http://localhost:9000/${this.assets.image}`,
    };
  }
}
