import {Component, OnInit} from '@angular/core';
import {GeneralInformationNavItems} from "../../shared/utils/GeneralInformationNavItems";
import {ReportNavItems} from "../../shared/utils/ReportNavItems";
import {ProductCustomerManagement} from "../../shared/utils/ProductCustomerManagement";
import {OperationManagement} from "../../shared/utils/OperationManagement";
import {EmployeeManagement} from "../../shared/utils/EmployeeManagement";
import {StatisticNavItems} from "../../shared/utils/StatisticNavItems";
import {BillInDayItems} from "../../shared/utils/BillInDayItems";
import {Router} from "@angular/router";
import {color} from "chart.js/helpers";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  public generalInformationNavItems = GeneralInformationNavItems;
  public customerEmployeeNavItems = ProductCustomerManagement;
  public operationManagement = OperationManagement;
  public employeeManagement = EmployeeManagement;
  public reportNavItems = ReportNavItems;
  public StatisticNavItems = StatisticNavItems;
  public billInDayItems = BillInDayItems;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    //Kiểm tra trạng thái đã login hay chưa
    if (localStorage.getItem("authentication") === null) {
      this.router.navigate(['login']);
    }
  }

  protected readonly top = top;
  protected readonly color = color;
}
