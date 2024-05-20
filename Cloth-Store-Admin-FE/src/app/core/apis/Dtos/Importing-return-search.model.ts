import {BaseSearchModel} from "./Base-search.model";
import {ImportingReturnFullModel} from "./Importing-return-full.model";

export class ImportingReturnSearchModel extends BaseSearchModel<ImportingReturnFullModel[]> {
  idCompany!: string | null;
  status!: string | null;
  code!: string | null;
  name!: string | null;
  rangePrice!: string | null;
  priceMin!: string | null;
}
