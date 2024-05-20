import {INavData} from "@coreui/angular";

export const EmployeeManagement: INavData[] = [
  {
    name: 'Nhân viên - CTV',
    url: '/base',
    iconComponent: {name: 'cilTags'},
    children: [
      {
        iconComponent: {name: 'cilPeople'},
        name: 'Quản lý nhân viên',
        url: '/base/cards'
      },
      {
        iconComponent: {name: 'cilBookmark'},
        name: 'Quản lý chức vụ',
        url: '/base/cards'
      },


    ]
  },

];
