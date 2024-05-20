import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ResponseModel} from "../../../../core/apis/dtos/Response.model";
import {BaseSearchModel} from "../../../../core/apis/dtos/Base-search.model";
import {AppSearchImportingComponent} from "../components/app-search-importing/app-search-importing.component";
import {AppAddImportingComponent} from "../components/app-add-importing/app-add-importing.component";
import {ImportingSearchModel} from "../../../../core/apis/dtos/Importing-search.model";
import {ImportingTransactionModel} from "../../../../core/apis/dtos/Importing-transaction.model";
import {ImportingFullModel} from "../../../../core/apis/dtos/Importing-full.model";
import {ImportingModel} from "../../../../core/apis/dtos/Importing.model";
import {ImportingService} from "../../../../core/Services/agency/ImportingService";
import {SupplierService} from "../../../../core/Services/warehouse/SupplierService";
import {SupplierModel} from "../../../../core/apis/dtos/Supplier.model";
import {ProductService} from "../../../../core/Services/warehouse/ProductService";
import {ProductModel} from "../../../../core/apis/dtos/Product.model";
import {ImportingStatus} from "../../../../core/constanst/ImportingStatus";
import {ExportingReturnService} from "../../../../core/Services/agency/ExportingReturnService";
import {ExcelService} from "../../../../core/bussiness-logic/excelService";

interface ImportingStatusDisplay {
  value: ImportingStatus,
  display: string
}

interface ImportingStatusFilter {
  value: string,
  display: string
}

@Component({
  selector: 'app-importing',
  templateUrl: './importing.component.html',
  styleUrl: './importing.component.scss'
})
export class ImportingComponent implements OnInit {
  isShowLoading: boolean = false;
  //Format table
  tableFormat: string = "table table-bordered table-striped";
  @ViewChild("searchWrapper") searchWrapper!: AppSearchImportingComponent;
  @ViewChild("AddWrapper") addWrapper!: AppAddImportingComponent;

  //DTO Importing
  importingSeach: ImportingSearchModel = new ImportingSearchModel();
  importings: ImportingFullModel[] = [];
  //Gan tra tri importing o day

  suppliers: SupplierModel[] = [];
  products: ProductModel[] = [];

  supplierName: any[] = []; //Lưu danh sách type có tên
  productsName: any[] = [];

  isBtnName: ({ display: string; value: number } | { display: string; value: number } | {
    display: string;
    value: number
  })[] = [{
    display: '', value: 0
  }, {display: '', value: 1}, {display: '', value: 2}];

  private importingId!: string;

  importingFullInformation: ImportingFullModel = new ImportingFullModel();
  importingInformation: ImportingModel = new ImportingModel();
  importingTransactionInformation: ImportingTransactionModel[] = [];

  displayImporting: ImportingStatusDisplay[] = [{value: ImportingStatus.COMPLETE, display: "Đã hoàn thành"},
    {value: ImportingStatus.UNCOMPLETE, display: "Chưa hoàn thành"}];

  displayImportingFilter: ImportingStatusFilter[] = [{value: '', display: "Tất cả"},
    {value: ImportingStatus.COMPLETE, display: "Đã hoàn thành"},
    {value: ImportingStatus.UNCOMPLETE, display: "Chưa hoàn thành"}];

  statusValue!: string;

  datePick: Date = new Date();
  searchTermTable: string = '';
  importingFill: ImportingFullModel[] = this.importings;

  //Check bill là trả hàng
  isCrementQuatity: boolean = false;

  constructor(private importingService: ImportingService, private router: Router, private supplierService: SupplierService,
              private snackBar: MatSnackBar, private productService: ProductService, private exportingReturnService: ExportingReturnService,
              private excelService: ExcelService) {
  }

  ngOnInit(): void {
    this.getAllImporting();
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
    this.isCrementQuatity = true;
    this.addWrapper.isInsertChose = true;
    this.importingInformation = new ImportingModel();
    this.importingTransactionInformation = [];
    this.statusValue = this.displayImporting[0].value;
  }

  getImportingData(id: string, importing: ImportingFullModel) {
    this.importingId = id;
    //APIs get product by id
  }

  updateImporting() {
    this.showInsertForm();
    this.isBtnName[0].value = 1;
    this.isBtnName[0].display = "Cập nhật";
    this.isCrementQuatity = true;
    //Lấy importing theo id được chọn
    this.importingService.getImportingById(this.importingId).subscribe(res => {
      this.importingFullInformation = res.result;
      this.importingInformation = this.importingFullInformation.importing!;
      this.importingTransactionInformation = this.importingFullInformation.importingTransactions!;
      this.statusValue = res.result.status;
      this.importingInformation.dateCreated = this.datePick!;
    })
  }

  deleteImporting() {
    this.importingService.deleteImporting(this.importingId).subscribe((res) => {
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

  private getAllImporting() {
    this.isShowLoading = true;
    this.importingService.getAllImporting().subscribe(res => {
      this.getAllImportingComplete(res)
      console.log(res);
    });
  }

  getAllImportingComplete(res: ResponseModel<BaseSearchModel<ImportingFullModel[]>>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(value => {
          var t: any;
          t.error.message(value);
        });
        return;
      }
    }
    this.importingSeach.result = res.result.result;
    this.importingSeach.recordOfPage = 25;
    for (let i = 0; i < this.importingSeach.recordOfPage; i++) {
      if (this.importingSeach.result[i] != undefined)
        this.importings.push(this.importingSeach.result[i]);
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

  getStatusOfImporting(status: string) {
    if (status === this.displayImporting[0].value)
      return this.displayImporting[0].display;
    else
      return this.displayImporting[1].display;
  }

  removeItemFromImportingTransactions(index: number) {
    this.importingTransactionInformation.splice(index, 1);
  }

  isFillStatus: string = this.displayImportingFilter[0].display;

  getFilterStatus(value: string, display: string) {
    this.isFillStatus = display;
    const searchTermLC = value.toLowerCase().trim();
    if (searchTermLC === '') {
      this.importingFill = this.importings;
      return;
    }
    this.importingFill = this.importings.filter(importing =>
      importing.importing?.status!.toLowerCase() === searchTermLC
    );
  }

  //Lọc sản phẩm theo tên và code
  filterImporting(): void {
    const searchTermLC = this.searchTermTable.toLowerCase().trim();
    if (searchTermLC === '') {
      this.importingFill = this.importings;
      return;
    }
    this.importingFill = this.importings.filter(importing =>
      importing.importing?.code!.toLowerCase().includes(searchTermLC) || importing.importing?.supplier?.name!.toLowerCase().includes(searchTermLC)
      || importing.importing?.total?.toString()!.toLowerCase().includes(searchTermLC)
    );
  }

  createExportingReturn() {
    this.showInsertForm();
    this.isBtnName[0].value = 2;
    this.isBtnName[0].display = "Trả hàng";
    this.isCrementQuatity = false;
    //Lấy importing theo id được chọn
    this.importingService.getImportingById(this.importingId).subscribe(res => {
      this.importingFullInformation = res.result;
      this.importingInformation = this.importingFullInformation.importing!;
      this.importingTransactionInformation = this.importingFullInformation.importingTransactions!;
      this.statusValue = res.result.status;
      this.importingInformation.dateCreated = this.datePick!;
    })
  }

  exportDataToExcels() {
    let dataImporting: any[] = [];
    this.importings.forEach(value => {
      value.importing!.id = "#"
      dataImporting.push(value.importing);
    })
    this.excelService.exportToExcel(dataImporting, 'exported_data');
  }
}
