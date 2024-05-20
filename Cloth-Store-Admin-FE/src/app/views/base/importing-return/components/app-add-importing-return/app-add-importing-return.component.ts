import {AfterViewInit, booleanAttribute, Component, Input, OnInit} from "@angular/core";
import {ProductModel} from "../../../../../core/apis/dtos/Product.model";
import {FormControl} from "@angular/forms";
import {ImportingReturnService} from "../../../../../core/Services/agency/ImportingReturnService";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AgencyModel} from "../../../../../core/apis/dtos/Agency.model";
import {ImportingStatus} from "../../../../../core/constanst/ImportingStatus";
import {ImportingReturnStatus} from "../../../../../core/constanst/ImportingReturnStatus";
import {ImportingReturnBillModel} from "../../../../../core/apis/dtos/Importing-return-bill.model";
import {ImportingReturnFullModel} from "../../../../../core/apis/dtos/Importing-return-full.model";
import {ImportingReturnTransactionModel} from "../../../../../core/apis/dtos/Importing-return-transaction.model";
import {CustomerModel} from "../../../../../core/apis/dtos/Customer.model";
import {BillStatus} from "../../../../../core/constanst/BillStatus";

interface ImportingReturnStatusDisplay {
  value: ImportingReturnStatus,
  display: string
}

@Component({
  selector: 'app-add-importing-return',
  templateUrl: './app-add-importing-return.component.html',
  styleUrl: './app-add-importing-return.component.scss',
})

export class AppAddImportingReturnComponent implements OnInit, AfterViewInit {
  //Table color is show
  @Input() customers: CustomerModel[] = [];
  @Input() products: ProductModel[] = [];

  @Input() btnName: ({ display: string; value: number } | { display: string; value: number })[] =
    [{display: '', value: 0}, {display: '', value: 1}];

  importingReturnTransaction: ImportingReturnTransactionModel;

  customer: CustomerModel;
  @Input() customerNameDisplay!: string;
  indexCustomer!: number;
  status!: string;
  productNameDisplay: string = "";

  isInsertChose: boolean = false;
  //Table size is show
  @Input({transform: booleanAttribute}) showTableSize = false;

  @Input() importingReturn: ImportingReturnBillModel;
  @Input() importingReturnTransactions: ImportingReturnTransactionModel [] = [];
  importingReturnFull: ImportingReturnFullModel;

  displayImportingReturn: ({ value: BillStatus, display: string })[] = [
    {value: BillStatus.COMPELETED, display: "Đã hoàn thành"},
    {value: BillStatus.CHECKED, display: "Đã kiểm tra"},
    {value: BillStatus.BOOKING, display: "Đang đặt hàng"},
    {value: BillStatus.CANCELLED, display: "Đã hủy"},
    {value: BillStatus.SHIPPING, display: "Đang giao hàng"},
  ];

  displayImportingTitle!: string;


  @Input() importingReturnStatus: string = '';

  myControl = new FormControl();
  showDropdown = false;
  agencyCode: string = "AH-2041";
  agencyName: string = "TMA";

  searchTerm: string = '';
  @Input() productFill: ProductModel[] = [];

  no: number = 0;

  constructor(private importingReturnService: ImportingReturnService, private router: Router, private snackBar: MatSnackBar) {
    this.importingReturnFull = new ImportingReturnFullModel();
    this.importingReturn = new ImportingReturnBillModel();
    this.importingReturn.agency = new AgencyModel();
    this.importingReturn.customer = new CustomerModel();
    this.customer = new CustomerModel();
    this.importingReturnTransaction = new ImportingReturnTransactionModel();
  }

