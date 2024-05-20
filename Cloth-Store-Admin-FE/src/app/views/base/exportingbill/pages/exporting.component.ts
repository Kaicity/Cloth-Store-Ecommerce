import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {ResponseModel} from "../../../../core/apis/dtos/ResponseModel";
import {BaseSearchModel} from "../../../../core/apis/dtos/base-search-model";
import {ExportingbillService} from "../../../../core/Services/agency/ExportingbillService";
import {AppAddExportingComponent} from "../components/app-add-exporting/app-add-exporting.component";
import {BillStatus} from "../../../../core/constanst/BillStatus";
import {ExportingBillFullModel} from "../../../../core/apis/dtos/Exporting-bill-full.model";
import {ExportingBillModel} from "../../../../core/apis/dtos/Exporting-bill.model";
import {ExportingBillTransactionModel} from "../../../../core/apis/dtos/Exporting-bill-transaction.model";
import {ImportingStatus} from "../../../../core/constanst/ImportingStatus";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ProductService} from "../../../../core/Services/warehouse/ProductService";
import {ProductModel} from "../../../../core/apis/dtos/Product.model";
import {CustomerModel} from "../../../../core/apis/dtos/Customer.model";

interface ImportingStatusDisplay {
  value: ImportingStatus,
  display: string
}

interface SpecificationExporting {
  value: BillStatus;
  display: string;
}

interface ExportingStatusFilter {
  value: string,
  display: string
}

@Component({
  selector: 'app-exporting',
  templateUrl: './exporting.component.html',
  styleUrl: './exporting.component.scss'
})
export class exportingComponent implements OnInit, AfterViewInit {
  private ExportingId!: string;
  isShowLoading: boolean = false;
  @ViewChild("AddWrapper") addWrapper!: AppAddExportingComponent;
  customerNames: string[] = [];
  ListNameCustomer: string[] = [];
  exportingfulls: ExportingBillFullModel[] = [];
  exportingFullInformation: ExportingBillFullModel = new ExportingBillFullModel();
  exportingInfo: ExportingBillModel = new ExportingBillModel();
  exportingTransactionInfo: ExportingBillTransactionModel[] = [];
  exportSearch: BaseSearchModel<ExportingBillFullModel[]> = new BaseSearchModel<ExportingBillFullModel[]>();
  tableFormat: string = "table table-bordered table-striped";

  productsName: any[] = [];
  products: ProductModel[] = [];

  customerInfor: CustomerModel = new CustomerModel();

  statusValue!: string;
  isBtnName: ({ display: string; value: number } | { display: string; value: number })[] = [{
    display: '', value: 0
  }, {display: '', value: 1}];

  constructor(private productService: ProductService, private exportingService: ExportingbillService, private snackBar: MatSnackBar, private router: Router) {

  }

  showSeachForm() {
  }

  displayImportingFilter: ExportingStatusFilter[] = [{value: '', display: "Tất cả"},
    {value: BillStatus.BOOKING, display: 'Đặt trước'},
    {value: BillStatus.CHECKED, display: 'Đã Kiểm Tra'},
    {value: BillStatus.CANCELLED, display: 'Đã Hủy'},
    {value: BillStatus.COMPELETED, display: 'Đã Hoàn Thành'},
    {value: BillStatus.SHIPPING, display: 'Đang Vận Chuyển'}];

  displayImporting: ImportingStatusDisplay[] = [{value: ImportingStatus.COMPLETE, display: "Đã hoàn thành"},
    {value: ImportingStatus.UNCOMPLETE, display: "Chưa hoàn thành"}];
  searchTermTable: string = '';
  isFillStatus: string = this.displayImportingFilter[0].display;
  exportingFill: ExportingBillFullModel[] = this.exportingfulls;
  isCheckBtnOrderOrAdd = false;

  getFilterStatus(value: string, display: string) {
    this.isFillStatus = display;
    const searchTermLC = value.toLowerCase().trim();
    if (searchTermLC === '') {
      this.exportingFill = this.exportingfulls;
      return;
    }
    this.exportingFill = this.exportingfulls.filter(importing =>
      importing.exportingBill?.status!.toLowerCase() === searchTermLC
    );
  }

  filterImporting(): void {
    const searchTermLC = this.searchTermTable.toLowerCase().trim();
    if (searchTermLC === '') {
      this.exportingFill = this.exportingfulls;
      return;
    }
    this.exportingFill = this.exportingfulls.filter(exporting =>
      exporting.exportingBill?.code!.toLowerCase().includes(searchTermLC) || exporting.exportingBill?.customer?.fullName!.toLowerCase().includes(searchTermLC)
      || exporting.exportingBill?.total?.toString()!.toLowerCase().includes(searchTermLC)
    );
  }

