import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environment/Environment";
import {Injectable} from "@angular/core";
import {AgencyBaseService} from "../generic/agency-base-service";

@Injectable({
  providedIn: 'root'
}) @Injectable()
export class ReceiptService extends AgencyBaseService{

  public getAllReceipt(): Observable<any> {
    return this.post("/api/v1/Receipt/getAllReceipt", {});
  }
  public getReceiptById(id : string): Observable<any> {
    return this.get("/api/v1/Receipt", id);
  }
  public deleteReceipt(id: string): Observable<any> {
    return this.delete("/api/v1/Receipt", id);
  }
  public addReceipt(receiptFull: any): Observable<any> {
    return this.post("/api/v1/Receipt/createReceipt", receiptFull);
  }
  public updateReceipt(receiptFull: any): Observable<any> {
    return this.post("/api/v1/Receipt/updateReceipt", receiptFull);
  }
}
