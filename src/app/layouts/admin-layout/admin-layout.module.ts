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
import { ExampleAddComponent } from '../../pages/example/example-add/example-add.component';
import { ExampleDetailComponent } from '../../pages/example/example-detail/example-detail.component';
import { ExamplEditComponent } from '../../pages/example/example-edit/exampl-edit.component';
import { StaffComponent } from '../../pages/staff/staff.component';
import { StaffAddComponent } from '../../pages/staff/staff-add/staff-add.component';
import { StaffEditComponent } from '../../pages/staff/staff-edit/staff-edit.component';
import { StaffDetailComponent } from '../../pages/staff/staff-detail/staff-detail.component';
import { StudentComponent } from '../../pages/student/student.component';
import { StudentAddComponent } from '../../pages/student/student-add/student-add.component';
import { StudentEditComponent } from '../../pages/student/student-edit/student-edit.component';
import { StudentDetailComponent } from '../../pages/student/student-detail/student-detail.component';
import { ParentComponent } from '../../pages/parent/parent.component';
import { ParentAddComponent } from '../../pages/parent/parent-add/parent-add.component';
import { ParentEditComponent } from '../../pages/parent/parent-edit/parent-edit.component';
import { ParentDetailComponent } from '../../pages/parent/parent-detail/parent-detail.component';
import { ClasseComponent } from '../../pages/classe/classe.component';
import { ClasseAddComponent } from '../../pages/classe/classe-add/classe-add.component';
import { ClasseEditComponent } from '../../pages/classe/classe-edit/classe-edit.component';
import { ClasseDetailComponent } from '../../pages/classe/classe-detail/classe-detail.component';
import { CourseComponent } from '../../pages/course/course.component';
import { CourseAddComponent } from '../../pages/course/course-add/course-add.component';
import { CourseEditComponent } from '../../pages/course/course-edit/course-edit.component';
import { CourseDetailComponent } from '../../pages/course/course-detail/course-detail.component';
import { SubjectComponent } from '../../pages/subject/subject.component';
import { SubjectAddComponent } from '../../pages/subject/subject-add/subject-add.component';
import { SubjectEditComponent } from '../../pages/subject/subject-edit/subject-edit.component';
import { SubjectDetailComponent } from '../../pages/subject/subject-detail/subject-detail.component';
import { AdmissionComponent } from '../../pages/admission/admission.component';
import { AdmissionAddComponent } from '../../pages/admission/admission-add/admission-add.component';
import { AdmissionDetailComponent } from '../../pages/admission/admission-detail/admission-detail.component';
import { AdmissionEditComponent } from '../../pages/admission/admission-edit/admission-edit.component';
import { HostelComponent } from '../../pages/hostel/hostel.component';
import { NotificationComponent } from '../../pages/notification/notification.component';
import { SettingComponent } from '../../pages/setting/setting.component';
import { SmsComponent } from '../../pages/sms/sms.component';
import { OfficeComponent } from '../../pages/office/office.component';
import { FeesPaymentComponent } from '../../pages/fees-payment/fees-payment.component';
import { FeesTypeComponent } from '../../pages/fees-type/fees-type.component';
import { AttendanceComponent } from '../../pages/attendance/attendance.component';
import { BookComponent } from '../../pages/book/book.component';
import { MarksheetComponent } from '../../pages/marksheet/marksheet.component';
import { MarksheetAddComponent } from '../../pages/marksheet/marksheet-add/marksheet-add.component';
import { MarksheetDetailComponent } from '../../pages/marksheet/marksheet-detail/marksheet-detail.component';
import { MarksheetEditComponent } from '../../pages/marksheet/marksheet-edit/marksheet-edit.component';
import { SmsDetailComponent } from '../../pages/sms/sms-detail/sms-detail.component';
import { SmsEditComponent } from '../../pages/sms/sms-edit/sms-edit.component';
import { SmsAddComponent } from '../../pages/sms/sms-add/sms-add.component';
import { SettingDetailComponent } from '../../pages/setting/setting-detail/setting-detail.component';
import { OfficeAddComponent } from '../../pages/office/office-add/office-add.component';
import { OfficeDetailComponent } from '../../pages/office/office-detail/office-detail.component';
import { OfficeEditComponent } from '../../pages/office/office-edit/office-edit.component';
import { AttendanceAddComponent } from '../../pages/attendance/attendance-add/attendance-add.component';
import { AttendanceDetailComponent } from '../../pages/attendance/attendance-detail/attendance-detail.component';
import { AttendanceEditComponent } from '../../pages/attendance/attendance-edit/attendance-edit.component';
import { HostelEditComponent } from '../../pages/hostel/hostel-edit/hostel-edit.component';
import { HostelDetailComponent } from '../../pages/hostel/hostel-detail/hostel-detail.component';
import { HostelAddComponent } from '../../pages/hostel/hostel-add/hostel-add.component';
import { FeeComponent } from '../../pages/fee/fee.component';
import { FeeAddComponent } from '../../pages/fee/fee-add/fee-add.component';
import { FeeEditComponent } from '../../pages/fee/fee-edit/fee-edit.component';
import { FeeDetailComponent } from '../../pages/fee/fee-detail/fee-detail.component';
import { HostelAllocationAddComponent } from '../../pages/hostel-allocation/hostel-allocation-add/hostel-allocation-add.component';
import { HostelAllocationDetailComponent } from '../../pages/hostel-allocation/hostel-allocation-detail/hostel-allocation-detail.component';
import { HostelAllocationComponent } from '../../pages/hostel-allocation/hostel-allocation.component';
import { HostelAllocationEditComponent } from '../../pages/hostel-allocation/hostel-allocation-edit/hostel-allocation-edit.component';
import { HostelRoomComponent } from '../../pages/hostel-room/hostel-room.component';
import { HostelRoomAddComponent } from '../../pages/hostel-room/hostel-room-add/hostel-room-add.component';
import { HostelRoomDetailComponent } from '../../pages/hostel-room/hostel-room-detail/hostel-room-detail.component';
import { HostelRoomEditComponent } from '../../pages/hostel-room/hostel-room-edit/hostel-room-edit.component';
import { HostelBedspaceComponent } from '../../pages/hostel-bedspace/hostel-bedspace.component';
import { HostelBedspaceAddComponent } from '../../pages/hostel-bedspace/hostel-bedspace-add/hostel-bedspace-add.component';
import { HostelBedspaceDetailComponent } from '../../pages/hostel-bedspace/hostel-bedspace-detail/hostel-bedspace-detail.component';
import { HostelBedspaceEditComponent } from '../../pages/hostel-bedspace/hostel-bedspace-edit/hostel-bedspace-edit.component';
import { ClassroomComponent } from '../../pages/classroom/classroom.component';
import { ClassroomAddComponent } from '../../pages/classroom/classroom-add/classroom-add.component';
import { ClassroomDetailComponent } from '../../pages/classroom/classroom-detail/classroom-detail.component';
import { ClassroomEditComponent } from '../../pages/classroom/classroom-edit/classroom-edit.component';
import { ReportComponent } from '../../pages/report/report.component';
import { ReportAddComponent } from '../../pages/report/report-add/report-add.component';
import { ReportEditComponent } from '../../pages/report/report-edit/report-edit.component';
import { ReportDetailComponent } from '../../pages/report/report-detail/report-detail.component';
import { CurriculumComponent } from '../../pages/curriculum/curriculum.component';
import { CurriculumAddComponent } from '../../pages/curriculum/curriculum-add/curriculum-add.component';
import { CurriculumEditComponent } from '../../pages/curriculum/curriculum-edit/curriculum-edit.component';
import { CurriculumDetailComponent } from '../../pages/curriculum/curriculum-detail/curriculum-detail.component';
import { TimetableComponent } from '../../pages/timetable/timetable.component';
import { TimetableAddComponent } from '../../pages/timetable/timetable-add/timetable-add.component';
import { TimetableEditComponent } from '../../pages/timetable/timetable-edit/timetable-edit.component';
import { TimetableDetailComponent } from '../../pages/timetable/timetable-detail/timetable-detail.component';
import { AssetComponent } from 'src/app/pages/asset/asset.component';
import { AssetAddComponent } from 'src/app/pages/asset/asset-add/asset-add.component';
import { AssetEditComponent } from 'src/app/pages/asset/asset-edit/asset-edit.component';
import { AssetDetailComponent } from 'src/app/pages/asset/asset-detail/asset-detail.component';
import { ExpenseComponent } from 'src/app/pages/expense/expense.component';
import { ExpenseAddComponent } from 'src/app/pages/expense/expense-add/expense-add.component';
import { ExpenseDetailComponent } from 'src/app/pages/expense/expense-detail/expense-detail.component';
import { ExpenseEditComponent } from 'src/app/pages/expense/expense-edit/expense-edit.component';


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

    AdmissionComponent, AdmissionAddComponent, AdmissionDetailComponent, AdmissionEditComponent,

    FeesPaymentComponent,

    FeesTypeComponent,

    BookComponent,

    AttendanceComponent, AttendanceAddComponent, AttendanceDetailComponent, AttendanceEditComponent,

    MarksheetComponent, MarksheetAddComponent, MarksheetDetailComponent, MarksheetEditComponent,


    OfficeComponent, OfficeAddComponent, OfficeDetailComponent, OfficeEditComponent,

    HostelComponent, HostelEditComponent, HostelDetailComponent, HostelAddComponent,

    NotificationComponent,

    SettingComponent, SettingDetailComponent,

    SmsComponent, SmsAddComponent, SmsDetailComponent, SmsEditComponent,
    FeeComponent, FeeAddComponent, FeeEditComponent, FeeDetailComponent,
    HostelAllocationComponent, HostelAllocationAddComponent, HostelAllocationDetailComponent, HostelAllocationEditComponent,
    HostelRoomComponent, HostelRoomAddComponent, HostelRoomDetailComponent, HostelRoomEditComponent,
    HostelBedspaceComponent, HostelBedspaceAddComponent, HostelBedspaceDetailComponent, HostelBedspaceEditComponent,
    ClassroomComponent, ClassroomAddComponent, ClassroomDetailComponent, ClassroomEditComponent,
    ReportComponent, ReportAddComponent, ReportEditComponent, ReportDetailComponent,
    CurriculumComponent, CurriculumAddComponent, CurriculumEditComponent, CurriculumDetailComponent,
    TimetableComponent, TimetableAddComponent, TimetableEditComponent, TimetableDetailComponent, 
    AssetComponent, AssetAddComponent, AssetEditComponent, AssetDetailComponent,
    ExpenseComponent, ExpenseAddComponent, ExpenseDetailComponent, ExpenseEditComponent,
    
  ]
})

export class AdminLayoutModule {}
