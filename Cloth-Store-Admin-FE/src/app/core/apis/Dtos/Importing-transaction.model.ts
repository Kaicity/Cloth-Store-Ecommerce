import {ImportingModel} from "./Importing.model";
import {ProductModel} from "./Product.model";

export class ImportingTransactionModel {
  id!: string | null;
  importing!: ImportingModel | null;
  product!: ProductModel | null;
  price!: number | null;
  quantity!: number | null;
  amount!: number | null;
}

