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
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DatePickerComponent} from "../../../shared/components/date-picker/date-picker.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ControlMaterial} from "../../../ui-component/ControlMaterial";
import {exportingComponent} from "./pages/exporting.component";
import {AppAddExportingComponent} from "./components/app-add-exporting/app-add-exporting.component";
import {AutoCompleteComponent} from "../../../shared/components/auto-complete/auto-complete.component";
import {ThousandSeparatorDirective} from "../../../core/bussiness-logic/thousandSeparatorDirective";

export const routes: Routes = [
    {
        path: '',
        component: exportingComponent,

    },
];

@NgModule({
    declarations: [
        exportingComponent,
        AppAddExportingComponent

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
        AutoCompleteComponent,
        ThousandSeparatorDirective,
        DatePipe
    ]
})

export class ExportingModule {

}
