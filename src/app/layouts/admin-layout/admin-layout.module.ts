import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';



import { ComponentsModule } from '../../components/components.module';
import { RightSidebarComponent } from '../../components/right-sidebar/right-sidebar.component';
import { CustomFormsFieldModule } from '../../components/appanalyst/custom-forms-field/custom-forms-field.module';
import { AdvanceTableComponent } from '../../components/advance-table/advance-table.component';
import { ExampleComponent } from '../../pages/example/example.component';
import { ExampleAddComponent } from 'src/app/pages/example/example-add/example-add.component';
import { ExampleDetailComponent } from 'src/app/pages/example/example-detail/example-detail.component';
import { ExamplEditComponent } from 'src/app/pages/example/example-edit/exampl-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    NgSelectModule,
    ToastrModule.forRoot(),
    DataTablesModule,
    ComponentsModule,
    CustomFormsFieldModule,
  ],
  declarations: [
    DashboardComponent,
    AdvanceTableComponent,
    ExampleComponent, ExampleAddComponent, ExampleDetailComponent, ExamplEditComponent
  ]
})

export class AdminLayoutModule {}
