import {Component, Input, OnInit} from '@angular/core';

import {HeaderComponent} from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor() {
    super();
  }

  ngOnInit(): void {
    window.addEventListener('storage', () => {
      if (localStorage.getItem('appReloadFlag')) {
        localStorage.removeItem('appReloadFlag');
        window.location.reload();
      }
    });
  }

  btnLogOut() {
    // Lặp qua các mục trong localStorage và lưu vào đối tượng
    const localStorageData: { [key: string]: any } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        localStorageData[key] = JSON.parse(localStorage.getItem(key)!);
      }
    }

    localStorage.setItem('appReloadFlag', Date.now().toString());
    window.location.reload();
    Object.keys(localStorageData).forEach(key => {
      localStorage.setItem(key, JSON.stringify(localStorageData[key]));
    });
    localStorage.removeItem("authentication");
  }
}
