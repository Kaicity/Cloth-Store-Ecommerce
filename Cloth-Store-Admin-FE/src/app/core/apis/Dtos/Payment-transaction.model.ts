import {PaymentModel} from "./Payment.model";

export class PaymentTransactionModel {
  id! : string | null;
  payment! : PaymentModel | null;
  quantity! : number | null;
  price! : number | null;
  amount! : number | null;
}
