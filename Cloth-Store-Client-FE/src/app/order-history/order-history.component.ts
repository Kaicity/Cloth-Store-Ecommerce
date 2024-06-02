import {Component, OnInit} from '@angular/core';
import {ExportingBillFullModel} from "../../bm-api/dtos/exporting-bill-full.model";
import {ResponseModel} from "../../bm-api/dtos/response.model";
import {ExportingbillService} from "../../bm-api/Services/agency/ExportingbillService";
import {CustomerModel} from "../../bm-api/dtos/customer.model";
import {AngularFireStorage} from "@angular/fire/compat/storage";

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

  constructor(private exportingBillService: ExportingbillService, private fireStorage: AngularFireStorage) {

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

    //Set image
    this.getImagePathFirebase();
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

  getImagePathFirebase() {
    //Code bởi NQTiến 12/05/2024 lay path hình ảnh từ firebase gán ngược lại giá trị image của product
    this.exportingBillOrders.forEach(bill => {
      bill.exportingBillTransactions?.forEach(billTrans => {
        if (billTrans) {
          const path = 'image_data_client/product/' + billTrans.product?.image; // Your image path
          this.ref = this.fireStorage.ref(path);
          this.ref.getDownloadURL().subscribe((url: any) => {
            billTrans.product!.image = url;
          })
        }
      })
    })
  }
}
