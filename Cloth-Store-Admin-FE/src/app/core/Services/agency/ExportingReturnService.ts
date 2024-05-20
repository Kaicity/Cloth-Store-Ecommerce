import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AgencyBaseService} from "../generic/agency-base-service";

@Injectable({
  providedIn: 'root'
})
export class ExportingReturnService extends AgencyBaseService {
  public getAllExportingReturn(): Observable<any> {
    return this.post("/api/v1/ExportReturn/getAllExportingReturn", {});
  }

  public getExportingReturnById(id: string): Observable<any> {
    return this.get("/api/v1/ExportReturn", id);
  }

  public deleteExportingReturn(id: string): Observable<any> {
    return this.delete("/api/v1/ExportReturn", id);
  }

  public addExportingReturn(exportingReturnFull: any): Observable<any> {
    return this.post("/api/v1/ExportReturn/createExportingReturn", exportingReturnFull);
  }

  public updateExportingReturn(exportingReturnFull: any): Observable<any> {
    return this.post("/api/v1/ExportReturn/updateExportingReturn", exportingReturnFull);
  }
}
