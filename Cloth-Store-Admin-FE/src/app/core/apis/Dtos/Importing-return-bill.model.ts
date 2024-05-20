import {CustomerModel} from "./Customer.model";
import {AgencyModel} from "./Agency.model";
import {ExportingBillModel} from "./Exporting-bill.model";
import {CustomerInfoModel} from "./Customer-Info.model";
import {BillStatus} from "../../constanst/BillStatus";

export class ImportingReturnBillModel {
  id!: string | null;
  code!: string | null;
  dateExport!: Date | null;
  dateCreated!: Date | null;
  total!: number | null;
  status!: string | null;
  customer!: CustomerModel | null;
  agency!: AgencyModel | null;
  exporting!: ExportingBillModel | null;
  customerNotLogin!: CustomerInfoModel | null;
}
