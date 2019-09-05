import { Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ExampleComponent } from '../../pages/example/example.component';
import { ExampleAddComponent } from '../../pages/example/example-add/example-add.component';
import { ExampleDetailComponent } from '../../pages/example/example-detail/example-detail.component';
import { ExamplEditComponent } from '../../pages/example/example-edit/exampl-edit.component';
import { StaffComponent } from '../../pages/staff/staff.component';
import { StaffAddComponent } from '../../pages/staff/staff-add/staff-add.component';
import { StaffDetailComponent } from '../../pages/staff/staff-detail/staff-detail.component';
import { StaffEditComponent } from '../../pages/staff/staff-edit/staff-edit.component';
import { StudentComponent } from '../../pages/student/student.component';
import { StudentAddComponent } from '../../pages/student/student-add/student-add.component';
import { StudentDetailComponent } from '../../pages/student/student-detail/student-detail.component';
import { StudentEditComponent } from '../../pages/student/student-edit/student-edit.component';
import { ParentComponent } from '../../pages/parent/parent.component';
import { ParentAddComponent } from '../../pages/parent/parent-add/parent-add.component';
import { ParentDetailComponent } from '../../pages/parent/parent-detail/parent-detail.component';
import { ParentEditComponent } from '../../pages/parent/parent-edit/parent-edit.component';
import { ClasseComponent } from '../../pages/classe/classe.component';
import { ClasseAddComponent } from '../../pages/classe/classe-add/classe-add.component';
import { ClasseDetailComponent } from '../../pages/classe/classe-detail/classe-detail.component';
import { ClasseEditComponent } from '../../pages/classe/classe-edit/classe-edit.component';
import { CourseComponent } from '../../pages/course/course.component';
import { CourseAddComponent } from '../../pages/course/course-add/course-add.component';
import { CourseDetailComponent } from '../../pages/course/course-detail/course-detail.component';
import { CourseEditComponent } from '../../pages/course/course-edit/course-edit.component';
import { SubjectComponent } from '../../pages/subject/subject.component';
import { SubjectAddComponent } from '../../pages/subject/subject-add/subject-add.component';
import { SubjectDetailComponent } from '../../pages/subject/subject-detail/subject-detail.component';
import { SubjectEditComponent } from '../../pages/subject/subject-edit/subject-edit.component';
import { AdmissionComponent } from '../../pages/admission/admission.component';
import { AdmissionAddComponent } from '../../pages/admission/admission-add/admission-add.component';
import { AdmissionDetailComponent } from '../../pages/admission/admission-detail/admission-detail.component';
import { AdmissionEditComponent } from '../../pages/admission/admission-edit/admission-edit.component';
import { FeesPaymentComponent } from '../../pages/fees-payment/fees-payment.component';
import { FeesTypeComponent } from '../../pages/fees-type/fees-type.component';
import { BookComponent } from '../../pages/book/book.component';
import { MarksheetComponent } from '../../pages/marksheet/marksheet.component';
import { AttendanceComponent } from '../../pages/attendance/attendance.component';
import { MarksheetAddComponent } from '../../pages/marksheet/marksheet-add/marksheet-add.component';
import { MarksheetEditComponent } from '../../pages/marksheet/marksheet-edit/marksheet-edit.component';
import { MarksheetDetailComponent } from '../../pages/marksheet/marksheet-detail/marksheet-detail.component';
import { AttendanceAddComponent } from '../../pages/attendance/attendance-add/attendance-add.component';
import { AttendanceDetailComponent } from '../../pages/attendance/attendance-detail/attendance-detail.component';
import { AttendanceEditComponent } from '../../pages/attendance/attendance-edit/attendance-edit.component';

import { HostelComponent } from '../../pages/hostel/hostel.component';
import { HostelAddComponent } from '../../pages/hostel/hostel-add/hostel-add.component';
import { HostelEditComponent } from '../../pages/hostel/hostel-edit/hostel-edit.component';
import { HostelDetailComponent } from '../../pages/hostel/hostel-detail/hostel-detail.component';

