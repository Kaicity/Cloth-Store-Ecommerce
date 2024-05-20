import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {ControlMaterial} from "../../../ui-component/ControlMaterial";
import {DataTableComponent} from "../../../shared/components/data-table/data-table.component";
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
import {ReceiptComponent} from "./pages/receipt.component";
import {AppAddPaymentComponent} from "../payment/components/app-add-payment/app-add-payment.component";
import {AppSearchPaymentComponent} from "../payment/components/app-search-payment/app-search-payment.component";
import {AppAddReceiptComponent} from "./components/app-add-receipt/app-add-receipt.component";
import {AppSearchReceiptComponent} from "./components/app-search-receipt/app-search-receipt.component";

export const routes: Routes = [
  {
    path: '',
    component: ReceiptComponent,
  },
];

@NgModule({
  declarations: [
    ReceiptComponent,
    AppAddReceiptComponent,
    AppSearchReceiptComponent
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
        DatePipe,
    ]
})

export class ReceiptModule {

}
