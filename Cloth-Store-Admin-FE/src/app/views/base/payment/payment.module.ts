import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {ControlMaterial} from "../../../ui-component/ControlMaterial";
import {DataTableComponent} from "../../../shared/components/data-table/data-table.component";
import {PaymentComponent} from "./pages/payment.component";
import {CurrencyPipe, DatePipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ModalWrapperComponent} from "../../../shared/components/modal-wrapper/modal-wrapper.component";
import {AlertComponent} from "../../../shared/components/alert/alert.component";
import {
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective
} from "@coreui/angular";
import {SpinnerComponent} from "../../../shared/components/spinner/spinner.component";
import {CdkOption} from "@angular/cdk/listbox";
import {AppAddPaymentComponent} from "./components/app-add-payment/app-add-payment.component";
import {AppSearchPaymentComponent} from "./components/app-search-payment/app-search-payment.component";
import {DatePickerComponent} from "../../../shared/components/date-picker/date-picker.component";

export const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
  },
];

@NgModule({
  declarations: [
    PaymentComponent,
    AppAddPaymentComponent,
    AppSearchPaymentComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    MatTableModule,
    ControlMaterial,
    DataTableComponent,
    NgForOf,
    ModalWrapperComponent,
    ReactiveFormsModule,
    AlertComponent,
    CurrencyPipe,
    NgIf,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    SlicePipe,
    SpinnerComponent,
    DropdownComponent,
    CdkOption,
    DropdownItemDirective,
    DropdownMenuDirective,
    DatePickerComponent,
    DatePipe,
  ]
})

export class PaymentModule {

}
