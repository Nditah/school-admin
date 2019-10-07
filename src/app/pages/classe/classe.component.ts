import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Classe, Staff, SelectOption, Student, ApiResponse } from '../../models';
import { Classes, Staffs, Students } from '../../providers';
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
  sidebarView: string;
  sidebarContent: string;
  activeSidebar = false;
  sidebarHeading: string;
  currentRecord: Classe;

  constructor(private classes: Classes,
              private notify: NotificationService,
              private _fb: FormBuilder,
              private staffs: Staffs,
              private students: Students) {
                this.currentRecords = this.classes.query();
                this.staffRecords = this.staffs.query();
                this.studentRecords = this.students.query();
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
    // let codeName;
    // if (payload.name.split(' ').length > 1) {
    //   const splitted = payload.name.split(' ');
    //   codeName = splitted[0].substring(0, 2).toUpperCase() + splitted[1].substring(0, 2).toUpperCase();
    // } else {
    //   codeName = payload.name.length > 7 ? payload.name.substring(0, 4).toUpperCase() : payload.name.substring(0, 3).toUpperCase();
    // }
    // const codeSubsidiary = payload.subsidiary.substring(0, 3).toUpperCase();
    // payload.code = codeName + codeSubsidiary;
    // console.log(payload);

    let codeName;
    // let codeSubNew;
    // let codeLevelNew;
    const codeSub = payload.subsidiary.substring(0, 3).toUpperCase();
    const codeLevel = payload.level;
    codeName = payload.name;
    // if (codeSub === 'SECONDARY' && codeLevel <= 3) {
    //     codeSubNew = 'JSS';
    //   }
        // switch (codeLevel) {
        //   case 4:
        //   codeLevelNew = 1;
        //   break;
        //   case 5:
        //   codeLevelNew = 2;
        //   break;
        //   case 6:
        //   codeLevelNew = 3;
        //   break;
        //   default:
        //   // codeLevelNew = codeLevel;
        //   break;
        // }
        // return codeLevelNew;


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

  async returnResponse(event: any) {
    console.log(event);
    this.notify.showNotification(event.message, event.status);
    const results = await this.classes.recordRetrieve();
    if (results.success) {
      this.currentRecords = results.payload;
    }
  }

}
