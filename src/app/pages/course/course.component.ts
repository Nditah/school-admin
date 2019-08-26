import { Component, OnInit } from '@angular/core';
import { Course, Subject, SelectOption } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Courses, Subjects } from '../../providers';
import { isEqual } from '../../helpers';
import { NotificationService } from '../../services';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  page_name: 'List of Courses';
  currentRecords: Array<Course>;
  prevCurrentRecords: Array<Course>;
  subjectRecords: Array<Subject>;
  prevSubjectRecords: Array<Subject>;
  subjectOptions: SelectOption[];
  currentRecord: Course;
  sidebarHeading: string;
  sidebarContent: string;
  sidebarView: string;
  activeSidebar = false;
  loading = false;
  addForm: FormGroup;

  constructor(private _fb: FormBuilder,
              public courses: Courses,
              public subjects: Subjects,
              public notify: NotificationService,) {
                this.currentRecords = this.courses.query();
                this.subjectRecords = this.subjects.query();
              }

  ngOnInit() {
    this.createForm();
  }

  ngDoCheck() {
    if (!isEqual(this.currentRecords, this.prevCurrentRecords)) {
      this.prevCurrentRecords = [...this.currentRecords];
    }

    if (!isEqual(this.subjectRecords, this.prevSubjectRecords)) {
      this.prevSubjectRecords = [...this.subjectRecords];
      this.getSubjectOptions();
    }
  }

  createForm() {
    this.addForm =  this._fb.group({
      title: ['', Validators.required],
      level: ['', Validators.required],
      term: ['', Validators.required],
      type: [''],
      description: [''],
      subject: ['', Validators.required],
      // category: ['', Validators.required]
    });
  }

  getSubjectOptions() {
    this.subjectOptions = this.subjectRecords.map(options => ({
      id: options.id,
      text: options.name.toUpperCase() + ' ' + options.subsidiary
    }));
  }

  /**
   *
   * @param activePanel page to switch to in sidebar
   * @param status if active panel is form choose if you're adding or editing else add view
   * @param record the record to be editted or view
   */
  openSidebar(activePanel: string, status: string, record: Course | null) {
    this.sidebarView = activePanel;
    this.sidebarContent = status;
    this.activeSidebar = true;
    this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Course`;
    this.currentRecord = record;
    console.log(this.currentRecord);
  }

  /**
   * @description "Handle close right sidebar"
   */
  closeSidebar($event) {
    this.activeSidebar = $event;
  }

  // generateCourseCode(courseTitle = null, courseLevel = null, courseTerm = null) {
  //   console.log(courseTitle);
  //   if (courseTerm === null || courseLevel === null || courseTitle === null) {
  //     this.notify.showNotification('You must fill the course Level, Term and Title for a course code to be generated', 'warning');
  //   }

  //   let codeName;
  //   if (courseTitle.split(' ').length > 1) {
  //     const splitted = courseTitle.split(' ');
  //     codeName = splitted[0].substring(0, 2).toUpperCase() + splitted[1].substring(0, 2).toUpperCase();
  //   } else {
  //     codeName = courseTitle.length > 7 ? courseTitle.substring(0, 4).toUpperCase() : courseTitle.substring(0, 3).toUpperCase();
  //   }
  //   // const codeSubsidiary = payload.subsidiary.substring(0, 3).toUpperCase();
  //   const code = codeName + courseLevel + courseTerm;
  //   this.notify.showNotification('The generated code for this course is ' + code, 'info');
  // }

  async onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    let codeName;
    if (payload.title.split(' ').length > 1) {
      const splitted = payload.title.split(' ');
      codeName = splitted[0].substring(0, 2).toUpperCase() + splitted[1].substring(0, 2).toUpperCase();
    } else {
      codeName = payload.title.length > 7 ? payload.title.substring(0, 4).toUpperCase() : payload.title.substring(0, 3).toUpperCase();
    }
    // const codeSubsidiary = payload.subsidiary.substring(0, 3).toUpperCase();
    payload.code = codeName + payload.level + '0' + payload.term;
    console.log(this.addForm.value.term);
    delete payload.term;
    if (this.addForm.value.term === 1) {
      payload.term = 'FIRST';
    } else if (this.addForm.value.term === 2) {
      payload.term = 'SECOND';
    } else {
      payload.term = 'THIRD';
    }
    payload.coefficient = 1;
    console.log(payload);
    try {
      const result = await this.courses.recordCreate(payload);
      if (result.success) {
        this.notify.showNotification('This course has been created with course code ' + payload.code, 'success');
        const retRecords =  await this.courses.recordRetrieve();
        if (retRecords.success) {
          this.currentRecords = retRecords.payload;
        }
      } else {
        this.notify.showNotification(result.message, 'danger');
      }
    } catch ( error ) {
      this.notify.showNotification(error, 'danger');
    } finally {
      this.loading = false;
    }
  }

}
