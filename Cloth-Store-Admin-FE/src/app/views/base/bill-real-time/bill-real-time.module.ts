import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";

import {ControlMaterial} from "../../../ui-component/ControlMaterial";
import {BillRealTimeComponent} from "./pages/bill-real-time.component";
import {AppShowDetailBill} from "./components/app-show-detail-bill/app-show-detail-bill.component";
import {ModalWrapperComponent} from "../../../shared/components/modal-wrapper/modal-wrapper.component";
import {CurrencyPipe, NgForOf, SlicePipe} from "@angular/common";
import {WidgetStatEComponent} from "@coreui/angular";

export const routes: Routes = [{
  path: '', component: BillRealTimeComponent,

},];

@NgModule({
  declarations: [BillRealTimeComponent, AppShowDetailBill

  ],
  exports: [AppShowDetailBill],
  imports: [RouterModule.forChild(routes), FormsModule, MatTableModule, ControlMaterial, ModalWrapperComponent, NgForOf, CurrencyPipe, WidgetStatEComponent, SlicePipe]
})

export class BillRealTimeModule {

}
