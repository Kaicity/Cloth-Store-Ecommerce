import {DatePipe} from "@angular/common";


export class SupplierModel{
  id! : string | null;
  code! : string | null;
  name! : string | null;
  phone! : string | null;
  address! : string | null;
  status!: string | null;
  dateCreate! : Date | null;
  dateUpdate! : Date | null;
}

