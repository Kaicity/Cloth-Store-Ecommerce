import {ReceiptModel} from "./Receipt.model";

export class ReceiptTransactionModel{
  id! : string | null;
  receipt! : ReceiptModel | null;
  quantity! : number | null;
  price! : number | null;
  amount! : number | null;
}
