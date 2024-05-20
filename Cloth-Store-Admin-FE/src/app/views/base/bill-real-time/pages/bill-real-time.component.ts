import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsocketService} from "../../../../core/Services/agency/WebsocketService";

import {ExportingbillService} from "../../../../core/Services/agency/ExportingbillService";
import {BillStatus} from "../../../../core/constanst/BillStatus";
import {SocketMessage} from "../../../../core/apis/dtos/socket-message";
import {TypeBillRealTime} from "../../../../core/constanst/TypeBillRealTime";
import {AppShowDetailBill} from "../components/app-show-detail-bill/app-show-detail-bill.component";
import {ExportingBillFullModel} from "../../../../core/apis/dtos/Exporting-bill-full.model";
import {ResponseModel} from "../../../../core/apis/dtos/Response.model";

@Component({
  selector: 'bill-read-time',
  templateUrl: './bill-real-time.component.html',
  styleUrl: './bill-real-time.component.scss'
})
export class BillRealTimeComponent implements OnInit {
  messageList: any[] = [];

  bookingBills: ExportingBillFullModel[] = [];
  checkedBills: ExportingBillFullModel[] = [];
  shippingBills: ExportingBillFullModel[] = [];
  cancelledBills: ExportingBillFullModel[] = [];
  completedBills: ExportingBillFullModel[] = [];

  private idSocket = "billRealTimeSection";

  @ViewChild("AddWrapper") addWrapper!: AppShowDetailBill;

  constructor(private webSocketService: WebsocketService, private exportingBillService: ExportingbillService) {
  }

  ngOnInit(): void {
    this.getAllExportingBill();
   // this.webSocketService.joinSocket(this.idSocket);
  //  this.listenerMessage();
  }

  sendMessage() {

    let a: ExportingBillFullModel = new ExportingBillFullModel();
    const chatMessage = {
      idSocket: this.idSocket, message: '1', data: a
    } as SocketMessage<ExportingBillFullModel>
    this.webSocketService.sendMessage(this.idSocket, chatMessage);
  }

  listenerMessage() {
    this.webSocketService.getMessageSubject().subscribe((message: any) => {
      this.messageList = message;
      let result = message.data as ExportingBillFullModel;
      this.UpdateUI(result, message.message);
    });
  }

  private getAllExportingBill() {
    // cho cái load show chổ này
    this.exportingBillService.getAllBill().subscribe(res => {
      this.getAllExportingBillComplete(res)
    });
  }

  private getAllExportingBillComplete(res: ResponseModel<ExportingBillFullModel[]>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach((value: any) => {
          var t: any;
          t.error.message(value);
        });
        return;
      }
    }
    // Lấy danh sách đối tượng từ API

    for (let i = 0; i < res.result.length; i++) {
      if (res.result[i] != undefined && res.result[i].exportingBill != undefined) {
        let bill = res.result[i];
        if (bill!.exportingBill!.status === BillStatus.BOOKING) this.bookingBills.push(bill!);
        if (bill!.exportingBill!.status === BillStatus.CHECKED) this.checkedBills.push(bill!);
        if (bill!.exportingBill!.status === BillStatus.SHIPPING) this.shippingBills.push(bill!);
        if (bill!.exportingBill!.status === BillStatus.CANCELLED) this.cancelledBills.push(bill!);
        if (bill!.exportingBill!.status === BillStatus.COMPELETED) this.completedBills.push(bill!);
      }
    }
  }

  UpdateUI(exportingBill: ExportingBillFullModel, message: string) {
    console.log(message === TypeBillRealTime.BOOKING.toString());
    if (message === TypeBillRealTime.BOOKING.toString()) {
      if (exportingBill.exportingBill) this.bookingBills.push(exportingBill);
    }
  }

  showInsertForm() {
    // this.addWrapper.isInsertChose = true;
  }


  test2(bill: ExportingBillFullModel) {
    this.addWrapper.isInsertChose = true;
    this.addWrapper.bill = bill;
    let status = bill!.exportingBill!.status;
    const result = this.addWrapper.statusBill.find(item => item.id === status);
    this.addWrapper.status = result?.name ?? "";
  }
}
