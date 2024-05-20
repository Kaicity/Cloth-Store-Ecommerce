import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {SupplierModel} from "../../../../../core/apis/dtos/Supplier.model";
import {SupplierService} from "../../../../../core/Services/warehouse/SupplierService";
import {SupplierSearchModel} from "../../../../../core/apis/dtos/Supplier-search.model";

@Component({
  selector: 'app-search-supplier',
  templateUrl: './app-search-supplier.component.html',
})
export class AppSearchSupplierComponent implements OnInit, AfterViewInit {

  supplierCode: string = '';
  supplierName: string = '';
  supplierPhone: string = '';

  seach: SupplierSearchModel = new SupplierSearchModel();

  isSeachChose: boolean = false;
  supplierItem!: SupplierModel

  //Gửi một danh sách product khi seach được đến view cha
  @Output() dataSupplierIsSeach = new EventEmitter<SupplierModel[]>();
  supplier: SupplierModel[] = [];

  constructor(private supplierService: SupplierService, private router: Router) {
    this.supplierItem = new SupplierModel();

  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.isSeachChose = false;
  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  btnSeach(supplierModels: SupplierModel[]) {
    this.seach.idCompany = "";
    this.seach.status = "True"
    this.seach.code = this.supplierCode;
    this.seach.name = this.supplierName;
    this.seach.phone = this.supplierPhone;

    this.supplierService.advanceSearch(this.seach).subscribe(
      (res) => {
        supplierModels = res.result.result;
        console.log(supplierModels);
        //Vì tính liên tục của angular nên phải gán products liên tục chỗ này
        this.dataSupplierIsSeach.emit(supplierModels);
      }
    )
  }

  loadSupplierFirst() {
    this.resetPage();
  }
}
