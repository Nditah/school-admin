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
import { FeesPaymentComponent } from 'src/app/pages/fees-payment/fees-payment.component';
import { FeesTypeComponent } from 'src/app/pages/fees-type/fees-type.component';
import { AttendanceComponent } from 'src/app/pages/attendance/attendance.component';


export const AdminLayoutRoutes: Routes = [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',                    component: DashboardComponent,              canActivate: [AuthGuard] },

    { path: 'example' ,                     component: ExampleComponent,                canActivate: [AuthGuard] },
    { path: 'example/add' ,                 component: ExampleAddComponent,             canActivate: [AuthGuard] },
    { path: 'example/detail/:id' ,          component: ExampleDetailComponent,          canActivate: [AuthGuard] },
    { path: 'example/edit/:id' ,            component: ExamplEditComponent,             canActivate: [AuthGuard] },

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


    { path: 'admission' ,                   component: AdmissionComponent,              canActivate: [AuthGuard] },
// Fees Payment
{ path: 'feespayment' ,                       component: FeesPaymentComponent,                  canActivate: [AuthGuard] },
 // Fees Type
{ path: 'feestype' ,                          component: FeesTypeComponent,                  canActivate: [AuthGuard] },
// Attendance
{ path: 'attendance' ,                          component: AttendanceComponent,                  canActivate: [AuthGuard] },
   
  ];
