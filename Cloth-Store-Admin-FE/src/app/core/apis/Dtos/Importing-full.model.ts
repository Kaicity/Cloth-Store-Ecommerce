import {ImportingTransactionModel} from "./Importing-transaction.model";
import {ImportingModel} from "./Importing.model";

export class ImportingFullModel{
  importing! : ImportingModel | null;
  importingTransactions! : ImportingTransactionModel[] | null;
}
