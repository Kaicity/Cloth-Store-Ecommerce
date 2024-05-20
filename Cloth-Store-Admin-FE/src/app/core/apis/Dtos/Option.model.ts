import {DatePipe} from "@angular/common";

export class OptionModel {
  id!: string | null;
  name!: string | null;
  type!: string | null;
  dateCreated!: DatePipe | null;
  dateUpdate!: DatePipe | null;
}
