import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductModel} from "../../../../../core/apis/dtos/Product.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductService} from "../../../../../core/Services/warehouse/ProductService";
import {ResponseModel} from "../../../../../core/apis/dtos/Response.model";
import {BaseSearchModel} from "../../../../../core/apis/dtos/Base-search.model";
import {
  AppSearchImportingReturnComponent
} from "../../components/app-search-importing-return/app-search-importing-return.component";
import {
  AppAddImportingReturnComponent
} from "../../components/app-add-importing-return/app-add-importing-return.component";
import {ImportingReturnStatus} from "../../../../../core/constanst/ImportingReturnStatus";
import {ImportingReturnSearchModel} from "../../../../../core/apis/dtos/Importing-return-search.model";
import {ImportingReturnFullModel} from "../../../../../core/apis/dtos/Importing-return-full.model";
import {ImportingReturnBillModel} from "../../../../../core/apis/dtos/Importing-return-bill.model";
import {ImportingReturnTransactionModel} from "../../../../../core/apis/dtos/Importing-return-transaction.model";
import {ImportingReturnService} from "../../../../../core/Services/agency/ImportingReturnService";
import {CustomerModel} from "../../../../../core/apis/dtos/Customer.model";
import {CustomerService} from "../../../../../core/Services/warehouse/CustomerService";
import {BillStatus} from "../../../../../core/constanst/BillStatus";
import {ExcelService} from "../../../../../core/bussiness-logic/excelService";

interface ImportingReturnStatusDisplay {
  value: ImportingReturnStatus,
  display: string
}

interface ImportingReturnStatusFilter {
  value: string,
  display: string
}

@Component({
  selector: 'app-importing-return',
  templateUrl: './importing-return.component.html',
  styleUrl: './importing-return.component.scss'
})
export class ImportingReturnComponent implements OnInit {
  isShowLoading: boolean = false;
  //Format table
  tableFormat: string = "table table-bordered table-striped";
  @ViewChild("searchWrapper") searchWrapper!: AppSearchImportingReturnComponent;
  @ViewChild("AddWrapper") addWrapper!: AppAddImportingReturnComponent;

  importingReturnSearch: ImportingReturnSearchModel = new ImportingReturnSearchModel();
  importingReturns: ImportingReturnFullModel[] = [];
  //Gan tra tri importing o day

  customer: CustomerModel[] = [];
  products: ProductModel[] = [];

  customerName: any[] = []; //Lưu danh sách type có tên
  productsName: any[] = [];

  isBtnName: ({ display: string; value: number } | { display: string; value: number })[] = [{
    display: '', value: 0
  }, {display: '', value: 1}];

  private importingReturnId!: string;

  importingReturnFullInformation: ImportingReturnFullModel = new ImportingReturnFullModel();
  importingReturnInformation: ImportingReturnBillModel = new ImportingReturnBillModel();
  importingReturnTransactionInformation: ImportingReturnTransactionModel[] = [];

  displayImportingReturn: ({ value: BillStatus, display: string; })[] = [
    {value: BillStatus.COMPELETED, display: "Đã hoàn thành"},
    {value: BillStatus.CHECKED, display: "Đã kiểm tra"},
    {value: BillStatus.BOOKING, display: "Đang đặt hàng"},
    {value: BillStatus.CANCELLED, display: "Đã hủy"},
    {value: BillStatus.SHIPPING, display: "Đang giao hàng"},
  ];

  displayImportingReturnFilter: ImportingReturnStatusFilter[] = [{value: '', display: "Tất cả"},
    {value: ImportingReturnStatus.COMPLETE, display: "Đã hoàn thành"},
    {value: ImportingReturnStatus.UNCOMPLETE, display: "Chưa hoàn thành"}];

  statusValue!: string;

  datePick: Date = new Date();
  searchTermTable: string = '';
  importingReturnFill: ImportingReturnFullModel[] = this.importingReturns;

  constructor(private importingReturnService: ImportingReturnService, private router: Router, private customerService: CustomerService,
              private snackBar: MatSnackBar, private productService: ProductService, private excelService: ExcelService) {
  }

  ngOnInit(): void {
    this.getAllImportingReturn();
    this.getAllCustomers();
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
    this.importingReturnInformation = new ImportingReturnBillModel();
    this.importingReturnTransactionInformation = [];
    this.statusValue = this.displayImportingReturn[0].value;
  }

