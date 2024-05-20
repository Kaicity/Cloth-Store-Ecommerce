import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AgencyBaseService} from "../generic/agency-base-service";

@Injectable({
    providedIn: 'root'
})
export class ExportingbillService extends AgencyBaseService {

    public getAllExportingBill(): Observable<any> {
        return this.post("/api/v1/Exportingbill/findExportingAll", {});
    }

    public getAllBill(): Observable<any> {
        return this.post("/api/v1/Exportingbill/getAllExportingBill", {});
    }

    public createBill(exportingFull: any): Observable<any> {
        return this.post("/api/v1/Exportingbill/create", exportingFull);
    }
    public deteleExporting(id: string): Observable<any> {
        return this.delete(`/api/v1/Exportingbill`,id);
    }
    public getExportingById(id: string): Observable<any> {
        return this.get("/api/v1/Exportingbill", id);
    }

    public updateExporting(exportingReturnBillFull: any): Observable<any> {
        return this.post("/api/v1/Exportingbill/updateExporting", exportingReturnBillFull);
    }
}
