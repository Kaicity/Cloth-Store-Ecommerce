import {Component, OnInit} from '@angular/core';
import {getStyle} from "@coreui/utils";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  data: any = {};
  options: any = {};

  dataPolar = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5',
      'Tháng 6', 'Tháng 7'],
    datasets: [
      {
        label: 'Chỉ số lượng khác mua hàng',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
        borderColor: 'rgb(215,102,44)',
        pointBackgroundColor: 'rgb(215,102,44)',
        pointBorderColor: '#fff',
        data: [40, 20, 12, 39, 10, 80, 40]
      },
      {
        label: 'Chỉ số tiêu hao',
        backgroundColor: 'rgba(151, 187, 205, 0.2)',
        borderColor: 'rgb(47,73,204)',
        pointBackgroundColor: 'rgb(47,73,204)',
        pointBorderColor: '#fff',
        data: [50, 12, 28, 29, 7, 25, 60]
      },
    ]
  };

  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April'
  ];

  datasets = [
    {
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-primary'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ];

  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  ngOnInit(): void {
    this.data = {
      labels: this.labels.slice(0, 7),
      datasets: this.datasets
    };
    this.options = this.optionsDefault;
  }

  //Report
  barOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  };

  dataNormal = [
    {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'],
      datasets: [
        {
          backgroundColor: '#321fdb',
          borderColor: 'transparent',
          borderWidth: 1,
          data: [41, 78, 51, 66, 74, 42, 89, 97, 87, 84, 78, 88, 67, 45, 47]
        }
      ]
    }, {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'],
      datasets: [
        {
          backgroundColor: 'transparent',
          borderColor: '#321fdb',
          borderWidth: 2,
          data: [41, 78, 51, 66, 74, 42, 89, 97, 87, 84, 78, 88, 67, 45, 47],
          pointBackgroundColor: '#321fdb'
        }
      ]
    }
  ];
}
