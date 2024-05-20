import {BaseSearchModel} from "./Base-search.model";
import {ExportingReturnFullModel} from "./Exporting-return-full-model";

export class ExportingReturnSearchModel extends BaseSearchModel<ExportingReturnFullModel[]>{
  idCompany!: string | null;
  status!: string | null;
}
