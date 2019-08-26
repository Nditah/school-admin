import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course, Subject, SelectOption } from '../../../models';
import { deepPropsExist, isEqual } from '../../../helpers';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  @Input() record: Course | null;
  @Input() subjectRecords: Subject[] | null;
  @Input() formType: string;
  prevRecords: Course;
  prevSubjectRecords: Subject[];
  subjectOptions: SelectOption[];
  editForm: FormGroup;
  loading = false;

  constructor(private _fb: FormBuilder,) { }

  ngOnInit() {
    this.updateForm();
  }

  ngDoCheck() {
    if (!isEqual(this.record, this.prevRecords)) {
      this.prevRecords = this.record;
      this.setForm();
    }

    if(!isEqual(this.subjectRecords, this.prevSubjectRecords)) {
      this.prevSubjectRecords =  [...this.subjectRecords];
      this.getSubjectOptions();
    }
  }

  updateForm() {
    this.editForm = this._fb.group({
      title: ['', Validators.required],
      subject: ['', Validators.required],
      type: ['', Validators.required],
      term: ['', Validators.required],
      level: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  setForm() {
    this.editForm.patchValue({
      title: deepPropsExist(this.record, 'title') ? this.record.title : '',
      type: deepPropsExist(this.record, 'type') ? this.record.type : '',
      description: deepPropsExist(this.record, 'description') ? this.record.description : '',
      subject: deepPropsExist(this.record, 'subject', 'id') ? this.record.subject.id : '',
      level: deepPropsExist(this.record, 'level') ? this.record.level : ''
    });
  }

  onSubmit() {

  }

  getSubjectOptions() {
    this.subjectOptions = this.subjectRecords.map(options => ({
      id: options.id,
      text: options.name
    }));
  }

}
