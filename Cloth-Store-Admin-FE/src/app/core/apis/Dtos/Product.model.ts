import {CategoryModel} from "./Category.model";
import {CompanyModel} from "./Company.model";
import {ColorsModel} from "./Colors.model";
import {SizesModel} from "./Sizes.model";

export class ProductModel {
  id!: string | null;
  code!: string | null;
  price!: number | null;
  name!: string | null;
  description!: string | null;
  status!: string | null;
  category!: CategoryModel | null;
  company!: CompanyModel | null;
  image!: string | null;
  specification!: string | null;
  colors!: ColorsModel[] | null;
  sizes!: SizesModel[] | null;
}
