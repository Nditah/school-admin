import { Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ExampleComponent } from '../../pages/example/example.component';
import { ExampleAddComponent } from '../../pages/example/example-add/example-add.component';
import { ExampleDetailComponent } from 'src/app/pages/example/example-detail/example-detail.component';
import { ExamplEditComponent } from 'src/app/pages/example/example-edit/exampl-edit.component';


export const AdminLayoutRoutes: Routes = [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',                    component: DashboardComponent,              canActivate: [AuthGuard] },

    { path: 'example' ,                     component: ExampleComponent,                canActivate: [AuthGuard] },
    { path: 'example/add' ,                 component: ExampleAddComponent,             canActivate: [AuthGuard] },
    { path: 'example/detail/:id' ,          component: ExampleDetailComponent,          canActivate: [AuthGuard] },
    { path: 'example/edit/:id' ,            component: ExamplEditComponent,             canActivate: [AuthGuard] },
  ];
