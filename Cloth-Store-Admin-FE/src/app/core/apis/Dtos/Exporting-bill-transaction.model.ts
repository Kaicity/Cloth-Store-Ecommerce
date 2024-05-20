import {ProductModel} from "./Product.model";
import {ExportingBillModel} from "./Exporting-bill.model";

export class ExportingBillTransactionModel {
  id!: string | null;
  bill!: ExportingBillModel | null;
  product!: ProductModel | null;
  quantity!: number | null;
  amount!: number | null;
}