  getImportingReturnData(id: string, importing: ImportingReturnFullModel) {
    this.importingReturnId = id;
    //APIs get product by id
  }

  updateImportingReturn() {
    this.showInsertForm();
    this.isBtnName[0].value = 1;
    this.isBtnName[0].display = "Cập nhật";
    //Lấy importing theo id được chọn
    this.importingReturnService.getImportingReturnById(this.importingReturnId).subscribe(res => {
      this.importingReturnFullInformation = res.result;
      this.importingReturnInformation = this.importingReturnFullInformation.importingReturn!;
      this.importingReturnTransactionInformation = this.importingReturnFullInformation.importingReturnTransactionModels!;
      this.statusValue = res.result.status;
      this.importingReturnInformation.dateCreated = this.datePick!;
    })
  }

  deleteImportingReturn() {
    this.importingReturnService.deleteImportingReturn(this.importingReturnId).subscribe((res) => {
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

  private getAllImportingReturn() {
    this.isShowLoading = true;
    this.importingReturnService.seachAllImportingReturn().subscribe(res => {
      this.getAllImportingReturnComplete(res)
      console.log(res);
    });
  }

  getAllImportingReturnComplete(res: ResponseModel<BaseSearchModel<ImportingReturnFullModel[]>>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(value => {
          var t: any;
          t.error.message(value);
        });
        return;
      }
    }
    this.importingReturnSearch.result = res.result.result;
    this.importingReturnSearch.recordOfPage = 25;
    for (let i = 0; i < this.importingReturnSearch.recordOfPage; i++) {
      if (this.importingReturnSearch.result[i] != undefined)
        this.importingReturns.push(this.importingReturnSearch.result[i]);
    }
    setTimeout(() => {
      this.isShowLoading = false;
    }, 1000)
  }

  getAllCustomers() {
    this.customerService.getAllCustomer().subscribe(res => {
      this.customer = res.result.result;
      this.customerName = this.customer;
    });
  }

  getAllProducts() {
    this.productService.getAllProduct().subscribe(res => {
      this.products = res.result.result;
      this.productsName = this.products;
    });
  }

  getStatusOfImportingReturn(status: string) {
    if (status === this.displayImportingReturn[0].value)
      return this.displayImportingReturn[0].display;
    else if (status === this.displayImportingReturn[1].value)
      return this.displayImportingReturn[1].display;
    else if (status === this.displayImportingReturn[2].value)
      return this.displayImportingReturn[2].display;
    else if (status === this.displayImportingReturn[3].value)
      return this.displayImportingReturn[3].display;
    else if (status === this.displayImportingReturn[4].value)
      return this.displayImportingReturn[4].display;
    return;
  }

  removeItemFromImportingReturnTransactions(index: number) {
    this.importingReturnTransactionInformation.splice(index, 1);
  }

  isFillStatus: string = this.displayImportingReturnFilter[0].display;

  getFilterStatus(value: string, display: string) {
    this.isFillStatus = display;
    const searchTermLC = value.toLowerCase().trim();
    if (searchTermLC === '') {
      this.importingReturnFill = this.importingReturns;
      return;
    }
    this.importingReturnFill = this.importingReturns.filter(importingReturn =>
      importingReturn.importingReturn?.status!.toLowerCase() === searchTermLC
    );
  }

  //Lọc sản phẩm theo tên và code
  filterImportingReturn(): void {
    const searchTermLC = this.searchTermTable.toLowerCase().trim();
    if (searchTermLC === '') {
      this.importingReturnFill = this.importingReturns;
      return;
    }
    this.importingReturnFill = this.importingReturns.filter(importingReturn =>
      importingReturn.importingReturn?.code!.toLowerCase().includes(searchTermLC)
      || importingReturn.importingReturn?.customer?.fullName!.toLowerCase().includes(searchTermLC)
      || importingReturn.importingReturn?.total?.toString()!.toLowerCase().includes(searchTermLC)
    );
  }

  exportDataToExcels() {
    let dataImporting: any[] = [];
    this.importingReturns.forEach(value => {
      value.importingReturn!.id = "#"
      dataImporting.push(value.importingReturn);
    })
    this.excelService.exportToExcel(dataImporting, 'exported_data');
  }
}
