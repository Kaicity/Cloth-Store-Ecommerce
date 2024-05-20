import {AgencyModel} from "./Agency.model";
import {DatePipe} from "@angular/common";
import {SupplierModel} from "./Supplier.model";

export class ImportingModel {
  id!: string | null;
  code! : string | null;
  agency!: AgencyModel | null;
  supplier!: SupplierModel | null;
  total!: number | null;
  status!: string | null;
  dateCreated!: Date | null;
  dateUpdated!: Date | null;
}
