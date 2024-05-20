import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetStatEComponent} from "@coreui/angular";
import {ChartjsComponent} from "@coreui/angular-chartjs";

@Component({
  selector: 'app-widget-transaction',
  standalone: true,
  imports: [CommonModule, WidgetStatEComponent, ChartjsComponent],
  templateUrl: './widget-transaction.component.html',
  styleUrl: './widget-transaction.component.scss'
})
export class WidgetTransactionComponent {
  @Input() title!: string;
  @Input() value!: string;
  @Input() data: any;
  @Input() options: any;
}
