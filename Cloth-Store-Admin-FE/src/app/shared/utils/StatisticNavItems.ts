import {INavData} from "@coreui/angular";

export const StatisticNavItems: INavData[] = [
  {
    name: 'Hệ thống thống kê',
    url: '/base',
    iconComponent: {name: 'cilSettings'},

    children: [
      {
        name: 'Báo cáo Bán hàng',
        url: '/statistic',
      },
      {
        name: 'Báo thu - chi tiền mặt',
        url: '/statistic-money',
      },
      {
        name: 'Báo cáo tồn kho',
        url: '/cards',
      },

    ]
  },

];
