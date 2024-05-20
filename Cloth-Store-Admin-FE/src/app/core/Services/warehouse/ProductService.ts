import {Observable} from "rxjs";

import {Injectable} from "@angular/core";
import {BaseSearchModel} from "../../apis/dtos/Base-search.model";
import {ProductModel} from "../../apis/dtos/Product.model";
import {WarehouseBaseService} from "../generic/warehouse-base.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends WarehouseBaseService{

  public getAllProduct(): Observable<any> {
    return this.post("/api/v1/Food/findAll", {});
  }

  public advanceSearch(search: BaseSearchModel<ProductModel[]>): Observable<any> {
    return this.post("/api/v1/Food/searchAdvance", search,);
  }

  public addProduct(product: any): Observable<any> {
    return this.post("/api/v1/Food/addProduct", product)
  }

  public updateProduct(product: any): Observable<any> {
    return this.post("/api/v1/Food/updateProduct", product)
  }

  public deleteProduct(productId: string): Observable<any> {
    return this.delete("/api/v1/Food/deleteProduct", productId)
  }

  public getProductId(id: string): Observable<any> {
    return this.get("/api/v1/Food", id)
  }

  public getProductPrice(priceMin: number, priceMax: number): Observable<any> {
    const body = {priceMin, priceMax};
    return this.post("/api/v1/Food/seachPrice", body)
  }

  public getProductCode(code: string): Observable<any> {
    const body = {code};
    return this.post("/api/v1/Food/seachCode", body)
  }

  public getProductName(name: string): Observable<any> {
    const body = {name};
    return this.post("/api/v1/Food/seachName", body)
  }
}
