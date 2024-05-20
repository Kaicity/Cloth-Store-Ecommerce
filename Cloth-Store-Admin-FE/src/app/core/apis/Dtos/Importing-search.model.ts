import {BaseSearchModel} from "./Base-search.model";
import {ImportingFullModel} from "./Importing-full.model";

export class ImportingSearchModel extends BaseSearchModel<ImportingFullModel[]>{
  idCompany!: string | null;
  status!: string | null;
}
