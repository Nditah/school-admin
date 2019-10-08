import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Classe, Staff, SelectOption, Student, ApiResponse, Classroom } from '../../models';
import { Classes, Staffs, Students, Classrooms } from '../../providers';
import { NotificationService } from '../../services';
import { isEqual } from '../../helpers';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {
  searchForm: FormGroup;
  page_name = 'List of Classes';
  currentRecords: Array<Classe>;
  loading = false;
  addForm: FormGroup;
  staffRecords: Array<Staff>;
  prevStaffRecords: Array<Staff>;
  staffOptions: SelectOption[];
  studentRecords: Array<Student>;
  prevStudentRecords: Array<Student>;
  studentOptions: SelectOption[];
  classroomRecords: Array<Classroom>;
  prevClassroomRecords: Array<Classroom>;
  classroomOptions: SelectOption[];
  sidebarView: string;
  sidebarContent: string;
  activeSidebar = false;
  sidebarHeading: string;
  currentRecord: Classe;

  constructor(private classes: Classes,
              private notify: NotificationService,
              private _fb: FormBuilder,
              private staffs: Staffs,
              private students: Students,
              private classroooms: Classrooms) {
                this.currentRecords = this.classes.query();
                this.staffRecords = this.staffs.query();
                this.studentRecords = this.students.query();
                this.classroomRecords = this.classroooms.query();
              }

  ngOnInit() {
    this.createForm();
  }

  ngDoCheck() {
    if (!isEqual(this.staffRecords, this.prevStaffRecords)) {
      this.prevStaffRecords = [...this.staffRecords];
      this.getStaffOptions();
    }

    if (!isEqual(this.studentRecords, this.prevStudentRecords)) {
      this.prevStudentRecords = [...this.studentRecords];
      this.getStudentOptions();
    }

    if (!isEqual(this.classroomRecords, this.prevClassroomRecords)) {
      this.prevClassroomRecords = [...this.classroomRecords];
      this.getClassrooms();
    }
  }

  createForm() {
    this.addForm = this._fb.group({
      name: [''],
      subsidiary: [''],
      level: [''],
      master: [''],
      prefect: [''],
      classroom: [''],
      category: [''],
    });
  }

  async onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;

    // const codeSub = payload.subsidiary.substring(0, 3).toUpperCase();
    // const codeLevel = payload.level;
    // const codeName = payload.name;
    // payload.code = codeSub + codeLevel + codeName;

    let codeSub;
    if(payload.subsidiary == 'SECONDARY' && payload.level <= 3) {
      codeSub = 'JSS';
    } else if(payload.subsidiary == 'SECONDARY' && payload.level > 3) {
      codeSub = 'SS';
    } else {
      console.log('invalid codeSub');
    }

    let codeLevel = payload.level;
    if(payload.subsidiary == 'SECONDARY' && payload.level == 4) {
      codeLevel = 1;
    } else if(payload.subsidiary == 'SECONDARY' && payload.level == 5) {
      codeLevel = 2;
    } else if(payload.subsidiary == 'SECONDARY' && payload.level == 6) {
      codeLevel = 3;
    } else {
      console.log('invalid codeLevel');
    }

    const codeName = payload.name;
    payload.code = codeSub + codeLevel + codeName;

    try {
      const results = await this.classes.recordCreate(payload);
      if (results.success) {
        this.addForm.reset();
        this.classes.recordRetrieve().then((data: ApiResponse) => {
          if (data.success) {
            this.currentRecords = data.payload;
          }
        });
        this.notify.showNotification('This class has been created with class code ' + payload.code, 'success');
      } else {
        this.notify.showNotification(results.message, 'danger');
      }
    } catch (error) {
      this.notify.showNotification(error, 'danger');
    } finally {
      this.loading = false;
    }
  }

  /**
   *
   * @param activePanel page to switch to in sidebar
   * @param status if active panel is form choose if you're adding or editing else add view
   * @param record the record to be editted or view
   */
  openSidebar(activePanel: string, status: string, record: Classe | null) {
    this.sidebarView = activePanel;
    this.sidebarContent = status;
    this.activeSidebar = true;
    this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Class`;
    this.currentRecord = record;
    console.log(this.currentRecord);
  }

  /**
   * @description "Handle close right sidebar"
   */
  closeSidebar($event) {
    this.activeSidebar = $event;
  }

  getStaffOptions() {
    this.staffOptions = this.staffRecords.map(options => (
      {
        id: options.id,
        text: `${options.surname} ${options.given_name}`
      }
    ));
    console.log(this.staffOptions);
  }

  getStudentOptions() {
    this.studentOptions = this.studentRecords.map(options => (
      {
        id: options.id,
        text: `${options.surname} ${options.given_name}`
      }
    ));
    console.log(this.studentOptions);
  }

  getClassrooms() {
    this.classroomOptions = this.classroomRecords.map(options => (
      {
        id: options.id,
        text: `${options.name} ${options.block}`
      }
    ));
    console.log(this.classroomOptions);
  }

  async returnResponse(event: any) {
    console.log(event);
    this.notify.showNotification(event.message, event.status);
    const results = await this.classes.recordRetrieve();
    if (results.success) {
      this.currentRecords = results.payload;
    }
  }

}
