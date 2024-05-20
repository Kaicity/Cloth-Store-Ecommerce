import {Injectable} from "@angular/core";
import {AgencyBaseService} from "../generic/agency-base-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImportingReturnService extends AgencyBaseService {
  public seachAllImportingReturn(): Observable<any> {
    return this.post("/api/v1/Importingbillreturnbill/findimportingReturnAll", {});
  }

  public getImportingReturnById(id: string): Observable<any> {
    return this.get("/api/v1/Importingbillreturnbill", id);
  }

  public deleteImportingReturn(id: string): Observable<any> {
    return this.delete("/api/v1/Importingbillreturnbill", id);
  }

  public createReturnBill(importingReturnBIll: any): Observable<any> {
    return this.post("/api/v1/Importingbillreturnbill/create", importingReturnBIll);
  }

  public updateImportingReturn(ImportingReturnBillFull: any): Observable<any> {
    return this.post("/api/v1/Importingbillreturnbill/updateExporting", ImportingReturnBillFull);
  }
}
