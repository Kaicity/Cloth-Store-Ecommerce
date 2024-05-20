import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AgencyBaseService} from "../generic/agency-base-service";

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends AgencyBaseService{

  public getAllPayment(): Observable<any> {
    return this.post("/api/v1/Payment/getAllPayment", {});
  }
  public getPaymentById(id : string): Observable<any> {
    return this.get("/api/v1/Payment", id);
  }
  public deletePayment(id: string): Observable<any> {
    return this.delete("/api/v1/Payment",id);
  }
  public addPayment(paymentFull: any): Observable<any> {
    return this.post("/api/v1/Payment/createPayment", paymentFull);
  }
  public updatePayment(paymentFull: any): Observable<any> {
    return this.post("/api/v1/Payment/updatePayment", paymentFull);
  }
}
