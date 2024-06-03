import {Component, OnInit} from '@angular/core';
import {ExportingBillFullModel} from "../../bm-api/dtos/exporting-bill-full.model";
import {ResponseModel} from "../../bm-api/dtos/response.model";
import {ExportingbillService} from "../../bm-api/Services/agency/ExportingbillService";
import {CustomerModel} from "../../bm-api/dtos/customer.model";

interface ExportingBillStatus {
  display: string,
  value: string,
}

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  exportingBillOrders: ExportingBillFullModel[] = [];
  customerObject: CustomerModel = new CustomerModel();
  currentDateTime!: string;
  ref: any;

  exportingBillStatuses: ExportingBillStatus[] = [
    {display: 'Đang đặt hàng', value: 'BOOKING'},
    {display: 'Đang vận chuyển', value: 'SHIPPING'},
    {display: 'Đã kiểm duyệt', value: 'CHECKED'},
    {display: 'Đã hủy', value: 'CANCELLED'},
    {display: 'Đã hoàn tất', value: 'COMPLETED'}
  ];

  constructor(private exportingBillService: ExportingbillService) {

  }

  ngOnInit(): void {
    this.getAllOrderHistory();
    this.getDateTimeCurrent();
    setInterval(() => {
      this.getDateTimeCurrent()
    }, 1000);
  }

  getAllOrderHistory(): void {
    var getDataCustomer = localStorage.getItem('customer');
    this.customerObject = JSON.parse(getDataCustomer!);

    this.exportingBillService.getBillOrder(this.customerObject).subscribe(data => {
      this.getAllOrderHistoryToComplete(data)
    })
  }

  getAllOrderHistoryToComplete(res: ResponseModel<ExportingBillFullModel[]>): void {
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
    this.exportingBillOrders = res.result;

    //Set status display
    this.setValueExportingBillStatus();
  }

  getDateTimeCurrent(): void {
    const date = new Date();
    this.currentDateTime = date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) + ", " + date.toLocaleTimeString();
  }

  setValueExportingBillStatus(): void {
    this.exportingBillOrders.forEach(bill => {
      this.exportingBillStatuses.forEach(object => {
        if (bill.exportingBill?.status === object.value) {
          bill.exportingBill.status = object.display;
        }
        return;
      })
    });
  }
}
