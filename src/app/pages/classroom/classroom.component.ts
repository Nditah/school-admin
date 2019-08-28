import { Component, OnInit } from '@angular/core';
import { Classroom, Classe, SelectOption, ApiResponse } from '../../models';
import { Classrooms, Classes } from '../../providers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { isEqual } from 'src/app/helpers';
import { NotificationService } from '../../services';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {
  searchForm: FormGroup;
  page_name = 'List of Classrooms';
  currentRecords: Array<Classroom>;
  loading: false;
  addForm: FormGroup;
  classeRecords: Array<Classe>;
  prevClasseRecords: Array<Classe>;
  classeOptions: SelectOption[];
  sidebarView: string;
  sidebarContent: string;
  activeSidebar = false;
  sidebarHeading: string;
  currentRecord: Classroom;

  constructor(public classrooms: Classrooms,
              private notify: NotificationService,
              private _fb: FormBuilder,
              private classes: Classes) {
                this.currentRecords = this.classrooms.query();
                this.classeRecords = this.classes.query();
               }

  ngOnInit() {
    this.createForm();
  }

  ngDoCheck() {
    if (!isEqual(this.classeRecords, this.prevClasseRecords)) {
      this.prevClasseRecords = [...this.classeRecords];
      this.getClasseOptions();
    }
  }

  createForm() {
    this.addForm = this._fb.group({
      name: ['', Validators.required],
      block: ['', Validators.required],
      level: ['', Validators.required],
      classe: [''],
      subsidiary: ['', Validators.required]
    });
  }

  async onSubmit() {
    const payload = this.addForm.value;
    let codeName;
    if (payload.name.split(' ').length > 1) {
      const splitted = payload.name.split(' ');
      codeName = splitted[0].substring(0, 2).toUpperCase() + splitted[1].substring(0, 2).toUpperCase();
    } else {
      codeName = payload.name.length > 7 ? payload.name.substring(0, 4).toUpperCase() : payload.name.substring(0, 3).toUpperCase();
    }
    const codeSubsidiary = payload.subsidiary.substring(0, 3).toUpperCase();
    payload.code = codeName + codeSubsidiary;
    console.log(payload);
    try {
      const results = await this.classrooms.recordCreate(payload);
      if (results.success) {
        this.addForm.reset();
        this.classrooms.recordRetrieve().then((data: ApiResponse) => {
          if (data.success) {
            this.currentRecords = data.payload;
          }
        });
        // this.currentRecords = this.classrooms.query();
        this.notify.showNotification('This classroom has been added', 'success');
      } else {
        this.notify.showNotification(results.message, 'danger');
      }
    } catch (error) {
      this.notify.showNotification(error, 'danger');
    }
  }

  /**
   *
   * @param activePanel page to switch to in sidebar
   * @param status if active panel is form choose if you're adding or editing else add view
   * @param record the record to be editted or view
   */
  openSidebar(activePanel: string, status: string, record: Classroom | null) {
    this.sidebarView = activePanel;
    this.sidebarContent = status;
    this.activeSidebar = true;
    this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Classroom`;
    this.currentRecord = record;
    console.log(this.currentRecord);
  }

  /**
   * @description "Handle close right sidebar"
   */
  closeSidebar($event) {
    this.activeSidebar = $event;
  }

  onChange(event: any, name: string) {
    let codeName;
    if (name.split(' ').length > 1) {
      const splitted = name.split(' ');
      codeName = splitted[0].substring(0, 2).toUpperCase() + splitted[1].substring(0, 2).toUpperCase();
    } else {
      codeName = name.length > 7 ? name.substring(0, 4).toUpperCase() : name.substring(0, 3).toUpperCase();
    }
    const codeSubsidiary = event.target.value.substring(0, 3);
    const code = codeName + codeSubsidiary;
    console.log('?code=' + code);
    this.classrooms.recordRetrieve('?code=' + code).then((data: ApiResponse) => {
      if (data.success) {
        if (data.payload.length > 0) {
          // tslint:disable-next-line: max-line-length
          this.notify.showNotification('A course with the code ' + code + ' already exist you may change the course name to resolve this conflict', 'info');
        } else {
          this.notify.showNotification('The generated course code is ' + code , 'success');
        }
      }
    });
  }

  getClasseOptions() {
    this.classeOptions = this.classeRecords.map(options => (
      {
        id: options.id,
        text: `${options.form_teacher} ${options.level}`
      }
    ));
    console.log(this.classeOptions);
  }

  async returnResponse(event: any) {
    console.log(event);
    this.notify.showNotification(event.message, event.status);
    const results = await this.classrooms.recordRetrieve();
    if (results.success) {
      this.currentRecords = results.payload;
    }
  }
}