  showInsertForm() {
    this.isBtnName[0].value = 0;
    this.isBtnName[0].display = "Lưu";
    this.isCheckBtnOrderOrAdd = true;
    this.addWrapper.isInsertChose = true;
    this.addWrapper.isInsertChose = true;
    this.exportingInfo = new ExportingBillModel();
    this.exportingTransactionInfo = [];
    this.statusValue = this.displayImportingFilter[0].value;
  }

  updateExporting() {
    this.isBtnName[0].value = 1;
    this.isBtnName[0].display = "Cập Nhật";
    this.isCheckBtnOrderOrAdd = false;
    this.addWrapper.isInsertChose = true;
    //Lấy importing theo id được chọn
    this.exportingService.getExportingById(this.ExportingId).subscribe(res => {
      this.exportingFullInformation = res.result;
      this.exportingInfo = this.exportingFullInformation.exportingBill!;
      this.exportingTransactionInfo = this.exportingFullInformation.exportingBillTransactions!;
      this.customerInfor = this.exportingInfo.customer != undefined ? this.exportingInfo.customer : new CustomerModel();
      this.statusValue = res.result.status;
    })
  }

  getAllProducts() {
    this.productService.getAllProduct().subscribe(res => {
      this.products = res.result.result;
      this.productsName = this.products;
    });
  }


  getExportingData(id: string, e: ExportingBillFullModel) {
    this.ExportingId = id;

  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  private getAllExporting() {
    this.isShowLoading = true;
    this.exportingService.getAllExportingBill().subscribe(res => {
      this.getAllExportingComplete(res)
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  deleteExporting() {
    console.log(this.ExportingId + "?? dúng k")
    this.exportingService.deteleExporting(this.ExportingId).subscribe((res) => {
        this.openSnackBar("Đã xóa thành công phiếu nhập hàng", "Close")
        this.resetPage();
      },
      error => {
        this.openSnackBar("Lỗi khi xóa phiếu nhập hàng", "Đóng")
      }
    )
  }

  getlistCustomer() {

    for (let e of this.exportingfulls) {
      if (e.exportingBill?.customer?.eid) {
        this.customerNames.push(e.exportingBill.customer.eid);
      }
    }
    return this.customerNames;
  }

  async getAllExportingComplete(res: ResponseModel<BaseSearchModel<ExportingBillFullModel[]>>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(value => {
          var t: any;
          t.error.message(value);
        });
        return;
      }
    }

    this.exportSearch = res.result;
    console.log(this.exportSearch + "cc");
    // thêm 25 sản phẩm đầu tiên để show
    this.exportSearch.recordOfPage = 25;
    for (let i = 0; i < this.exportSearch.recordOfPage; i++) {
      if (this.exportSearch.result[i] != undefined) {
        this.exportingfulls.push(this.exportSearch.result[i]);
      }
    }
    this.ListNameCustomer = this.getlistCustomer();
    console.log(this.ListNameCustomer + " ??duma gi ao z");
    setTimeout(() => {
      this.isShowLoading = false;
    }, 1500)
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.getAllExporting();
    this.getAllProducts();
  }

  createImportingReturn() {
    this.isBtnName[0].value = 2;
    this.isBtnName[0].display = "Trả hàng";
    this.addWrapper.isInsertChose = true;
    //Lấy importing theo id được chọn
    this.exportingService.getExportingById(this.ExportingId).subscribe(res => {
      this.exportingFullInformation = res.result;
      this.exportingInfo = this.exportingFullInformation.exportingBill!;
      this.exportingTransactionInfo = this.exportingFullInformation.exportingBillTransactions!;
      this.customerInfor = this.exportingInfo.customer != undefined ? this.exportingInfo.customer : new CustomerModel();
      this.statusValue = res.result.status;
    })
  }

  getStatusOfImporting(status: string) {
    switch (status) {
      case this.displayImportingFilter[0].value:
        return this.displayImportingFilter[0].display;
      case this.displayImportingFilter[1].value:
        return this.displayImportingFilter[1].display;
      case this.displayImportingFilter[2].value:
        return this.displayImportingFilter[2].display;
      case this.displayImportingFilter[3].value:
        return this.displayImportingFilter[3].display;
      case this.displayImportingFilter[4].value:
        return this.displayImportingFilter[4].display;
      case this.displayImportingFilter[5].value:
        return this.displayImportingFilter[5].display;
      // Thêm các trường hợp khác nếu có
      default:
        // Xử lý khi không khớp với bất kỳ trường hợp nào
        return "Unknown Status";
    }
  }

  exportDataToExcels() {

  }
}

