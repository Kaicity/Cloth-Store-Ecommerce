import {AfterViewInit, booleanAttribute, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImportingService} from "../../../../../core/Services/agency/ImportingService";
import {SupplierModel} from "../../../../../core/apis/dtos/Supplier.model";
import {AgencyModel} from "../../../../../core/apis/dtos/Agency.model";
import {FormControl} from "@angular/forms";
import {ProductModel} from "../../../../../core/apis/dtos/Product.model";
import {ImportingStatus} from "../../../../../core/constanst/ImportingStatus";
import {ExportingReturnStatus} from "../../../../../core/constanst/ExportingReturnStatus";
import {ExportingReturnFullModel} from "../../../../../core/apis/dtos/Exporting-return-full-model";
import {ExportingReturnModel} from "../../../../../core/apis/dtos/Exporting-return-model";
import {ExportingReturnTransactionBillModel} from "../../../../../core/apis/dtos/Exporting-return-transaction-model";
import {ExportingReturnService} from "../../../../../core/Services/agency/ExportingReturnService";
import {ImportingModel} from "../../../../../core/apis/dtos/Importing.model";

interface ExportingReturnStatusDisplay {
  value: ExportingReturnStatus,
  display: string
}

@Component({
  selector: 'app-add-exporting-return',
  templateUrl: './app-add-exporting-return.component.html',
  styleUrl: './app-add-exporting-return.component.scss',
})

export class AppAddExportingReturnComponent implements OnInit, AfterViewInit {
  //Table color is show
  @Input() suppliers: SupplierModel[] = [];
  @Input() products: ProductModel[] = [];

  @Input() btnName: ({ display: string; value: number } | { display: string; value: number })[] =
    [{display: '', value: 0}, {display: '', value: 1}];

  exportingReturnTransaction: ExportingReturnTransactionBillModel;

  supplier: SupplierModel;
  @Input() supplierNameDisplay!: string;
  indexSupplier!: number;
  importing = new ImportingModel();
  productNameDisplay: string = "";
  selected: string = '';
  isInsertChose: boolean = false;
  //Table size is show
  @Input({transform: booleanAttribute}) showTableSize = false;
  @Input() customerNames: string[] = [];
  @Input() exportingReturn: ExportingReturnModel;
  @Input() ExportingReturnTransactions: ExportingReturnTransactionBillModel [] = [];
  exportingReturnFull: ExportingReturnFullModel;

  displayExportingReturn: ExportingReturnStatusDisplay[] = [{
    value: ExportingReturnStatus.COMPLETE,
    display: "Đã hoàn thành"
  },
    {value: ExportingReturnStatus.UNCOMPLETE, display: "Chưa hoàn thành"}];


  @Input() exportingReturnStatus: string = '';

  myControl = new FormControl();
  showDropdown = false;
  agencyCode: string = "AH-2041";
  agencyName: string = "TMA";

  searchTerm: string = '';
  @Input() productFill: ProductModel[] = [];

  no: number = 0;

  constructor(private exportingReturnService: ExportingReturnService, private router: Router, private snackBar: MatSnackBar, private importingService: ImportingService) {
    this.exportingReturnFull = new ExportingReturnFullModel();
    this.exportingReturn = new ExportingReturnModel();
    this.exportingReturn.agency = new AgencyModel();
    this.exportingReturn.supplier = new SupplierModel();
    this.supplier = new SupplierModel();
    this.exportingReturnTransaction = new ExportingReturnTransactionBillModel();
  }

