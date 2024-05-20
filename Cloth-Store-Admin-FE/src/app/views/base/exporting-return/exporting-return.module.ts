import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {ControlMaterial} from "../../../ui-component/ControlMaterial";
import {DataTableComponent} from "../../../shared/components/data-table/data-table.component";
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
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
import {DatePickerComponent} from "../../../shared/components/date-picker/date-picker.component";
import {ThousandSeparatorDirective} from "../../../core/bussiness-logic/thousandSeparatorDirective";
import {ExportingReturnComponent} from "./pages/exporting-return.component";
import {AppAddExportingReturnComponent} from "./components/app-add-exporting-return/app-add-exporting-return.component";
import {
  AppSearchExportingReturnComponent
} from "./components/app-search-exporting-return/app-search-exporting-return.component";
import {AutoCompleteComponent} from "../../../shared/components/auto-complete/auto-complete.component";

export const routes: Routes = [
  {
    path: '',
    component: ExportingReturnComponent,
  },
];

@NgModule({
  declarations: [
    ExportingReturnComponent,
    AppAddExportingReturnComponent,
    AppSearchExportingReturnComponent
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
    NgClass,
    ThousandSeparatorDirective,
    AutoCompleteComponent,
  ]
})

export class ExportingReturnModule {

}
