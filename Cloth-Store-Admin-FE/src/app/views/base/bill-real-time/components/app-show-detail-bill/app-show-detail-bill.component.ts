import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {BillStatus} from "../../../../../core/constanst/BillStatus";
import {ExportingBillFullModel} from "../../../../../core/apis/dtos/Exporting-bill-full.model";

@Component({
  selector: 'app-show-detail-bill', templateUrl: './app-show-detail-bill.component.html',
})

export class AppShowDetailBill implements OnInit, AfterViewInit {

  @Input() bill: ExportingBillFullModel = new ExportingBillFullModel();
  currentDateTime: string = moment().format('YYYY-MM-DD HH:mm:ss');
  isInsertChose: boolean = false;
  statusBill = [
    {id: BillStatus.BOOKING, name: 'Đang đặt hàng'},
    {id: BillStatus.CHECKED, name: 'Đánh dấu đã xem'},
    {id: BillStatus.SHIPPING, name: 'Đã Giao'},
    {id: BillStatus.COMPELETED, name: 'Đã hoàn thành'},
    {id: BillStatus.CANCELLED, name: 'Đã hủy'}
  ];

  status: string = '';

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

  }

  closeModal() {
    this.isInsertChose = false;
  }

  onSubmit() {
    console.log("XXX");
  }

  statusChange(index: number) {
    this.status = this.statusBill[+index].name;
    this.bill!.exportingBill!.status = this.statusBill[+index].id;
    console.log(this.bill!.exportingBill!.status);
  }
}