import { HostelAllocationComponent } from '../../pages/hostel-allocation/hostel-allocation.component';
import { HostelAllocationAddComponent } from '../../pages/hostel-allocation/hostel-allocation-add/hostel-allocation-add.component';
import { HostelAllocationEditComponent } from '../../pages/hostel-allocation/hostel-allocation-edit/hostel-allocation-edit.component';
import { HostelAllocationDetailComponent } from '../../pages/hostel-allocation/hostel-allocation-detail/hostel-allocation-detail.component';

import { FeeComponent } from '../../pages/fee/fee.component';
import { FeeAddComponent } from '../../pages/fee/fee-add/fee-add.component';
import { FeeEditComponent } from '../../pages/fee/fee-edit/fee-edit.component';
import { FeeDetailComponent } from '../../pages/fee/fee-detail/fee-detail.component';

import { HostelRoomComponent } from '../../pages/hostel-room/hostel-room.component';
import { HostelRoomAddComponent } from '../../pages/hostel-room/hostel-room-add/hostel-room-add.component';
import { HostelRoomEditComponent } from '../../pages/hostel-room/hostel-room-edit/hostel-room-edit.component';
import { HostelRoomDetailComponent } from '../../pages/hostel-room/hostel-room-detail/hostel-room-detail.component';

import { HostelBedspaceComponent } from '../../pages/hostel-bedspace/hostel-bedspace.component';
import { HostelBedspaceAddComponent } from '../../pages/hostel-bedspace/hostel-bedspace-add/hostel-bedspace-add.component';
import { HostelBedspaceEditComponent } from '../../pages/hostel-bedspace/hostel-bedspace-edit/hostel-bedspace-edit.component';
import { HostelBedspaceDetailComponent } from '../../pages/hostel-bedspace/hostel-bedspace-detail/hostel-bedspace-detail.component';

import { ClassroomComponent } from '../../pages/classroom/classroom.component';
import { ClassroomAddComponent } from '../../pages/classroom/classroom-add/classroom-add.component';
import { ClassroomDetailComponent } from '../../pages/classroom/classroom-detail/classroom-detail.component';
import { ClassroomEditComponent } from '../../pages/classroom/classroom-edit/classroom-edit.component';
import { OfficeComponent } from '../../pages/office/office.component';
import { OfficeAddComponent } from '../../pages/office/office-add/office-add.component';
import { OfficeDetailComponent } from '../../pages/office/office-detail/office-detail.component';
import { OfficeEditComponent } from '../../pages/office/office-edit/office-edit.component';
import { ReportComponent } from '../../pages/report/report.component';
import { ReportAddComponent } from '../../pages/report/report-add/report-add.component';
import { ReportDetailComponent } from '../../pages/report/report-detail/report-detail.component';
import { ReportEditComponent } from '../../pages/report/report-edit/report-edit.component';
import { CurriculumComponent } from '../../pages/curriculum/curriculum.component';
import { CurriculumAddComponent } from '../../pages/curriculum/curriculum-add/curriculum-add.component';
import { CurriculumDetailComponent } from '../../pages/curriculum/curriculum-detail/curriculum-detail.component';
import { CurriculumEditComponent } from '../../pages/curriculum/curriculum-edit/curriculum-edit.component';
import { TimetableComponent } from '../../pages/timetable/timetable.component';
import { TimetableAddComponent } from '../../pages/timetable/timetable-add/timetable-add.component';
import { TimetableDetailComponent } from '../../pages/timetable/timetable-detail/timetable-detail.component';
import { TimetableEditComponent } from '../../pages/timetable/timetable-edit/timetable-edit.component';
import { AssetComponent } from '../../pages/asset/asset.component';
import { AssetAddComponent } from '../../pages/asset/asset-add/asset-add.component';
import { AssetEditComponent } from '../../pages/asset/asset-edit/asset-edit.component';
import { AssetDetailComponent } from '../../pages/asset/asset-detail/asset-detail.component';
import { ExpenseComponent } from '../../pages/expense/expense.component';
import { ExpenseAddComponent } from '../../pages/expense/expense-add/expense-add.component';
import { ExpenseDetailComponent } from '../../pages/expense/expense-detail/expense-detail.component';
import { ExpenseEditComponent } from '../../pages/expense/expense-edit/expense-edit.component';
import { PayrollComponent } from '../../pages/payroll/payroll.component';
import { PayrollAddComponent } from '../../pages/payroll/payroll-add/payroll-add.component';
import { PayrollDetailComponent } from '../../pages/payroll/payroll-detail/payroll-detail.component';
import { PayrollEditComponent } from '../../pages/payroll/payroll-edit/payroll-edit.component';




