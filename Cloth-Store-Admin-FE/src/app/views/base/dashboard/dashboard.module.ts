import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {DataTableComponent} from "../../../shared/components/data-table/data-table.component";
import {CurrencyPipe, NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ModalWrapperComponent} from "../../../shared/components/modal-wrapper/modal-wrapper.component";
import {AlertComponent} from "../../../shared/components/alert/alert.component";
import {BreadcrumbComponent, BreadcrumbItemComponent} from "@coreui/angular";
import {SpinnerComponent} from "../../../shared/components/spinner/spinner.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DatePickerComponent} from "../../../shared/components/date-picker/date-picker.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ControlMaterial} from "../../../ui-component/ControlMaterial";
import {DashboardComponent} from "./pages/dashboard.component";
import {WidgetSalesComponent} from "../../../shared/components/widget-sales/widget-sales.component";
import {WidgetTransactionComponent} from "../../../shared/components/widget-transaction/widget-transaction.component";
import {WidgetPolarComponent} from "../../../shared/components/widget-polar/widget-polar.component";

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,

  },
];

@NgModule({
  declarations: [
    DashboardComponent
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
        NgClass,
        MatDatepickerModule,
        DatePickerComponent,
        MatFormFieldModule,
        WidgetSalesComponent,
        WidgetTransactionComponent,
        WidgetPolarComponent
    ]
})

export class DashboardModule{
}
