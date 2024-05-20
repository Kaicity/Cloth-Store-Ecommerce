import {BaseSearchModel} from "./Base-search.model";
import {SupplierModel} from "./Supplier.model";

export class SupplierSearchModel extends BaseSearchModel<SupplierModel[]>{
  idCompany!: string | null;
  status!: string | null;
  code!: string | null;
  name!: string | null;
  phone!: string | null;
}
