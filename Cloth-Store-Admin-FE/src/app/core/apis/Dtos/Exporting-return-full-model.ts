import {ExportingReturnModel} from "./Exporting-return-model";
import {ExportingReturnTransactionBillModel} from "./Exporting-return-transaction-model";


export class ExportingReturnFullModel {
  exportingReturnBill! : ExportingReturnModel | null;
  exportingReturnTransactionList! : ExportingReturnTransactionBillModel[] | null;
}
