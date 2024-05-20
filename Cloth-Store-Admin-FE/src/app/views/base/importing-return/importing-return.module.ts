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
import {
  AppSearchImportingReturnComponent
} from "./components/app-search-importing-return/app-search-importing-return.component";
import {ImportingReturnComponent} from "./pages/importing-return/importing-return.component";
import {AppAddImportingReturnComponent} from "./components/app-add-importing-return/app-add-importing-return.component";

export const routes: Routes = [
  {
    path: '',
    component: ImportingReturnComponent,
  },
];

@NgModule({
  declarations: [
    ImportingReturnComponent,
    AppAddImportingReturnComponent,
    AppSearchImportingReturnComponent
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
  ]
})

export class ImportingReturnModule {

}
