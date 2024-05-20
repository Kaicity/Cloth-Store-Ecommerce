import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {WarehouseBaseService} from "../generic/warehouse-base.service";
import {BaseSearchModel} from "../../apis/dtos/Base-search.model";
import {SupplierModel} from "../../apis/dtos/Supplier.model";

@Injectable({
  providedIn: 'root'
}) @Injectable()
export class SupplierService extends WarehouseBaseService {

  public getAllSupplier(): Observable<any> {
    return this.post("/api/v1/Supplier/getAllSupplier", {});
  }

  public deleteSupplierById(id: string): Observable<any> {
    return this.delete("/api/v1/Supplier", id);
  }

  public createSupplier(supplierModel: any): Observable<any> {
    return this.post("/api/v1/Supplier/create", supplierModel);
  }

  public updateSupplier(supplierModel: any): Observable<any> {
    return this.post("/api/v1/Supplier/updateSupplier", supplierModel);
  }

  public getSupplierId(id: any): Observable<any> {
    const body = {id}
    return this.post("/api/v1/Supplier", body)
  }

  public advanceSearch(search: BaseSearchModel<SupplierModel[]>): Observable<any> {
    return this.post("/api/v1/Supplier/searchAdvance", search,);
  }

}
