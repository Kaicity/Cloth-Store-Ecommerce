import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {WarehouseBaseService} from "../generic/warehouse-base.service";

@Injectable(
  {providedIn: "root"}
)
export class OptionService extends WarehouseBaseService{

  public getAllOptionSizes(): Observable<any>{
    return this.post("/api/v1/option/getAllSizes", {});
  }

  public getAllOptionColors(): Observable<any>{
    return this.post("/api/v1/option/getAllColors", {});
  }
}
