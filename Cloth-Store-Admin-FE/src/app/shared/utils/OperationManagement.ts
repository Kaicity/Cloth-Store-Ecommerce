import {INavData} from "@coreui/angular";

export const OperationManagement: INavData[] = [
  {
    name: 'Quản lý hoạt động',
    url: '/base',
    iconComponent: {name: 'cilList'},
    children: [
      {
        name: 'Quản lý Mua Hàng',
        iconComponent: {name: 'cilDollar'},
        children: [
          {
            name: 'Nhập mua hàng hóa - sản phẩm',
            url: '/importing'
          },
          {
            name: 'Xuất trả hàng hóa',
            url: 'exporting-return'
          },
          {
            name: 'Quản lý bảng giá nhập',
            url: '/base/breadcrumbs'
          },
        ]
      },
      {
        name: 'Quản lý Bán Hàng',
        iconComponent: {name: 'cilDollar'},
        children: [
          {
            name: 'Phiếu đặt hàng',
            url: 'exporting'
          },
          {
            name: 'Nhập trả hàng hóa',
            url: 'importing-return'
          },
          {
            name: 'Quản lý bảng giá',
            url: '/base/breadcrumbs'
          },
        ]
      },
      {
        name: 'Thu - chi tiền ',
        iconComponent: {name: 'cilCreditCard'},
        children: [
          {
            name: 'Chứng từ chi',
            url: '/payment'
          },
          {
            name: 'Chứng từ thu',
            url: '/receipt'
          },
        ]
      },
      {
        name: 'Tài sản cố định',
        iconComponent: {name: 'cilLockLocked'},
        url: '/base/breadcrumbs'
      },
      {
        name: 'Quản lý nhà cung cấp',
        iconComponent: {name: 'cilLockLocked'},
        url: '/supplier'
      },
    ]
  },
];
