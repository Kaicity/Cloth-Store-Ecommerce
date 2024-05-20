import {DatePipe} from "@angular/common";

export class TypePaymentReceiptModel {
  id! : string | null;
  dateUpdated! : DatePipe | null;
  dateCreated! : DatePipe | null;
  type! : string | null;
  name! : string | null;
  description! :string | null;
}
