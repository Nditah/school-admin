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
import { StaffComponent } from 'src/app/pages/staff/staff.component';
import { StaffAddComponent } from 'src/app/pages/staff/staff-add/staff-add.component';
import { StaffEditComponent } from 'src/app/pages/staff/staff-edit/staff-edit.component';
import { StaffDetailComponent } from 'src/app/pages/staff/staff-detail/staff-detail.component';
import { StudentComponent } from 'src/app/pages/student/student.component';
import { StudentAddComponent } from 'src/app/pages/student/student-add/student-add.component';
import { StudentEditComponent } from 'src/app/pages/student/student-edit/student-edit.component';
import { StudentDetailComponent } from 'src/app/pages/student/student-detail/student-detail.component';
import { ParentComponent } from 'src/app/pages/parent/parent.component';
import { ParentAddComponent } from 'src/app/pages/parent/parent-add/parent-add.component';
import { ParentEditComponent } from 'src/app/pages/parent/parent-edit/parent-edit.component';
import { ParentDetailComponent } from 'src/app/pages/parent/parent-detail/parent-detail.component';
import { ClasseComponent } from 'src/app/pages/classe/classe.component';
import { ClasseAddComponent } from 'src/app/pages/classe/classe-add/classe-add.component';
import { ClasseEditComponent } from 'src/app/pages/classe/classe-edit/classe-edit.component';
import { ClasseDetailComponent } from 'src/app/pages/classe/classe-detail/classe-detail.component';
import { CourseComponent } from 'src/app/pages/course/course.component';
import { CourseAddComponent } from 'src/app/pages/course/course-add/course-add.component';
import { CourseEditComponent } from 'src/app/pages/course/course-edit/course-edit.component';
import { CourseDetailComponent } from 'src/app/pages/course/course-detail/course-detail.component';
import { SubjectComponent } from 'src/app/pages/subject/subject.component';
import { SubjectAddComponent } from 'src/app/pages/subject/subject-add/subject-add.component';
import { SubjectEditComponent } from 'src/app/pages/subject/subject-edit/subject-edit.component';
import { SubjectDetailComponent } from 'src/app/pages/subject/subject-detail/subject-detail.component';
import { AdmissionComponent } from 'src/app/pages/admission/admission.component';
import { ClassRoomComponent } from 'src/app/pages/class-room/class-room.component';
import { HostelComponent } from 'src/app/pages/hostel/hostel.component';
import { NotificationComponent } from 'src/app/pages/notification/notification.component';
import { SettingComponent } from 'src/app/pages/setting/setting.component';
import { SmsComponent } from 'src/app/pages/sms/sms.component';
import { OfficeComponent } from 'src/app/pages/office/office.component';
import { FeesPaymentComponent } from 'src/app/pages/fees-payment/fees-payment.component';
import { FeesTypeComponent } from 'src/app/pages/fees-type/fees-type.component';
import { AttendanceComponent } from 'src/app/pages/attendance/attendance.component';
import { BookComponent } from 'src/app/pages/book/book.component';

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
    StaffComponent, StaffAddComponent, StaffEditComponent, StaffDetailComponent,
    StudentComponent, StudentAddComponent, StudentEditComponent, StudentDetailComponent,
    ParentComponent, ParentAddComponent, ParentEditComponent, ParentDetailComponent,
    ClasseComponent, ClasseAddComponent, ClasseEditComponent, ClasseDetailComponent,
    CourseComponent, CourseAddComponent, CourseEditComponent, CourseDetailComponent,
    SubjectComponent, SubjectAddComponent, SubjectEditComponent, SubjectDetailComponent,

    ExampleComponent, ExampleAddComponent, ExampleDetailComponent, ExamplEditComponent,

    AdmissionComponent,

    FeesPaymentComponent,

    FeesTypeComponent,

    BookComponent,

    AttendanceComponent,

    OfficeComponent,

    ClassRoomComponent,

    HostelComponent,

    NotificationComponent,

    SettingComponent,

    SmsComponent
  ]
})

export class AdminLayoutModule {}
