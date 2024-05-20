import {ReceiptTransactionModel} from "./Receipt-transaction.model";
import {ReceiptModel} from "./Receipt.model";

export class ReceiptFullModel{
  receipt! : ReceiptModel | null;
  receiptTransaction! : ReceiptTransactionModel[] | null;
}

