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

  async onSubmit() {
    const payload = this.addForm.value;
    let codeName;
    if (payload.name.split(' ').length > 1) {
      const splitted = payload.title.split(' ');
      codeName = splitted[0].substring(0, 2).toUpperCase() + splitted[1].substring(0, 2).toUpperCase();
    } else {
      codeName = payload.title.length > 7 ? payload.title.substring(0, 4).toUpperCase() : payload.title.substring(0, 3).toUpperCase();
    }
    // const codeSubsidiary = payload.subsidiary.substring(0, 3).toUpperCase();
    payload.code = codeName + payload.level;
    console.log(payload);
    try {
      const result = await this.courses.recordCreate(payload);
      if (result.success) {
        this.notify.showNotification('This course has been created', 'success');
      } else {
        this.notify.showNotification(result.message, 'danger');
      }
    } catch ( error ) {
      this.notify.showNotification(error, 'danger');
    }
  }

}
