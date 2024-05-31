import {Component, OnInit} from '@angular/core';
import {ExportingBillFullModel} from "../../bm-api/dtos/exporting-bill-full.model";
import {BaseSearchModel} from "../../bm-api/dtos/base-search.model";
import {ResponseModel} from "../../bm-api/dtos/response.model";
import {ExportingbillService} from "../../bm-api/Services/agency/ExportingbillService";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  exportingBillSearch: BaseSearchModel<ExportingBillFullModel[]> = new BaseSearchModel<ExportingBillFullModel[]>();

  constructor(private exportingBillService: ExportingbillService) {
  }

  ngOnInit(): void {
    this.getAllOrderHistory();
    console.log(this.exportingBillSearch);
  }

  getAllOrderHistory(): void {
    var getDataCustomer = localStorage.getItem('customer');
    var convertToObject = JSON.parse(getDataCustomer!);

    this.exportingBillService.getBillOrder(convertToObject.id!).subscribe(data => {
      this.getAllOrderHistoryToComplete(data);
    })
  }

  getAllOrderHistoryToComplete(res: ResponseModel<BaseSearchModel<ExportingBillFullModel[]>>): void {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(value => {
          var t: any;
          t.error.message(value)
        });
      }
      return;
    }

    //return data
    this.exportingBillSearch = res.result
  }
}
