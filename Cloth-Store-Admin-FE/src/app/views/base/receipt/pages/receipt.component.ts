import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseSearchModel} from "../../../../core/apis/dtos/Base-search.model";
import {ResponseModel} from "../../../../core/apis/dtos/Response.model";
import {ReceiptService} from "../../../../core/Services/agency/ReceiptService";
import {ReceiptFullModel} from "../../../../core/apis/dtos/Receipt-full.model";
import {ReceiptSearchModel} from "../../../../core/apis/dtos/Receipt-search.model";
import {Router} from "@angular/router";
import {TypePaymentService} from "../../../../core/Services/agency/TypePaymentService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TypePaymentReceiptModel} from "../../../../core/apis/dtos/TypePaymentReceipt.model";
import {ReceiptModel} from "../../../../core/apis/dtos/Receipt.model";
import {ReceiptTransactionModel} from "../../../../core/apis/dtos/Receipt-transaction.model";
import {AppSearchReceiptComponent} from "../components/app-search-receipt/app-search-receipt.component";
import {AppAddReceiptComponent} from "../components/app-add-receipt/app-add-receipt.component";
import {ExcelService} from "../../../../core/bussiness-logic/excelService";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss'
})
export class ReceiptComponent implements OnInit {
  isShowLoading: boolean = false;
  //Format table
  tableFormat: string = "table table-bordered table-striped";
  @ViewChild("searchWrapper") searchWrapper!: AppSearchReceiptComponent;
  @ViewChild("AddWrapper") addWrapper!: AppAddReceiptComponent;


  //DTO Product
  receipts: ReceiptFullModel[] = []; // Tao danh sach chua cac phieu chi
  receiptSearch: ReceiptSearchModel = new ReceiptSearchModel();

  optionReceipt: TypePaymentReceiptModel[] = [];

  typeName: any[] = []; //Lưu danh sách type có tên

  isBtnName: ({ display: string; value: number } | { display: string; value: number })[] = [{
    display: '', value: 0
  }, {display: '', value: 1}];

  private receiptId!: string;

  receiptFullInformation: ReceiptFullModel = new ReceiptFullModel();
  receiptInformation: ReceiptModel = new ReceiptModel();
  receiptTransactionInformation: ReceiptTransactionModel[] = [];
  reiStatus: string = "";

  constructor(private receiptService: ReceiptService, private router: Router, private typeReceiptService: TypePaymentService,
              private snackBar: MatSnackBar,private excelService: ExcelService) {
  }

  ngOnInit(): void {
    this.getAllReceipt();
    this.getAllOptionTypes();
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
    this.isBtnName[0].display = "Thêm";
    this.addWrapper.isInsertChose = true;
    this.receiptInformation = new ReceiptModel();
    this.receiptTransactionInformation = [];
    this.reiStatus = "COMPLETE";
  }

  getReceiptData(id: string, receipt: ReceiptFullModel) {
    this.receiptId = id;
    //APIs get product by id
  }

  updateReceipt() {
    this.showInsertForm();
    this.isBtnName[0].value = 1;
    this.isBtnName[0].display = "Cập nhật";
    //Lấy Payment theo id được chọn
    this.receiptService.getReceiptById(this.receiptId).subscribe(res => {
      this.receiptFullInformation = res.result;
      this.receiptInformation = this.receiptFullInformation.receipt!;
      this.receiptTransactionInformation = this.receiptFullInformation.receiptTransaction!;
      this.reiStatus = this.receiptInformation.status!;
    })
  }

  deleteReceipt() {
    this.receiptService.deleteReceipt(this.receiptId).subscribe((res) => {
        this.openSnackBar("Đã xóa thành công phiếu Thu", "Close")
        this.resetPage();
      },
      error => {
        this.openSnackBar("Lỗi khi xóa phiếu thu", "Đóng")
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

  private getAllReceipt() {
    this.isShowLoading = true;
    this.receiptService.getAllReceipt().subscribe(res => {
      this.getAllReceiptComplete(res)
      console.log(res.result);
    });
  }

  getAllReceiptComplete(res: ResponseModel<BaseSearchModel<ReceiptFullModel[]>>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(value => {
          var t: any;
          t.error.message(value);
        });
        return;
      }
    }

    this.receiptSearch.result = res.result.result;
    this.receiptSearch.recordOfPage = 25;
    for (let i = 0; i < this.receiptSearch.recordOfPage; i++) {
      if (this.receiptSearch.result[i] != undefined)
        this.receipts.push(this.receiptSearch.result[i]);
    }
    setTimeout(() => {
      this.isShowLoading = false;
    }, 1000)
  }

  getAllOptionTypes() {
    this.typeReceiptService.getAllOptionReceipt().subscribe(res => {
      this.optionReceipt = res.result;
      this.typeName = this.optionReceipt;
    });
  }
  exportDataToExcels() {
    let dataImporting: any[] = [];
    this.receipts.forEach(value => {
      value.receipt!.id = "#"
      dataImporting.push(value.receipt);
    })
    this.excelService.exportToExcel(dataImporting, 'exported_data');
  }
}
