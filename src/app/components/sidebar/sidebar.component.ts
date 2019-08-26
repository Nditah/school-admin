import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
   title: string;
    icon: string;
   class: string;
     sub: any[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',             title: 'Dashboard',                   icon: 'design_app',                     class: '', sub: null },
    { path: '/example',               title: 'Example',                     icon: 'users_single-02',                class: '', sub: null },
    { path: '/attendance',            title: 'Attendance',                  icon: 'users_single-02',                class: '', sub: null },
    { path: '/book',                  title: 'Book',                        icon: 'users_single-02',                class: '', sub: null },
    { path: '/staff',                 title: 'Staff',                       icon: 'users_single-02',                class: '', sub: null },
    { path: '/student',               title: 'Student',                     icon: 'users_single-02',                class: '', sub: null },
    { path: '/parent',                title: 'Parent',                      icon: 'users_single-02',                class: '', sub: null },
    { path: '/classe',                title: 'Class',                       icon: 'business_badge',                 class: '', sub: null },
    { path: '/course',                title: 'Course',                      icon: 'shopping_delivery-fast',         class: '', sub: null },
    { path: '/subject',               title: 'Subject',                     icon: 'business_bank',                  class: '', sub: null },
    { path: '/admission',             title: 'Admission',                   icon: 'business_bank',                  class: '', sub: null },
    { path: '/feespayment',           title: 'Fees Payment',                icon: 'business_bank',                  class: '', sub: null },
    { path: '/fee',                    title: 'Fees',                      icon: 'business_bank',                  class: '', sub: null },
    { path: '/marksheet',             title: 'Marksheet',                   icon: 'users_single-02',                class: '', sub: null },
    { path: '',                       title: 'Hostel',                      icon: 'location_pin',                   class: 'parent-nav',
    sub: [
      { path: '/hostel',                title: 'Hostel',                      icon: 'location_map-big',               class: '' },
      { path: '/hostel-allocation',     title: 'Hostel Allocation',            icon: 'location_compass-05',            class: '' },
      { path: '/bedspace',              title: 'Hostel Bedspace',              icon: 'location_world',                 class: '' },
      { path: '/hostel-room',           title: 'Hostel Room',                  icon: 'location_world',                 class: '' },
    ]},
    { path: '/sms',                   title: 'SMS',                         icon: 'users_single-02',                  class: '', sub: null },
    { path: '/Office',                title: 'Office',                       icon: 'business_bank',                  class: '', sub: null },
    { path: '/setting',               title: 'Setting',                     icon: 'business_bank',                  class: '', sub: null },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  }
}
