import {BaseSearchModel} from "./Base-search.model";
import {PaymentFullModel} from "./Payment-full.model";

export class PaymentSearchModel extends BaseSearchModel<PaymentFullModel[]> {
  idCompany!: string | null;
  status!: string | null;
}
