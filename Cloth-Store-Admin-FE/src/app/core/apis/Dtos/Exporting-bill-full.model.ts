import {ExportingBillTransactionModel} from "./Exporting-bill-transaction.model";
import {ExportingBillModel} from "./Exporting-bill.model";

export class ExportingBillFullModel {
  exportingBill!: ExportingBillModel | null;
  exportingBillTransactions!: ExportingBillTransactionModel[] | null;
}
