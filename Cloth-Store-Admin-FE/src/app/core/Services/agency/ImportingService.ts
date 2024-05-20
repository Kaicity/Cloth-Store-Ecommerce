import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AgencyBaseService} from "../generic/agency-base-service";

@Injectable({
  providedIn: 'root'
})
export class ImportingService extends AgencyBaseService {
  public getAllImporting(): Observable<any> {
    return this.post("/api/v1/Importing/getAllImporting", {});
  }

  public getImportingById(id: string): Observable<any> {
    return this.get("/api/v1/Importing", id);
  }

  public deleteImporting(id: string): Observable<any> {
    return this.delete("/api/v1/Importing", id);
  }

  public addImporting(importingFull: any): Observable<any> {
    return this.post("/api/v1/Importing/createImporting", importingFull);
  }

  public updateImporting(importingFull: any): Observable<any> {
    return this.post("/api/v1/Importing/updateImporting", importingFull);
  }
}
