import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownComponent, DropdownToggleDirective, WidgetStatAComponent, WidgetStatEComponent} from "@coreui/angular";
import {IconDirective} from "@coreui/icons-angular";
import {RouterLink} from "@angular/router";
import {ChartjsComponent} from "@coreui/angular-chartjs";
import {cilArrowTop, cilOptions} from "@coreui/icons";

@Component({
  selector: 'app-widget-sales',
  standalone: true,
  imports: [CommonModule, WidgetStatEComponent, WidgetStatAComponent, IconDirective, DropdownComponent, DropdownToggleDirective, RouterLink, ChartjsComponent],
  templateUrl: './widget-sales.component.html',
  styleUrl: './widget-sales.component.scss'
})
export class WidgetSalesComponent {
  icons = { cilOptions, cilArrowTop };
  @Input() title!: string;
  @Input() data: any;
}
