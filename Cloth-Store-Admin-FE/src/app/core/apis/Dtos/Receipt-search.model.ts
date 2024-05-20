import {BaseSearchModel} from "./Base-search.model";
import {ReceiptFullModel} from "./Receipt-full.model";

export class ReceiptSearchModel extends BaseSearchModel<ReceiptFullModel[]>{
  idCompany!: string | null;
  status!: string | null;
}