export const AdminLayoutRoutes: Routes = [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',                    component: DashboardComponent,              canActivate: [AuthGuard] },

    { path: 'example' ,                     component: ExampleComponent,                canActivate: [AuthGuard] },
    { path: 'example/add' ,                 component: ExampleAddComponent,             canActivate: [AuthGuard] },
    { path: 'example/detail/:id' ,          component: ExampleDetailComponent,          canActivate: [AuthGuard] },
    { path: 'example/edit/:id' ,            component: ExamplEditComponent,             canActivate: [AuthGuard] },

    // book
    { path: 'book',                         component: BookComponent,                   canActivate: [AuthGuard] },

    // Staff
    { path: 'staff' ,                       component: StaffComponent,                  canActivate: [AuthGuard] },
    { path: 'staff/add' ,                   component: StaffAddComponent,               canActivate: [AuthGuard] },
    { path: 'staff/detail/:id' ,            component: StaffDetailComponent,            canActivate: [AuthGuard] },
    { path: 'staff/edit/:id' ,              component: StaffEditComponent,              canActivate: [AuthGuard] },

    // Student
    { path: 'student' ,                     component: StudentComponent,                canActivate: [AuthGuard] },
    { path: 'student/add' ,                 component: StudentAddComponent,             canActivate: [AuthGuard] },
    { path: 'student/detail/:id' ,          component: StudentDetailComponent,          canActivate: [AuthGuard] },
    { path: 'student/edit/:id' ,            component: StudentEditComponent,            canActivate: [AuthGuard] },

    // Parent
    { path: 'parent' ,                      component: ParentComponent,                 canActivate: [AuthGuard] },
    { path: 'parent/add' ,                  component: ParentAddComponent,              canActivate: [AuthGuard] },
    { path: 'parent/detail/:id' ,           component: ParentDetailComponent,           canActivate: [AuthGuard] },
    { path: 'parent/edit/:id' ,             component: ParentEditComponent,             canActivate: [AuthGuard] },

    // Classe
    { path: 'classe' ,                      component: ClasseComponent,                 canActivate: [AuthGuard] },
    { path: 'classe/add' ,                  component: ClasseAddComponent,              canActivate: [AuthGuard] },
    { path: 'classe/detail/:id' ,           component: ClasseDetailComponent,           canActivate: [AuthGuard] },
    { path: 'classe/edit/:id' ,             component: ClasseEditComponent,             canActivate: [AuthGuard] },

    // Course
    { path: 'course' ,                      component: CourseComponent,                 canActivate: [AuthGuard] },
    { path: 'course/add' ,                  component: CourseAddComponent,              canActivate: [AuthGuard] },
    { path: 'course/detail/:id' ,           component: CourseDetailComponent,           canActivate: [AuthGuard] },
    { path: 'course/edit/:id' ,             component: CourseEditComponent,             canActivate: [AuthGuard] },

    // Subject
    { path: 'subject' ,                     component: SubjectComponent,                canActivate: [AuthGuard] },
    { path: 'subject/add' ,                 component: SubjectAddComponent,             canActivate: [AuthGuard] },
    { path: 'subject/detail/:id' ,          component: SubjectDetailComponent,          canActivate: [AuthGuard] },
    { path: 'subject/edit/:id' ,            component: SubjectEditComponent,            canActivate: [AuthGuard] },

    // Admission
    { path: 'admission' ,                     component: AdmissionComponent,                canActivate: [AuthGuard] },
    { path: 'admission/add' ,                 component: AdmissionAddComponent,             canActivate: [AuthGuard] },
    { path: 'admission/detail/:id' ,          component: AdmissionDetailComponent,          canActivate: [AuthGuard] },
    { path: 'admission/edit/:id' ,            component: AdmissionEditComponent,            canActivate: [AuthGuard] },

    // Fees payment
    { path: 'feespayment' ,                     component: FeesPaymentComponent,                canActivate: [AuthGuard] },

    // Fees type
    { path: 'feestype' ,                        component: FeesTypeComponent,             canActivate: [AuthGuard] },

    // Book
    { path: 'book' ,                          component: BookComponent,          canActivate: [AuthGuard] },

    // Marksheet
    { path: 'marksheet' ,                    component: MarksheetComponent,            canActivate: [AuthGuard] },
    { path: 'marksheet/add' ,                 component: MarksheetAddComponent,             canActivate: [AuthGuard] },
    { path: 'marksheet/detail/:id' ,          component: MarksheetDetailComponent,          canActivate: [AuthGuard] },
    { path: 'marksheet/edit/:id' ,            component: MarksheetEditComponent,            canActivate: [AuthGuard] },

    // Attendance
    { path: 'attendance' ,                    component: AttendanceComponent,            canActivate: [AuthGuard] },
    { path: 'attendance/add' ,                 component: AttendanceAddComponent,             canActivate: [AuthGuard] },
    { path: 'attendance/detail/:id' ,          component: AttendanceDetailComponent,          canActivate: [AuthGuard] },
    { path: 'attendance/edit/:id' ,            component: AttendanceEditComponent,            canActivate: [AuthGuard] },


    // Hostel
    { path: 'hostel' ,                    component: HostelComponent,                 canActivate: [AuthGuard] },
    { path: 'hostel/add' ,                 component: HostelAddComponent,             canActivate: [AuthGuard] },
    { path: 'hostel/detail/:id' ,          component: HostelDetailComponent,          canActivate: [AuthGuard] },
    { path: 'hostel/edit/:id' ,            component: HostelEditComponent,            canActivate: [AuthGuard] },

    // Hostel Allocation
    { path: 'hostel-allocation' ,                     component: HostelAllocationComponent,                canActivate: [AuthGuard] },
    { path: 'hostel-allocation/add' ,                 component: HostelAllocationAddComponent,             canActivate: [AuthGuard] },
    { path: 'hostel-allocation/detail/:id' ,          component: HostelAllocationDetailComponent,          canActivate: [AuthGuard] },
    { path: 'hostel-allocation/edit/:id' ,            component: HostelAllocationEditComponent,            canActivate: [AuthGuard] },

    // Fees
    { path: 'fee' ,                     component: FeeComponent,            canActivate: [AuthGuard] },
    { path: 'fee/add',                  component: FeeAddComponent,         canActivate: [AuthGuard] },
    { path: 'fee/detail/:id' ,          component: FeeDetailComponent,          canActivate: [AuthGuard] },
    { path: 'fee/edit/:id' ,            component: FeeEditComponent,            canActivate: [AuthGuard] },

    // Hostel Rooms
    { path: 'hostel-room' ,                     component: HostelRoomComponent,                canActivate: [AuthGuard] },
    { path: 'hostel-room/add' ,                 component: HostelRoomAddComponent,             canActivate: [AuthGuard] },
    { path: 'hostel-room/detail/:id' ,          component: HostelRoomDetailComponent,          canActivate: [AuthGuard] },
    { path: 'hostel-room/edit/:id' ,            component: HostelRoomEditComponent,            canActivate: [AuthGuard] },

    // Hostel Bedspaces
    { path: 'hostel-bedspace' ,                     component: HostelBedspaceComponent,                canActivate: [AuthGuard] },
    { path: 'hostel-bedspace/add' ,                 component: HostelBedspaceAddComponent,             canActivate: [AuthGuard] },
    { path: 'hostel-bedspace/detail/:id' ,          component: HostelBedspaceDetailComponent,          canActivate: [AuthGuard] },
    { path: 'hostel-bedspace/edit/:id' ,            component: HostelBedspaceEditComponent,            canActivate: [AuthGuard] },

    // Class Room
    { path: 'classroom' ,                     component: ClassroomComponent,            canActivate: [AuthGuard] },
    { path: 'classroom/add',                  component: ClassroomAddComponent,         canActivate: [AuthGuard] },
    { path: 'classroom/detail/:id' ,          component: ClassroomDetailComponent,          canActivate: [AuthGuard] },
    { path: 'classroom/edit/:id' ,            component: ClassroomEditComponent,            canActivate: [AuthGuard] },

    // Office
    { path: 'office' ,                     component: OfficeComponent,                canActivate: [AuthGuard] },
    { path: 'office/add' ,                 component: OfficeAddComponent,             canActivate: [AuthGuard] },
    { path: 'office/detail/:id' ,          component: OfficeDetailComponent,          canActivate: [AuthGuard] },
    { path: 'office/edit/:id' ,            component: OfficeEditComponent,            canActivate: [AuthGuard] },

    // Report
    { path: 'report',                     component: ReportComponent,               canActivate: [AuthGuard] },
    { path: 'report/add',                 component: ReportAddComponent,            canActivate: [AuthGuard] },
    { path: 'report/detail/:id',          component: ReportDetailComponent,         canActivate: [AuthGuard] },
    { path: 'report/edit/:id',            component: ReportEditComponent,           canActivate: [AuthGuard] },

    // Curriculum
    { path: 'curriculum',                     component: CurriculumComponent,               canActivate: [AuthGuard] },
    { path: 'curriculum/add',                 component: CurriculumAddComponent,            canActivate: [AuthGuard] },
    { path: 'curriculum/detail/:id',          component: CurriculumDetailComponent,         canActivate: [AuthGuard] },
    { path: 'curriculum/edit/:id',            component: CurriculumEditComponent,           canActivate: [AuthGuard] },

    // Timetable
    { path: 'timetable',                     component: TimetableComponent,               canActivate: [AuthGuard] },
    { path: 'timetable/add',                 component: TimetableAddComponent,            canActivate: [AuthGuard] },
    { path: 'timetable/detail/:id',          component: TimetableDetailComponent,         canActivate: [AuthGuard] },
    { path: 'timetable/edit/:id',            component: TimetableEditComponent,           canActivate: [AuthGuard] },

    // Assets
    { path: 'asset',                     component: AssetComponent,               canActivate: [AuthGuard] },
    { path: 'asset/add',                 component: AssetAddComponent,            canActivate: [AuthGuard] },
    { path: 'asset/detail/:id',          component: AssetDetailComponent,         canActivate: [AuthGuard] },
    { path: 'asset/edit/:id',            component: AssetEditComponent,           canActivate: [AuthGuard] },

    // Expense
    { path: 'expense',                     component: ExpenseComponent,               canActivate: [AuthGuard] },
    { path: 'expense/add',                 component: ExpenseAddComponent,            canActivate: [AuthGuard] },
    { path: 'expense/detail/:id',          component: ExpenseDetailComponent,         canActivate: [AuthGuard] },
    { path: 'expense/edit/:id',            component: ExpenseEditComponent,           canActivate: [AuthGuard] },

    // Payroll
    { path: 'payroll',                     component: PayrollComponent,               canActivate: [AuthGuard] },
    { path: 'payroll/add',                 component: PayrollAddComponent,            canActivate: [AuthGuard] },
    { path: 'payroll/detail/:id',          component: PayrollDetailComponent,         canActivate: [AuthGuard] },
    { path: 'payroll/edit/:id',            component: PayrollEditComponent,           canActivate: [AuthGuard] },

  ];
