import {Component, Input, OnInit} from '@angular/core';

import {ControlMaterial} from "../../../ui-component/ControlMaterial";
import {BaseSearchModel} from "../../../core/apis/dtos/Base-search.model";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  imports: [ControlMaterial],
  standalone: true
})
export class DataTableComponent implements OnInit {

  @Input() columnNumber!: number;
  @Input() tableFormatClass!: string;
  @Input() search!: BaseSearchModel<any>;
  @Input() data2Show: any;
  itemInPageList: number[] = [10, 25, 50, 100];

  public updateDataOfPageWhenChoseNext(event: any) {

    this.search.recordOfPage = +event.pageSize;
    this.search.currentPage = +event.pageIndex + 1;
    if (this.search.currentPage > 0) {
      this.data2Show.splice(0, this.data2Show.length);// xoa1 het
      var end: number = this.search.currentPage * this.search.recordOfPage;
      var start: number = end - this.search.recordOfPage;
      for (let i = start; i < end; i++) {
        // Your code here
        if (i < this.search.result.length) this.data2Show.push(this.search.result[i]);
      }
    }

  }

  ngOnInit(): void {
    this.search.currentPage = 0;
  }
}
