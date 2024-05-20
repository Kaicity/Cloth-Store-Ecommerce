import {PaymentModel} from "./Payment.model";
import {PaymentTransactionModel} from "./Payment-transaction.model";

export class PaymentFullModel {
  payment! : PaymentModel | null;
  paymentTransactions! : PaymentTransactionModel[] | null;
}
