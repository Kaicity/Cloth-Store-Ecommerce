import {AfterViewInit, booleanAttribute, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PaymentService} from "../../../../../core/Services/agency/PaymentService";
import {PaymentFullModel} from "../../../../../core/apis/dtos/Payment-full.model";
import {PaymentModel} from "../../../../../core/apis/dtos/Payment.model";
import {PaymentTransactionModel} from "../../../../../core/apis/dtos/Payment-transaction.model";
import {TypePaymentReceiptModel} from "../../../../../core/apis/dtos/TypePaymentReceipt.model";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-payment',
  templateUrl: './app-add-payment.component.html',
})

export class AppAddPaymentComponent implements OnInit, AfterViewInit {

  //Table color is show
  showTableColor: boolean = false;
  @Input() optionTypePayment: TypePaymentReceiptModel[] = [];
  @Input() btnName: ({ display: string; value: number } | { display: string; value: number })[] =
    [{display: '', value: 0}, {display: '', value: 1}];

  paymentTransaction: PaymentTransactionModel;

  itemTypePayment: TypePaymentReceiptModel;
  @Input() typePaymentReceiptName!: string;
  indexTypePaymentReceip!: number;

  isInsertChose: boolean = false;
  //Table size is show
  @Input({transform: booleanAttribute}) showTableSize = false;

  @Input() payment: PaymentModel;
  @Input() paymentTransactions: PaymentTransactionModel [] = []
  paymentFull: PaymentFullModel;

  displayPayment: string[] = ["COMPLETE", "UNCOMPLETE"];
  @Input() paymentStatus: string = this.displayPayment[0]; // Mặc định là đang hoạt dộng

  currentDate: Date;

  constructor(private paymentService: PaymentService, private router: Router, private snackBar: MatSnackBar) {
    this.paymentFull = new PaymentFullModel();
    this.payment = new PaymentModel();
    this.itemTypePayment = new TypePaymentReceiptModel();
    this.paymentTransaction = new PaymentTransactionModel();
    this.currentDate = new Date();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center"
    });
  }

  ngAfterViewInit(): void {
  }

  onSubmit() {

  }

  ngOnInit(): void {
  }

  closeModal() {
    this.isInsertChose = false;
  }

  validateInput(event: any): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) event.preventDefault();
  }

  addPayment() {
    //2 option them sua dua vao value[0,1]
    if (this.btnName[0].value == 0) {
      this.payment.status = this.paymentStatus;
      this.paymentFull.payment = this.payment;
      this.paymentFull.paymentTransactions = this.paymentTransactions;
      this.paymentService.addPayment(this.paymentFull).subscribe(res => {
        this.openSnackBar("Thêm thành công phiếu chi", "Đóng");
        this.resetPage();
      })
    } else if (this.btnName[0].value == 1) {
      this.payment.status = this.paymentStatus;
      this.paymentFull.payment = this.payment;
      this.paymentFull.paymentTransactions = this.paymentTransactions;
      this.paymentService.updatePayment(this.paymentFull).subscribe(res => {
        this.openSnackBar("Cập nhật phiếu chi thành công", "Đóng");
        this.resetPage();
      })
    } else return;
  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  formatCurrency() {
  }

  getStatusOnline(status: string) {
    this.paymentStatus = status;
  }

  getStatusDemo(status: string) {
    this.paymentStatus = status;
  }

  checkAddProductEnter(): boolean {
    var isCheck: boolean = true;
    return isCheck;
  }

  getOptionType(optionType: string, index: number, type: TypePaymentReceiptModel) {
    this.typePaymentReceiptName = optionType;
    this.indexTypePaymentReceip = index;
    this.payment.typePaymentReceipt = type;
    console.log(this.payment.typePaymentReceipt);
  }

  addTypeToTable() {
    this.paymentTransaction.amount = this.paymentTransaction.quantity! * this.paymentTransaction.price!;
    this.paymentTransactions.push(this.paymentTransaction);
    if (this.paymentTransactions) {
      this.showTableSize = true;
    }
    this.paymentTransaction = new PaymentTransactionModel();
  }

  removeItemPaymentTransaction(index: number) {
    this.paymentTransactions.splice(index, 1);
    if (this.paymentTransactions.length == 0) this.showTableSize = false;
  }

  protected readonly DatePipe = DatePipe;
}
