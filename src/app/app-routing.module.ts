import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', component: AdminLayoutComponent,
    children: [
        {
          path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        }
    ]},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    // RouterModule.forRoot(routes)
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      enableTracing: false,
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
