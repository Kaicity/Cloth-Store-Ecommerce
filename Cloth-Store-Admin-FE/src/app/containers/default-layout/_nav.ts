import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Components',
    title: true
  },
  {
    name: 'Danh mục (Base)',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Quản lý Hóa Đơn',
        url: '/base/accordion'
      },
      {
        name: 'Doanh thu Hàng Tháng',
        url: '/base/breadcrumbs'
      },
      {
        name: 'Quản lý Khách Hàng',
        url: '/base/cards'
      },
      {
        name: 'Quản lý Sản Phẩm',
        url: '/base/carousel'
      },

    ]
  },

];
