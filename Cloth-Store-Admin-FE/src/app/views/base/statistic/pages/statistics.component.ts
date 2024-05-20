import {Component} from '@angular/core';

declare const moment: any;

export interface IParamStatistic {
  start: Date | string;
  end: Date | string;
  type?: string;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {

  showDataList: boolean = true;
  showGraph: boolean = true;
  public fromDate: string = "";
  public toDate: string = "";

  reportTypesNames = [
    {id: "1", name: 'Customer Data Report'},
    {id: "2", name: 'Invoice Data Report'},
  ];
  reportType: String = this.reportTypesNames[0].id;

  public query: any = {

    fromDate: new Date(),
    toDate: new Date()
  };

  private tzValue = '';

  constructor() {
  }

  getReport() {

  }

  exportReport() {

  }

  onGetSaleReport(type: string): void {
    // type: 'month', 'quarter', 'year',....
    // this.query.fromDate = moment(new Date(this.common.nowWithTzDate(this.tzValue))).startOf(type).toDate();
    // this.query.toDate = moment(this.common.nowWithTzDate(this.tzValue)).endOf(type).toDate();
    this.fromDate = this.query.fromDate;
    this.toDate = this.query.toDate;
  }

  onReportTypeChange() {

  }
}
