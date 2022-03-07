import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  items!: MenuItem[];
  activeItem!: MenuItem;

  ngOnInit() {
    this.items = [
      {
        label: 'Thêm thanh toán',
        icon: 'pi pi-fw pi-angle-up',
        routerLink: '/transaction',
      },
      {
        label: 'Thống kê',
        icon: 'pi pi-fw pi-chart-bar ',
        routerLink: '/insight',
      },
    ];

    this.activeItem = this.items[0];
  }
}
