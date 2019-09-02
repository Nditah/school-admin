import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Timetable, ApiResponse, Classe, SelectOption, Course, Classroom } from '../../models';
import { Router } from '@angular/router';
import { NotificationService } from '../../services';
import { Timetables, Classes, Courses, Classrooms } from '../../providers';
import { isEqual } from 'src/app/helpers';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  searchForm: FormGroup;
  record: Timetable;
  currentRecords: Array<Timetable>;
  loading = false;
  activeSidebar = false;
  page_name = 'Timetable';
  addForm: FormGroup;
  classeRecords: Array<Classe>;
  prevClasseRecords: Array<Classe>;
  classeOptions: SelectOption[];
  courseRecords: Array<Course>;
  prevCourseRecords: Array<Course>;
  courseOptions: SelectOption[];
  classroomRecords: Array<Classroom>;
  prevClassroomRecords: Array<Classroom>;
  classroomOptions: SelectOption[];
  sidebarView: string;
  sidebarContent: string;
  sidebarHeading: string;
  currentRecord: Timetable;


  constructor(private router: Router,
              private notify: NotificationService,
              private formBuilder: FormBuilder,
              private timetables: Timetables,
              private classes: Classes,
              private courses: Courses,
              private classrooms: Classrooms) {
                this.currentRecords = this.timetables.query();
                this.classeRecords = this.classes.query();
                this.courseRecords = this.courses.query();
                this.classroomRecords = this.classrooms.query();
                this.searchForm = this.formBuilder.group({
                  searchString: ['', Validators.required],
                });
              }

  ngOnInit() {
    this.createForm();
  }

  ngDoCheck() {
    if (!isEqual(this.courseRecords, this.prevCourseRecords)) {
      this.prevCourseRecords = [...this.courseRecords];
      this.getCourseOptions();
    }

    if (!isEqual(this.classeRecords, this.prevClasseRecords)) {
      this.prevClasseRecords = [...this.classeRecords];
      this.getClasseOptions();
    }

    if (!isEqual(this.classroomRecords, this.prevClassroomRecords)) {
      this.prevClassroomRecords = [...this.classroomRecords];
      this.getClassroomOptions();
    }
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      type: [''],
      activity: [''],
      day: [''],
      from: [''],
      to: [''],
      duration: [''],
      classe: [''],
      course: [''],
      classroom: [''],
      subsidiary: [''],
      description: [''],
    });
  }

  async onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    try {
      const results = await this.timetables.recordCreate(payload);
      if (results.success) {
        this.addForm.reset();
        this.timetables.recordRetrieve().then((data: ApiResponse) => {
          if (data.success) {
            this.currentRecords = data.payload;
          }
        });
        this.notify.showNotification('This timetable has been created successfully', 'success');
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
  openSidebar(activePanel: string, status: string, record: Timetable | null) {
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

  getCourseOptions() {
    this.courseOptions = this.courseRecords.map(options => (
      {
        id: options.id,
        text: options.code
      }
    ));
    console.log(this.courseOptions);
  }

  getClasseOptions() {
    this.classeOptions = this.classeRecords.map(options => (
      {
        id: options.id,
        text: options.code
      }
    ));
    console.log(this.classeOptions);
  }

  getClassroomOptions() {
    this.classroomOptions = this.classroomRecords.map(options => (
      {
        id: options.id,
        text: options.name
      }
    ));
    console.log(this.classroomOptions);
  }

  async returnResponse(event: any) {
    console.log(event);
    this.notify.showNotification(event.message, event.status);
    const results = await this.timetables.recordRetrieve();
    if (results.success) {
      this.currentRecords = results.payload;
    }
  }

}
