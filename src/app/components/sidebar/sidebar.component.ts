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
    { path: '/feestype',              title: 'Fees Type',                   icon: 'business_bank',                  class: '', sub: null },
    { path: '',                       title: 'Hostel',                      icon: 'location_pin',                   class: 'parent-nav',
    sub: [
      { path: '/city',                title: 'Hotel 1',                      icon: 'location_map-big',               class: '' },
      { path: '/state',               title: 'Hostel 2',                      icon: 'location_compass-05',            class: '' },
      { path: '/county',              title: 'Hostel 3',                    icon: 'location_world',                 class: '' },
    ]},
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
