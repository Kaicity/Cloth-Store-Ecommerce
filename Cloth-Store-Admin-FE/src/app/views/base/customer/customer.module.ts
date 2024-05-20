import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {DataTableComponent} from "../../../shared/components/data-table/data-table.component";
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ModalWrapperComponent} from "../../../shared/components/modal-wrapper/modal-wrapper.component";
import {AlertComponent} from "../../../shared/components/alert/alert.component";
import {BreadcrumbComponent, BreadcrumbItemComponent} from "@coreui/angular";
import {SpinnerComponent} from "../../../shared/components/spinner/spinner.component";
import {CustomerComponent} from "./pages/customer.component";
import {AppAddCustomerComponent} from "./components/app-add-customer/app-add-customer.component";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DatePickerComponent} from "../../../shared/components/date-picker/date-picker.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ControlMaterial} from "../../../ui-component/ControlMaterial";

export const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,

  },
];

@NgModule({
  declarations: [
    CustomerComponent,
    AppAddCustomerComponent

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
        BsDatepickerModule,
        NgClass,
        MatDatepickerModule,
        DatePickerComponent,
        MatFormFieldModule,
        DatePipe

    ]
})

export class CustomerModule {

}
