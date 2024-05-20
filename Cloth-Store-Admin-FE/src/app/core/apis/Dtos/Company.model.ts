import {DatePipe} from "@angular/common";

export class CompanyModel {
  id!: string | null;
  companyid!: string | null;
  name!: string | null;
  createDate!: DatePipe | null;
  updateDate!: DatePipe | null;
  phone!: string | null;
  address!: string | null;
  code!: string | null;
}
