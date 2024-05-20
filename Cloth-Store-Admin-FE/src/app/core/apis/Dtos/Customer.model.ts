import {DatePipe} from "@angular/common";

export class CustomerModel {
  id!: string | null;
  eid!: string | null;
  fullName!: string | null;
  email!: string | null;
  phone!: string | null;
  address!: string | null;
  password!: string | null;
  birthday!: Date;
  gender!: string | null;
  dateCreated!: Date | null;
  dateUpdated!: Date | null;
  ranking!: string | null;
}
