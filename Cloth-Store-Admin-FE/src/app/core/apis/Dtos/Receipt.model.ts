import {DatePipe} from "@angular/common";
import {TypePaymentReceiptModel} from "./TypePaymentReceipt.model";

export class ReceiptModel{
  id! : string | null;
  code! : string | null;
  dateUpdated! : Date | null;
  dateCreated! : Date | null;
  total! : number | null;
  payer!: string | null
  status!: string | null;
  typePaymentReceipt! : TypePaymentReceiptModel | null;
  note! : string | null;
}
