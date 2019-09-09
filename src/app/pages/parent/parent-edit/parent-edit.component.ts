import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Parent, State, SelectOption, County, Office, Student } from 'src/app/models';
import { NotificationService } from 'src/app/services';
import { States, Counties, Parents, Students } from 'src/app/providers';
import { ActivatedRoute, Router } from '@angular/router';
import { deepPropsExist, isEqual } from 'src/app/helpers';

@Component({
  selector: 'app-parent-edit',
  templateUrl: './parent-edit.component.html',
  styleUrls: ['./parent-edit.component.scss']
})
export class ParentEditComponent implements OnInit {

  @Input() currentForm: string;
  @Output() returnResponse: EventEmitter<any> = new EventEmitter();
  page_name = 'Edit Parent';
  loading = false;
  editForm: FormGroup;
  record: Parent;
  stateRecords: Array<State>;
  stateOptions: SelectOption[];
  countyRecords: Array<County>;
  countyOptions: SelectOption;
  studentRecords: Array<Student>;
  prevStudentRecords: Array<Student>;
  studentOptions: SelectOption[];

  constructor(private _fb: FormBuilder,
              private notify: NotificationService,
              private states: States,
              private activatedRoute: ActivatedRoute,
              private counties: Counties,
              private parents: Parents,
              private router: Router,
              private students: Students) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.parents.query({id})[0];
      if (!!record) {
        this.record = record;
      } else {
        this.goBack();
      }
      this.stateRecords = this.states.query();
      this.countyRecords = this.counties.query();
      this.studentRecords = this.students.query();
    }

  ngOnInit() {
    this.updateForm();
  }

  updateForm() {
    this.editForm = this._fb.group({
    title: [''],
    surname: [''],
    given_name: [''],
    gender: [''],
    marital_status: [''],
    address: [''],
    state: [''],
    county: [''],
    email: [''],
    phone: [''],
    profession: [''],
    employment_status: [''],
    students: ['']
  });
}

setForm() {
  this.editForm.patchValue({
    title: deepPropsExist(this.record, 'title') ? this.record.title : '',
    surname: deepPropsExist(this.record, 'surname') ? this.record.surname : '',
    given_name: deepPropsExist(this.record, 'given_name') ? this.record.given_name : '',
    gender: deepPropsExist(this.record, 'gender') ? this.record.gender : '',
    marital_status: deepPropsExist(this.record, 'marital_status') ? this.record.marital_status : '',
    phone: deepPropsExist(this.record, 'phone') ? this.record.phone : '',
    address: deepPropsExist(this.record, 'address') ? this.record.address : '',
    state: deepPropsExist(this.record, 'state') ? this.record.state : '',
    county: deepPropsExist(this.record, 'county') ? this.record.county : '',
    email: deepPropsExist(this.record, 'email') ? this.record.email : '',
    employment_status: deepPropsExist(this.record, 'employment_status') ? this.record.employment_status : '',
    profession: deepPropsExist(this.record, 'profession') ? this.record.profession : '',
    students: deepPropsExist(this.record, 'students') ? this.record.students : '',
  });
}

async onSubmit() {
  const payload  = this.editForm.value;
  try {
    const result = await this.parents.recordUpdate(this.record, payload);
    if (result.success) {
      this.notify.showNotification('This parent has been updated', 'success');
      this.goToDetail(result.payload);
    } else {
      this.notify.showNotification(result.message, 'danger');
    }
  } catch (error) {
    this.notify.showNotification(error, 'danger');
  }
}

ngDoCheck() {
  if (!isEqual(this.studentRecords, this.prevStudentRecords)) {
    this.prevStudentRecords = [...this.studentRecords];
    this.getStudentOptions();
  }
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

goToDetail(record) {
  this.router.navigate([`parent/detail/${record.id}`]);
  return;
}

goBack() {
  window.history.back();
}


}
