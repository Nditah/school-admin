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
   
    // { path: '/daily-sales',           title: 'Daily Sales',                 icon: 'business_bank',                          class: '', sub: null },
    // { path: '/pml-billing',           title: 'PML Billing',                 icon: 'design-2_ruler-pencil',          class: '', sub: null  },
    // { path: '/pml-routing',           title: 'PML Routing',                 icon: 'loader_refresh',                 class: '', sub: null  },
    // { path: '/pml-shipment',          title: 'PML Shipment',                icon: 'shopping_delivery-fast',         class: '', sub: null  },
    // { path: '/pml-waybill',           title: 'PML Waybill',                 icon: 'files_single-copy-04',           class: '', sub: null  },
    // { path: '/pml-delivery',          title: 'PML Delivery',                icon: 'files_single-copy-04',           class: '', sub: null  },
    // { path: '/pmt-schedule',          title: 'PMT Schedules',               icon: 'shopping_delivery-fast',         class: '', sub: null  },
    // { path: '/pmt-route',             title: 'PMT Routes',                  icon: 'transportation_bus-front-12',    class: '', sub: null  },
    // { path: '/bank-register',         title: 'Bank Register',               icon: 'business_bank',                  class: '', sub: null  },
    // { path: '',                       title: 'Employees',                   icon: 'business_badge',                 class: 'parent-nav',
    // sub: [
    //   { path: '/driver',              title: 'Drivers',                     icon: 'users_single-02',                class: '' },
    //   { path: '/staff',               title: 'Staffs',                      icon: 'users_single-02',                class: '' },
    // ] },
    // { path: '',                       title: 'Locations',                   icon: 'location_pin',                   class: 'parent-nav',
    // sub: [
    //   { path: '/city',                title: 'Cities',                      icon: 'location_map-big',               class: '' },
    //   { path: '/state',               title: 'States',                      icon: 'location_compass-05',            class: '' },
    //   { path: '/county',              title: 'Counties',                    icon: 'location_world',                 class: '' },
    // ] },
    // { path: '/vehicle',               title: 'Vehicles',                    icon: 'transportation_bus-front-12',    class: '', sub: null  },
    // { path: '/message',               title: 'Messages',                    icon: 'ui-1_email-85',                  class: '',  sub: null },
    // { path: '/user-profile',          title: 'User Profile',                icon: 'users_circle-08',                class: '',  sub: null },
    // { path: '/setting',               title: 'Settings',                    icon: 'ui-1_settings-gear-63',          class: '',  sub: null },
    // { path: '/sync',                  title: 'Synchronize',                 icon: 'loader_refresh',                 class: '',  sub: null },
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
