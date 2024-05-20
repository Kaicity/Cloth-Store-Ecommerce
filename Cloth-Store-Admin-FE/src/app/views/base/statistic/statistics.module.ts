import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {ControlMaterial} from "../../../ui-component/ControlMaterial";
import {DataTableComponent} from "../../../shared/components/data-table/data-table.component";
import {StatisticsComponent} from "./pages/statistics.component";

export const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,

  },
];

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    MatTableModule,
    ControlMaterial,
    DataTableComponent,
  ]
})

export class StatisticsModule {

}
