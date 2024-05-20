import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {CustomerModel} from "../../../core/apis/dtos/Customer.model";
import {ControlMaterial} from "../../../ui-component/ControlMaterial";
import {ColComponent, RowComponent} from "@coreui/angular";

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, MatInputModule, ControlMaterial, FormsModule, RowComponent, ColComponent],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  @Input() customerGetDate!: CustomerModel;
  @Input() birthDay!: Date;
  currentDate!: string;
  formattedDate: string;

  constructor() {
    this.currentDate = new Date().toISOString();
    this.formattedDate = this.formatDate(this.currentDate);
    this.customerGetDate = new CustomerModel(); // Assume CustomerDto has been defined
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  getDateCustomer() {
  }

  protected readonly DatePipe = DatePipe;
}
