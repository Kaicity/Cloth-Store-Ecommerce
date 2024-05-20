import {ProductModel} from "./Product.model";
import {ExportingReturnModel} from "./Exporting-return-model";

export class ExportingReturnTransactionBillModel {
  id!: string | null;
  exportingReturn!: ExportingReturnModel | null;
  product!: ProductModel | null;
  price!: number | null;
  quantity!: number | null;
  amount!: number | null;


}

