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
import { AdmissionComponent } from 'src/app/pages/admission/admission.component';
import { ClassRoomComponent } from 'src/app/pages/class-room/class-room.component';
import { HostelComponent } from 'src/app/pages/hostel/hostel.component';
import { NotificationComponent } from 'src/app/pages/notification/notification.component';
import { SettingComponent } from 'src/app/pages/setting/setting.component';
import { SmsComponent } from 'src/app/pages/sms/sms.component';
import { OfficeComponent } from 'src/app/pages/office/office.component';

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

    ExampleComponent, ExampleAddComponent, ExampleDetailComponent, ExamplEditComponent,

    AdmissionComponent,

    OfficeComponent,

    ClassRoomComponent,

    HostelComponent,

    NotificationComponent,

    SettingComponent,

    SmsComponent
  ]
})

export class AdminLayoutModule {}
