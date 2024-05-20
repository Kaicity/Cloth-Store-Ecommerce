import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Sex} from "../../../../../core/constanst/Sex";
import {CustomerModel} from "../../../../../core/apis/dtos/Customer.model";
import {CustomerService} from "../../../../../core/Services/warehouse/CustomerService";

interface SpecificationCustomer {
  value: Sex;
  display: string;
}

@Component({
  selector: 'app-add-customer',
  templateUrl: './app-add-customer.component.html',
  styleUrls: ['./app-add-customer-component.scss']

})

export class AppAddCustomerComponent implements OnInit, AfterViewInit {
  @Input() customer!: CustomerModel;
  CustomerBirthDay = new Date();
  @ViewChild("AddDatePicker") addWrapper!: AppAddCustomerComponent;
  specificationCustomer: SpecificationCustomer[] = [
    {value: Sex.MALE, display: 'Nam'},
    {value: Sex.FEMALE, display: 'Nữ'},
    {value: Sex.ORTHER, display: 'Khác'}
  ];

  @Input() genderDisplay!: string;
  gender!: string;
  @Input() btnName: ({ display: string; value: number })[] =
    [{display: '', value: 0}, {display: '', value: 1}];

  constructor(private customerService: CustomerService, private router: Router) {
  }

  optionSpecChose(display: string) {
    this.gender = display;
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

  getGenderValue(display: string): Sex {
    const gender = this.specificationCustomer.find(spec => spec.display === display);
    return gender ? gender.value : Sex.MALE;
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
    this.customer = new CustomerModel();
    this.gender = '';
  }

  addOrUpdateFunc() {
    //Them
    if (this.btnName[0].value == 0) {
      this.customer.birthday = this.CustomerBirthDay;
      this.customer.gender = this.getGenderValue(this.gender);
      this.customerService.addCustomer(this.customer).subscribe(
        (res: any) => {
          console.log(res);
          alert("Khách Hàng đã được thêm");
          this.resetPage();
        },
      )
    }
    //Update
    else if (this.btnName[0].value == 1) {
      this.customer.gender = this.getGenderValue(this.gender);
      this.customerService.updateCustomer(this.customer).subscribe(
        (res: any) => {
          alert("Khách Hàng đã được Cập Nhật");
          this.resetPage();
        }
      )
    }
  }
}
