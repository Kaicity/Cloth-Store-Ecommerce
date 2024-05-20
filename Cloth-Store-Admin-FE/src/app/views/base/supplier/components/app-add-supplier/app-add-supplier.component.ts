import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {SupplierStatus} from "../../../../../core/constanst/SupplierStatus";
import {SupplierModel} from "../../../../../core/apis/dtos/Supplier.model";
import {SupplierService} from "../../../../../core/Services/warehouse/SupplierService";
import {MatSnackBar} from "@angular/material/snack-bar";

interface SpecificationSupplier {
  value: SupplierStatus;
  display: string;
}

@Component({
  selector: 'app-add-supplier',
  templateUrl: './app-add-supplier.component.html',

})

export class AppAddSupplierComponent implements OnInit, AfterViewInit {
  @Input() supplierModel!: SupplierModel;
  @ViewChild("AddDatePicker") addWrapper!: AppAddSupplierComponent;

  specificationStatus: SpecificationSupplier[] = [
    {value: SupplierStatus.ISWORKING, display: 'Đang cung cấp'},
    {value: SupplierStatus.STOP, display: 'Ngừng cung cấp'},
  ];

  @Input() statusDisplay!: string;
  status!: string;
  @Input() btnName: ({ display: string; value: number })[] =
    [{display: '', value: 0}, {display: '', value: 1}];

  constructor(private supplierService: SupplierService, private router: Router, private snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center"
    });
  }

  optionSpecChose(display: string) {
    this.status = display;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  isInsertChose: boolean = false;

  closeModal() {
    this.isInsertChose = false;
  }

  onSubmit() {

  }

  validateInput($event: KeyboardEvent) {

  }

  getStatusValue(display: string): SupplierStatus {
    const status = this.specificationStatus.find(spec => spec.display === display);
    return status ? status.value : SupplierStatus.ISWORKING;
  }

  formatCurrency() {

  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  resetData() {
    this.supplierModel = new SupplierModel();
    this.status = '';
  }

  addOrUpdateFunc() {
    //Them
    if (this.btnName[0].value == 0) {
      this.supplierModel.status = this.getStatusValue(this.status);
      this.supplierService.createSupplier(this.supplierModel).subscribe(
        (res: any) => {
          this.openSnackBar("Nhà cung cấp đã được thêm", "close")
          this.resetPage();
        },
      )
    }
    //Update
    else if (this.btnName[0].value == 1) {
      this.supplierModel.status = this.getStatusValue(this.status);
      this.supplierService.updateSupplier(this.supplierModel).subscribe(
        (res: any) => {
          this.openSnackBar("Nhà cung cấp đã được cập nhật ", "close")
          this.resetPage();
        }
      )
    }
  }
}
