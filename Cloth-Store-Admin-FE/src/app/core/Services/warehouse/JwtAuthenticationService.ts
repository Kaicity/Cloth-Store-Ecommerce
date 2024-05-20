import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/Environment";

@Injectable(
  {providedIn: "root"}
)
export class JwtAuthenticationService{
  baseUrl: string = environment.warehouseBaseUrl;
  constructor(private http: HttpClient) {
  }

  public signIn(signInRequest: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/auth/signin`, signInRequest);
  }
}
