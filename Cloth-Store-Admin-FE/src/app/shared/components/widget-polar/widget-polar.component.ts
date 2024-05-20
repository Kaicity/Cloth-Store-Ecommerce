import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartjsComponent} from "@coreui/angular-chartjs";

@Component({
  selector: 'app-widget-polar',
  standalone: true,
  imports: [CommonModule, ChartjsComponent],
  templateUrl: './widget-polar.component.html',
  styleUrl: './widget-polar.component.scss'
})
export class WidgetPolarComponent {
  @Input() data: any;

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      console.log('handleChartRef', $chartRef);
      this.data.labels.push('August');
      this.data.datasets[0].data.push(60);
      this.data.datasets[1].data.push(20);
      setTimeout(() => {
        $chartRef?.update();
      }, 3000);
    }
  }
}
