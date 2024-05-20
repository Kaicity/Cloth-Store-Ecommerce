import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AppSearchImportingComponent
} from "../../importing/components/app-search-importing/app-search-importing.component";
import {AppAddImportingComponent} from "../../importing/components/app-add-importing/app-add-importing.component";
import {ImportingSearchModel} from "../../../../core/apis/dtos/Importing-search.model";
import {ImportingFullModel} from "../../../../core/apis/dtos/Importing-full.model";
import {SupplierModel} from "../../../../core/apis/dtos/Supplier.model";
import {ProductModel} from "../../../../core/apis/dtos/Product.model";
import {ImportingModel} from "../../../../core/apis/dtos/Importing.model";
import {ImportingTransactionModel} from "../../../../core/apis/dtos/Importing-transaction.model";
import {ImportingStatus} from "../../../../core/constanst/ImportingStatus";
import {ImportingService} from "../../../../core/Services/agency/ImportingService";
import {Router} from "@angular/router";
import {SupplierService} from "../../../../core/Services/warehouse/SupplierService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductService} from "../../../../core/Services/warehouse/ProductService";
import {ResponseModel} from "../../../../core/apis/dtos/Response.model";
import {BaseSearchModel} from "../../../../core/apis/dtos/Base-search.model";
import {ExportingReturnStatus} from "../../../../core/constanst/ExportingReturnStatus";
import {
  AppAddExportingReturnComponent
} from "../components/app-add-exporting-return/app-add-exporting-return.component";
import {ExportingReturnSearchModel} from "../../../../core/apis/dtos/Exporting-return-search-model";
import {ExportingReturnFullModel} from "../../../../core/apis/dtos/Exporting-return-full-model";
import {ExportingReturnModel} from "../../../../core/apis/dtos/Exporting-return-model";
import {ExportingReturnTransactionBillModel} from "../../../../core/apis/dtos/Exporting-return-transaction-model";
import {ExportingReturnService} from "../../../../core/Services/agency/ExportingReturnService";
import {ExcelService} from "../../../../core/bussiness-logic/excelService";

interface ExportingReturnStatusDisplay {
  value: ExportingReturnStatus,
  display: string
}

interface ExportingReturnStatusFilter {
  value: string,
  display: string
}

@Component({
  selector: 'app-exporting-return',
  templateUrl: './exporting-return.component.html',
  styleUrl: './exporting-return.component.scss'
})
export class ExportingReturnComponent implements OnInit {
  isShowLoading: boolean = false;
  //Format table
  tableFormat: string = "table table-bordered table-striped";
  @ViewChild("searchWrapper") searchWrapper!: AppAddExportingReturnComponent;
  @ViewChild("AddWrapper") addWrapper!: AppAddExportingReturnComponent;

  //DTO Importing
  exportingReturnSearch: ExportingReturnSearchModel = new ExportingReturnSearchModel();
  exportingReturns: ExportingReturnFullModel[] = [];
  //Gan tra tri importing o day

  suppliers: SupplierModel[] = [];
  products: ProductModel[] = [];

  supplierName: any[] = []; //Lưu danh sách type có tên
  productsName: any[] = [];

  isBtnName: ({ display: string; value: number } | { display: string; value: number })[] = [{
    display: '', value: 0
  }, {display: '', value: 1}];

  private exportingReturnId!: string;

  exportingReturnFullInformation: ExportingReturnFullModel = new ExportingReturnFullModel();
  exportingReturnInformation: ExportingReturnModel = new ExportingReturnModel();
  exportingReturnTransactionInformation: ExportingReturnTransactionBillModel[] = [];

  displayExportingReturn: ExportingReturnStatusDisplay[] = [{value: ExportingReturnStatus.COMPLETE, display: "Đã hoàn thành"},
    {value: ExportingReturnStatus.UNCOMPLETE, display: "Chưa hoàn thành"}];

  displayExportingReturnFilter: ExportingReturnStatusFilter[] = [{value: '', display: "Tất cả"},
    {value: ExportingReturnStatus.COMPLETE, display: "Đã hoàn thành"},
    {value: ExportingReturnStatus.UNCOMPLETE, display: "Chưa hoàn thành"}];

  statusValue!: string;

  datePick: Date = new Date();
  searchTermTable: string = '';
  exportingReturnFill: ExportingReturnFullModel[] = this.exportingReturns;

  constructor(private exportingReturnService: ExportingReturnService, private router: Router, private supplierService: SupplierService,
              private snackBar: MatSnackBar, private productService: ProductService,private excelService: ExcelService) {
  }

