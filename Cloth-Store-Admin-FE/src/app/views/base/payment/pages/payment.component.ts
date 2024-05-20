import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseSearchModel} from "../../../../core/apis/dtos/Base-search.model";
import {PaymentService} from "../../../../core/Services/agency/PaymentService";
import {ResponseModel} from "../../../../core/apis/dtos/Response.model";
import {PaymentFullModel} from "../../../../core/apis/dtos/Payment-full.model";
import {PaymentSearchModel} from "../../../../core/apis/dtos/Payment-search.model";
import {AppSearchPaymentComponent} from "../components/app-search-payment/app-search-payment.component";
import {AppAddPaymentComponent} from "../components/app-add-payment/app-add-payment.component";
import {Router} from "@angular/router";
import {TypePaymentService} from "../../../../core/Services/agency/TypePaymentService";
import {TypePaymentReceiptModel} from "../../../../core/apis/dtos/TypePaymentReceipt.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PaymentModel} from "../../../../core/apis/dtos/Payment.model";
import {PaymentTransactionModel} from "../../../../core/apis/dtos/Payment-transaction.model";
import {ExcelService} from "../../../../core/bussiness-logic/excelService";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  isShowLoading: boolean = false;
  //Format table
  tableFormat: string = "table table-bordered table-striped";
  @ViewChild("searchWrapper") searchWrapper!: AppSearchPaymentComponent;
  @ViewChild("AddWrapper") addWrapper!: AppAddPaymentComponent;

  //DTO Payment
  paymentSeach: PaymentSearchModel = new PaymentSearchModel();
  payments: PaymentFullModel[] = [];
  //Gan tra tri payment o day

  optionPayments: TypePaymentReceiptModel[] = [];

  typeName: any[] = []; //Lưu danh sách type có tên

  isBtnName: ({ display: string; value: number } | { display: string; value: number })[] = [{
    display: '', value: 0
  }, {display: '', value: 1}];
  private paymentId!: string;

  paymentFullInformation: PaymentFullModel = new PaymentFullModel();
  paymentInformation: PaymentModel = new PaymentModel();
  paymentTransactionInformation: PaymentTransactionModel[] = [];
  payStatus: string = "";

  constructor(private paymentService: PaymentService, private router: Router, private typePaymentService: TypePaymentService,
              private snackBar: MatSnackBar,private excelService: ExcelService) {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllOptionTypes();
  }

  showSeachForm() {
    this.searchWrapper.isSeachChose = true;
  }

  showInsertForm() {
    this.isBtnName[0].value = 0;
    this.isBtnName[0].display = "Thêm";
    this.addWrapper.isInsertChose = true;
    this.paymentInformation = new PaymentModel();
    this.paymentTransactionInformation = [];
    this.payStatus = "COMPLETE";
  }

  getPaymentData(id: string, payment: PaymentFullModel) {
    this.paymentId = id;
    //APIs get product by id
  }

  updatePayment() {
    this.showInsertForm();
    this.isBtnName[0].value = 1;
    this.isBtnName[0].display = "Cập nhật";
    //Lấy Payment theo id được chọn
    this.paymentService.getPaymentById(this.paymentId).subscribe(res => {
      this.paymentFullInformation = res.result;
      this.paymentInformation = this.paymentFullInformation.payment!;
      this.paymentTransactionInformation = this.paymentFullInformation.paymentTransactions!;
      this.payStatus = this.paymentInformation.status!;
    })
  }

  deletePayment() {
    this.paymentService.deletePayment(this.paymentId).subscribe((res) => {
       this.openSnackBar("Đã xóa thành công phiếu chi", "Close")
        this.resetPage();
      },
      error => {
        this.openSnackBar("Lỗi khi xóa phiếu chi", "Đóng")
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

  private getAllProduct() {
    this.isShowLoading = true;
    this.paymentService.getAllPayment().subscribe(res => {
      this.getAllProductComplete(res)
      console.log(res)
    });
  }

  getAllProductComplete(res: ResponseModel<BaseSearchModel<PaymentFullModel[]>>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(value => {
          var t: any;
          t.error.message(value);
        });
        return;
      }
    }
    this.paymentSeach.result = res.result.result;
    this.paymentSeach.recordOfPage = 25;
    for (let i = 0; i < this.paymentSeach.recordOfPage; i++) {
      if (this.paymentSeach.result[i] != undefined)
        this.payments.push(this.paymentSeach.result[i]);
    }
    setTimeout(() => {
      this.isShowLoading = false;
    }, 1000)
  }

  getAllOptionTypes() {
    this.typePaymentService.getAllOptionPayments().subscribe(res => {
      this.optionPayments = res.result;
      this.typeName = this.optionPayments;
    });
  }

  exportDataToExcels() {
    let dataImporting: any[] = [];
    this.payments.forEach(value => {
      value.payment!.id = "#"
      dataImporting.push(value.payment);
    })
    this.excelService.exportToExcel(dataImporting, 'exported_data');
  }
}
