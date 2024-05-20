import {AgencyModel} from "./Agency.model";
import {SupplierModel} from "./Supplier.model";
import {ImportingModel} from "./Importing.model";

export class ExportingReturnModel {
  id!: string | null;
  code! : string | null;
  agency!: AgencyModel | null;
  supplier!: SupplierModel | null;
  total!: number | null;
  status!: string | null;
  dateCreated!: Date | null;
  dateUpdated!: Date | null;
  importing!:ImportingModel | null;
}