  ngOnInit(): void {
    this.getAllExportingReturn();
    this.getAllSuppliers();
    this.getAllProducts();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  showSeachForm() {
    //this.searchWrapper.isSeachChose = true;
  }

  showInsertForm() {
    this.isBtnName[0].value = 0;
    this.isBtnName[0].display = "Lưu";
    this.addWrapper.isInsertChose = true;
    this.exportingReturnInformation = new ExportingReturnModel();
    this.exportingReturnTransactionInformation = [];
    this.statusValue = this.displayExportingReturn[0].value;
  }

  getExportingReturnData(id: string, importing: ExportingReturnFullModel) {
    this.exportingReturnId = id;
    //APIs get product by id
  }

  updateExportingReturn() {
    this.showInsertForm();
    this.isBtnName[0].value = 1;
    this.isBtnName[0].display = "Cập nhật";
    //Lấy importing theo id được chọn
    this.exportingReturnService.getExportingReturnById(this.exportingReturnId).subscribe(res => {
      this.exportingReturnFullInformation = res.result;
      this.exportingReturnInformation = this.exportingReturnFullInformation.exportingReturnBill!;
      this.exportingReturnTransactionInformation = this.exportingReturnFullInformation.exportingReturnTransactionList!;
      this.statusValue = res.result.status;
      this.exportingReturnInformation.dateCreated = this.datePick!;
    })
  }

  deleteExportingReturn() {
    this.exportingReturnService.deleteExportingReturn(this.exportingReturnId).subscribe((res) => {
        this.openSnackBar("Đã xóa thành công phiếu nhập hàng", "Close")
        this.resetPage();
      },
      error => {
        this.openSnackBar("Lỗi khi xóa phiếu nhập hàng", "Đóng")
      }
    )
  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  private getAllExportingReturn() {
    this.isShowLoading = true;
    this.exportingReturnService.getAllExportingReturn().subscribe(res => {
      this.getAllExportingReturnComplete(res)
      console.log(res);
    });
  }

  getAllExportingReturnComplete(res: ResponseModel<BaseSearchModel<ExportingReturnFullModel[]>>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(value => {
          var t: any;
          t.error.message(value);
        });
        return;
      }
    }
    this.exportingReturnSearch.result = res.result.result;
    this.exportingReturnSearch.recordOfPage = 25;
    for (let i = 0; i < this.exportingReturnSearch.recordOfPage; i++) {
      if (this.exportingReturnSearch.result[i] != undefined)
        this.exportingReturns.push(this.exportingReturnSearch.result[i]);
    }
    setTimeout(() => {
      this.isShowLoading = false;
    }, 1000)
  }

  getAllSuppliers() {
    this.supplierService.getAllSupplier().subscribe(res => {
      this.suppliers = res.result.result;
      this.supplierName = this.suppliers;
    });
  }

  getAllProducts() {
    this.productService.getAllProduct().subscribe(res => {
      this.products = res.result.result;
      this.productsName = this.products;
    });
  }

  getStatusOfExportingReturn(status: string) {
    if (status === this.displayExportingReturn[0].value)
      return this.displayExportingReturn[0].display;
    else
      return this.displayExportingReturn[1].display;
  }

  removeItemFromExportingReturnTransactions(index: number) {
    this.exportingReturnTransactionInformation.splice(index, 1);
  }

  isFillStatus: string = this.displayExportingReturnFilter[0].display;

  getFilterStatus(value: string, display: string) {
    this.isFillStatus = display;
    const searchTermLC = value.toLowerCase().trim();
    if (searchTermLC === '') {
      this.exportingReturnFill = this.exportingReturns;
      return;
    }
    this.exportingReturnFill = this.exportingReturns.filter(exportingReturn =>
      exportingReturn.exportingReturnBill?.status!.toLowerCase() === searchTermLC
    );
  }

  //Lọc sản phẩm theo tên và code
  filterExportingReturn(): void {
    const searchTermLC = this.searchTermTable.toLowerCase().trim();
    if (searchTermLC === '') {
      this.exportingReturnFill = this.exportingReturns;
      return;
    }
    this.exportingReturnFill = this.exportingReturns.filter(exportingReturn =>
      exportingReturn.exportingReturnBill?.code!.toLowerCase().includes(searchTermLC)
      || exportingReturn.exportingReturnBill?.supplier?.name!.toLowerCase().includes(searchTermLC)
      || exportingReturn.exportingReturnBill?.importing?.code?.toString()!.toLowerCase().includes(searchTermLC)
    );
  }

  exportDataToExcels() {
    let dataImporting: any[] = [];
    this.exportingReturns.forEach(value => {
      value.exportingReturnBill!.id = "#"
      dataImporting.push(value.exportingReturnBill);
    })
    this.excelService.exportToExcel(dataImporting, 'exported_data');
  }
}
