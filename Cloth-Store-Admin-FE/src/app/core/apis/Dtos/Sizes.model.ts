import {OptionModel} from "./Option.model";
import {ProductModel} from "./Product.model";

export class SizesModel {
  id!: string | null;
  optionProduct!: OptionModel | null;
  addition!: number | null;
  product!: ProductModel | null;
}