  //Lọc sản phẩm theo tên và code
  filterProducts(): void {
    const searchTermLC = this.searchTerm.toLowerCase().trim();
    if (searchTermLC === '') {
      this.productFill = this.products;
      this.showDropdown = false;
      //Reset giá tiền và số lượng
      this.importingReturnTransaction.amount = null;
      this.importingReturnTransaction.quantity = null;
      return;
    }
    this.showDropdown = true;
    this.productFill = this.products.filter(product =>
      product.name!.toLowerCase().includes(searchTermLC) || product.code!.toLowerCase().includes(searchTermLC)
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center"
    });
  }

  validateInput(event: any): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) event.preventDefault();
  }

  addImportingReturn() {
    //2 option them sua dua vao value[0,1]
    if (this.btnName[0].value == 0) {
      this.importingReturn.status = this.status;
      //Set total amount format
      let totalFormat = this.importingReturn.total?.toString();
      this.importingReturn.total = null;
      this.importingReturn.total = parseInt(totalFormat!.replaceAll(',', ''));
      this.importingReturnFull.importingReturn = this.importingReturn;
      this.importingReturnFull.importingReturnTransactionModels = this.importingReturnTransactions;
      this.importingReturnService.createReturnBill(this.importingReturnFull).subscribe(res => {
          this.openSnackBar("Thêm thành công phiếu nhâp hàng", "Đóng");
          this.resetPage();
        },
        error => {
          this.openSnackBar("Lỗi thêm phiếu nhâp hàng", "Đóng");
        })
    } else if (this.btnName[0].value == 1) {
      this.importingReturn.status = this.status;
      //Set total amount format
      let totalFormat = this.importingReturn.total?.toString();
      this.importingReturn.total = null;
      this.importingReturn.total = parseInt(totalFormat!.replaceAll(',', ''));
      this.importingReturnFull.importingReturn = this.importingReturn;
      this.importingReturnFull.importingReturnTransactionModels = this.importingReturnTransactions;
      this.importingReturnService.updateImportingReturn(this.importingReturnFull).subscribe(res => {
          this.openSnackBar("Cập nhật phiếu nhập hàng thành công", "Đóng");
          this.resetPage();
        },
        error => {
          this.openSnackBar("Lỗi cập nhật phiếu nhâp hàng", "Đóng");
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

  optionSpecChose(value: string, index: number) {
    this.status = value;
    this.displayImportingTitle = this.displayImportingReturn[index].display;
  }

  getStatusOnline(display: BillStatus) {
    this.importingReturnStatus = display;
  }

  getStatusDemo(display: BillStatus) {
    this.importingReturnStatus = display;
  }

  getOptionType(customerName: string, index: number, customer: CustomerModel) {
    this.customerNameDisplay = customerName;
    this.indexCustomer = index;
    this.importingReturn.customer = customer;
  }

  addProductToTable() {
    let priceFormat = this.importingReturnTransaction.amount?.toString();
    this.importingReturnTransaction.amount = null;
    this.importingReturnTransaction.amount = parseInt(priceFormat!.replaceAll(',', ''));
    if (this.importingReturnTransactions) {
      this.showTableSize = true;
    }
    this.importingReturnTransaction.amount = this.importingReturnTransaction.quantity! * this.importingReturnTransaction.amount!;
    this.importingReturnTransactions.push(this.importingReturnTransaction);

    this.importingReturnTransaction = new ImportingReturnTransactionModel();
    this.searchTerm = "";
    this.productNameDisplay = "";
  }

  removeItemImportingReturnTransaction(index: number) {
    this.importingReturnTransactions.splice(index, 1);
    if (this.importingReturnTransactions.length == 0) this.showTableSize = false;
  }

  toggleDropdown() {
    this.showDropdown = true;
  }

  selectOption(product: ProductModel) {
    //this.myForm.patchValue(product.name);
    this.showDropdown = false;
    this.productNameDisplay = product.name!;

    if (this.importingReturnTransactions.filter(productItem => {
      productItem.id === product.id
    })) {
      for (let i = 0; i < this.importingReturnTransactions.length; i++) {
        if (this.importingReturnTransactions[i].product?.id === product.id) {
          this.importingReturnTransactions[i].quantity!++;
          let calcuAmount = this.importingReturnTransactions[i].quantity! * this.importingReturnTransactions[i].amount!
          this.importingReturnTransactions[i].amount! = calcuAmount;
          this.productNameDisplay = ""; // Tồn tại rồi thì reset khi click chọn
          this.searchTerm = "";
          this.openSnackBar("Sản phẩm này đã được thêm tiếp tục", "Đóng")
          return;
        }
      }
      this.importingReturnTransaction.product = product;
    }
  }

  ngAfterViewInit()
    :
    void {
  }

  ngOnInit()
    :
    void {
  }

  onSubmit() {
  }

  closeModal() {
    this.isInsertChose = false;
  }

  decrementQuantity(index: number) {
    if (this.importingReturnTransactions[index].quantity! > 1) {
      this.importingReturnTransactions[index].quantity!--;
      this.importingReturnTransactions[index].amount = this.importingReturnTransactions[index].quantity! * this.importingReturnTransactions[index].amount!
    }
  }

  incrementQuantity(index: number) {
    this.importingReturnTransactions[index].quantity!++;
    this.importingReturnTransactions[index].amount = this.importingReturnTransactions[index].quantity! * this.importingReturnTransactions[index].amount!
  }

  protected readonly ImportingReturnStatus = ImportingStatus;

  closeAddProduct() {
    this.showDropdown = false;
  }

}
