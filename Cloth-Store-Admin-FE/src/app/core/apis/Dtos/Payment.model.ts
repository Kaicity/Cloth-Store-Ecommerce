import {DatePipe} from "@angular/common";
import {TypePaymentReceiptModel} from "./TypePaymentReceipt.model";

export class PaymentModel {
  id! : string | null;
  code! : string | null;
  dateUpdated! : Date | null;
  dateCreated! : Date | null;
  total! : number | null;
  beneficiary! : string | null;
  status!: string | null;
  typePaymentReceipt! : TypePaymentReceiptModel | null;
  note! : string | null;
}
