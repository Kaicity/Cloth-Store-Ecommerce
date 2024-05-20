import {BaseSearchModel} from "./Base-search.model";
import {ProductModel} from "./Product.model";

export class ProductSearchModel extends BaseSearchModel<ProductModel[]> {
  idCompany!: string | null;
  status!: string | null;
  code!: string | null;
  name!: string | null;
  rangePrice!: string | null;
}
