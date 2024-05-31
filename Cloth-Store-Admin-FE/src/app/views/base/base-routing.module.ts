import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base',
    },
    children: [
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule],
})
export class BaseRoutingModule {
}

