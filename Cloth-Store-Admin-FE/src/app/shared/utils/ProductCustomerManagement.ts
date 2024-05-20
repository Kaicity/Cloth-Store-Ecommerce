import {INavData} from "@coreui/angular";

export const ProductCustomerManagement: INavData[] = [
  {
    name: 'Sản phẩm - Khách hàng',
    url: '/base',
    iconComponent: {name: 'cilNotes'},
    children: [
      {
        name: 'Quản lý sản phẩm',
        iconComponent: {name: 'cilInbox'},
        children: [
          {
            name: 'Hàng hóa - sản phẩm',
            url: '/product'
          },
          {
            name: 'Sản phẩm nhập',
            url: '/cards'
          },
          {
            name: 'Sản phẩm bán',
            url: '/cards'
          },
          {
            name: 'Quản lý đơn vị tính',
            url: '/cards'
          },
        ],
      },
      {
        name: 'Quản lý Khách hàng',
        iconComponent: {name: 'cilUser'},
        children: [
          {
            name: 'Khách Hàng',
            url: 'customer'
          },
          {
            name: 'Nhóm Khách hàng',
            url: '/base/cards'
          },
        ]
      }

    ]
  },

];
