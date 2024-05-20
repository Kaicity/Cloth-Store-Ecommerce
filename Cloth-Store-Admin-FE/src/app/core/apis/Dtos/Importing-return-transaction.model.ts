import {ProductModel} from "./Product.model";
import {ImportingReturnBillModel} from "./Importing-return-bill.model";
import {ColorsModel} from "./Colors.model";
import {SizesModel} from "./Sizes.model";

export class ImportingReturnTransactionModel {
  id!: string | null;
  bill!: ImportingReturnBillModel | null;
  product!: ProductModel | null;
  quantity!: number | null;
  amount!: number | null;
  color!: ColorsModel | null;
  size!: SizesModel | null;
}
