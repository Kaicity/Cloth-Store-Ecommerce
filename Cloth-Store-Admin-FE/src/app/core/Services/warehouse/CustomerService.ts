import {Observable} from "rxjs";

import {Injectable} from "@angular/core";
import {WarehouseBaseService} from "../generic/warehouse-base.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends WarehouseBaseService{

  public addCustomer(customerUser: any): Observable<any> {
    return this.post("/api/v1/Customer/create", customerUser);
  }
  public updateCustomer(customerUser: any): Observable<any> {
    return this.post("/api/v1/Customer/updateCustomer", customerUser);
  }
  public deleteCustomer(id: string): Observable<any> {
    return this.delete("/api/v1/Customer/", id)
  }
  public getCustomerById(id: string): Observable<any> {
    const body = {id};
    return this.post("/api/v1/Customer/getCustomerById", body)
  }
  public getCustomerBycode(eid: string): Observable<any> {
    const body = {eid};
    return this.post("/api/v1/Customer/getCustomerBycode", body)
  }

  public getAllCustomer(): Observable<any> {
    return this.post("/api/v1/Customer/getAllCustomer", {});
  }
  public getUser(username: String, password: String) {
    const body = {username, password};
    return this.post("/api/v1/Customer/login", body);
  }

  public addUserInfo(customerUserInfo: any): Observable<any> {
    return this.post("/api/v1/Customer/createInfo", customerUserInfo)
  }
}