  //Lọc sản phẩm theo tên và code
  filterProducts(): void {
    const searchTermLC = this.searchTerm.toLowerCase().trim();
    if (searchTermLC === '') {
      this.productFill = this.products;
      this.showDropdown = false;
      //Reset giá tiền và số lượng
      this.exportingReturnTransaction.price = null;
      this.exportingReturnTransaction.quantity = null;
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

  addExportingReturn() {
    //2 option them sua dua vao value[0,1]
    if (this.btnName[0].value == 0) {
      this.exportingReturn.status = this.exportingReturnStatus;
      //Set total amount format
      let totalFormat = this.exportingReturn.total?.toString();
      this.exportingReturn.total = null;
      this.exportingReturn.total = parseInt(totalFormat!.replaceAll(',', ''));
      this.exportingReturnFull.exportingReturnBill = this.exportingReturn;
      this.exportingReturnFull.exportingReturnTransactionList = this.ExportingReturnTransactions;
      this.exportingReturnService.addExportingReturn(this.exportingReturnFull).subscribe(res => {
          this.openSnackBar("Thêm thành công phiếu nhâp hàng", "Đóng");
          this.resetPage();
        },
        error => {
          this.openSnackBar("Lỗi thêm phiếu nhâp hàng", "Đóng");
        })
    } else if (this.btnName[0].value == 1) {
      this.exportingReturn.status = this.exportingReturnStatus;
      //Set total amount format
      let totalFormat = this.exportingReturn.total?.toString();
      this.exportingReturn.total = null;
      this.exportingReturn.total = parseInt(totalFormat!.replaceAll(',', ''));
      this.exportingReturnFull.exportingReturnBill = this.exportingReturn;
      this.exportingReturnFull.exportingReturnTransactionList = this.ExportingReturnTransactions;
      this.exportingReturnService.updateExportingReturn(this.exportingReturnFull).subscribe(res => {
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

  getStatusOnline(display: string) {
    this.exportingReturnStatus = display;
  }

  getStatusDemo(display: string) {
    this.exportingReturnStatus = display;
  }

  getOptionType(supplierName: string, index: number, supplier: SupplierModel) {
    this.supplierNameDisplay = supplierName;
    this.indexSupplier = index;
    this.exportingReturn.supplier = supplier;
  }

  addProductToTable() {
    let priceFormat = this.exportingReturnTransaction.price?.toString();
    this.exportingReturnTransaction.price = null;
    this.exportingReturnTransaction.price = parseInt(priceFormat!.replaceAll(',', ''));
    if (this.ExportingReturnTransactions) {
      this.showTableSize = true;
    }
    this.exportingReturnTransaction.amount = this.exportingReturnTransaction.quantity! * this.exportingReturnTransaction.price!;
    this.ExportingReturnTransactions.push(this.exportingReturnTransaction);

    this.exportingReturnTransaction = new ExportingReturnTransactionBillModel();
    this.searchTerm = "";
    this.productNameDisplay = "";
  }

  removeItemExportingReturnTransaction(index: number) {
    this.ExportingReturnTransactions.splice(index, 1);
    if (this.ExportingReturnTransactions.length == 0) this.showTableSize = false;
  }

  toggleDropdown() {
    this.showDropdown = true;
  }

  selectOption(product: ProductModel) {
    //this.myForm.patchValue(product.name);
    this.showDropdown = false;
    this.productNameDisplay = product.name!;

    if (this.ExportingReturnTransactions.filter(productItem => {
      productItem.id === product.id
    })) {
      for (let i = 0; i < this.ExportingReturnTransactions.length; i++) {
        if (this.ExportingReturnTransactions[i].product?.id === product.id) {
          this.ExportingReturnTransactions[i].quantity!++;
          let calcuAmount = this.ExportingReturnTransactions[i].quantity! * this.ExportingReturnTransactions[i].price!
          this.ExportingReturnTransactions[i].amount! = calcuAmount;
          this.productNameDisplay = ""; // Tồn tại rồi thì reset khi click chọn
          this.searchTerm = "";
          this.openSnackBar("Sản phẩm này đã được thêm tiếp tục", "Đóng")
          return;
        }
      }
      this.exportingReturnTransaction.product = product;
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
    if (this.ExportingReturnTransactions[index].quantity! > 1) {
      this.ExportingReturnTransactions[index].quantity!--;
      this.ExportingReturnTransactions[index].amount = this.ExportingReturnTransactions[index].quantity! * this.ExportingReturnTransactions[index].price!
    }
  }

  incrementQuantity(index: number) {
    this.ExportingReturnTransactions[index].quantity!++;
    this.ExportingReturnTransactions[index].amount = this.ExportingReturnTransactions[index].quantity! * this.ExportingReturnTransactions[index].price!
  }

  protected readonly ExportingReturnStatus = ImportingStatus;

  closeAddProduct() {
    this.showDropdown = false;
  }

  receiveSelectedOption($event: string) {
    this.getImportingData(this.selected);
  }

  getImportingData(id: string) {
    this.selected = id;
    this.importingService.getImportingById(id).subscribe((res: any) => {
      this.importing = res.result;
      console.log("Customer : ", this.importing);
    });
  }
}
