import {AfterViewInit, booleanAttribute, Component, Input, OnInit} from '@angular/core';
import {TypePaymentReceiptModel} from "../../../../../core/apis/dtos/TypePaymentReceipt.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ReceiptModel} from "../../../../../core/apis/dtos/Receipt.model";
import {ReceiptTransactionModel} from "../../../../../core/apis/dtos/Receipt-transaction.model";
import {ReceiptFullModel} from "../../../../../core/apis/dtos/Receipt-full.model";
import {ReceiptService} from "../../../../../core/Services/agency/ReceiptService";

@Component({
  selector: 'app-add-receipt',
  templateUrl: './app-add-receipt.component.html',
})
export class AppAddReceiptComponent  implements OnInit, AfterViewInit {
  //Table color is show
  showTableColor: boolean = false;
  @Input() optionTypeReceipt: TypePaymentReceiptModel[] = [];
  @Input() btnName: ({ display: string; value: number } | { display: string; value: number })[] =
    [{display: '', value: 0}, {display: '', value: 1}];

  receiptTransaction: ReceiptTransactionModel;

  itemTypeReceipt: TypePaymentReceiptModel;
  @Input() typePaymentReceiptName!: string;
  indexTypePaymentReceip!: number;

  isInsertChose: boolean = false;

  //Table size is show
  @Input({transform: booleanAttribute}) showTableSize = false;

  @Input() receipt: ReceiptModel;
  @Input() receiptTransactions: ReceiptTransactionModel [] = []
  receiptFull: ReceiptFullModel;

  displayReceipt: string[] = ["COMPLETE", "UNCOMPLETE"];
  @Input() receiptStatus: string = this.displayReceipt[0]; // Mặc định là đang hoạt dộng

  currentDate: Date;

  constructor(private receiptService: ReceiptService, private router: Router, private snackBar: MatSnackBar) {
    this.receiptFull = new ReceiptFullModel();
    this.receipt = new ReceiptModel();
    this.itemTypeReceipt = new TypePaymentReceiptModel();
    this.receiptTransaction = new ReceiptTransactionModel();
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

  addReceipt() {
    //2 option them sua dua vao value[0,1]
    if (this.btnName[0].value == 0) {
      this.receipt.status = this.receiptStatus;
      this.receiptFull.receipt = this.receipt;
      this.receiptFull.receiptTransaction = this.receiptTransactions;
      this.receiptService.addReceipt(this.receiptFull).subscribe(res => {
        this.openSnackBar("Thêm thành công phiếu thu", "Đóng");
        this.resetPage();
      })
    } else if (this.btnName[0].value == 1) {
      this.receipt.status = this.receiptStatus;
      this.receiptFull.receipt = this.receipt;
      this.receiptFull.receiptTransaction = this.receiptTransactions;
      this.receiptService.updateReceipt(this.receiptFull).subscribe(res => {
        this.openSnackBar("Cập nhật phiếu thu thành công", "Đóng");
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
    this.receiptStatus = status;
  }

  getStatusDemo(status: string) {
    this.receiptStatus = status;
  }

  checkAddProductEnter(): boolean {
    var isCheck: boolean = true;
    return isCheck;
  }

  getOptionType(optionType: string, index: number, type: TypePaymentReceiptModel) {
    this.typePaymentReceiptName = optionType;
    this.indexTypePaymentReceip = index;
    this.receipt.typePaymentReceipt = type;
  }

  addTypeToTable() {
    this.receiptTransaction.amount = this.receiptTransaction.quantity! * this.receiptTransaction.price!;
    this.receiptTransactions.push(this.receiptTransaction);
    if (this.receiptTransactions) {
      this.showTableSize = true;
    }
    this.receiptTransaction = new ReceiptTransactionModel();
  }

  removeItemReceiptTransaction(index: number) {
    this.receiptTransactions.splice(index, 1);
    if (this.receiptTransactions.length == 0) this.showTableSize = false;
  }
}
