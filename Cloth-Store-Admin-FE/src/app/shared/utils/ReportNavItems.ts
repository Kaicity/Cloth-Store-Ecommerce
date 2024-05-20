import {INavData} from "@coreui/angular";

export const ReportNavItems: INavData[] = [
  {
    name: 'Hệ thống báo cáo',
    url: '/base',
    iconComponent: {name: 'cilSettings'},

    children: [
      {
        name: 'Báo cáo Bán hàng',
        url: '/base/cards',
      },
      {
        name: 'Báo thu - chi tiền mặt',
        url: '/base/cards',
      },
      {
        name: 'Báo cáo tồn kho',
        url: '/base/cards',
      },

    ]
  },

];
