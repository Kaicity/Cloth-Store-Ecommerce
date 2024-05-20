import {CustomerModel} from "./Customer.model";
import {BillStatus} from "../../constanst/BillStatus";
import {AgencyModel} from "./Agency.model";
import {CustomerNotLoginModel} from "./Customer-notLogin.model";

export class ExportingBillModel {
  id!: string | null;
  code!: string | null;
  dateExport!: Date | null;
  dateCreated!: Date | null;
  total!: number | null;
  status!: BillStatus | null;
  customer!: CustomerModel | null;
  agency!: AgencyModel | null;
  customerNotLogin!: CustomerNotLoginModel | null;
}
