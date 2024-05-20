import {ImportingReturnTransactionModel} from "./Importing-return-transaction.model";
import {ImportingReturnBillModel} from "./Importing-return-bill.model";

export class ImportingReturnFullModel {
  importingReturn!: ImportingReturnBillModel | null;
  importingReturnTransactionModels!: ImportingReturnTransactionModel[];
}
