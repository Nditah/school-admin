import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { State, SelectOption, County, Student, ApiResponse } from '../../../models';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services';
import { States, Counties, Students, Parents } from '../../../providers';
import { isEqual } from 'src/app/helpers';

@Component({
  selector: 'app-parent-add',
  templateUrl: './parent-add.component.html',
  styleUrls: ['./parent-add.component.scss']
})
export class ParentAddComponent implements OnInit {

  page_name = 'Add new Parent';
  loading = false;
  addForm: FormGroup;
  stateRecords: Array<State>;
  stateOptions: SelectOption;
  countyRecords: Array<County>;
  countyOptions: SelectOption;
  studentRecords: Array<Student>;
  prevStudentRecords: Array<Student>;
  studentOptions: SelectOption[];

  constructor(private _fb: FormBuilder,
              private router: Router,
              private notify: NotificationService,
              private students: Students,
              private parents: Parents,
              private states: States,
              private counties: Counties) {
      this.stateRecords = this.states.query();
      this.countyRecords = this.counties.query();
      this.studentRecords = this.students.query();
    }


  ngOnInit() {
    this.createForm();
  }

  createForm() {
      this.addForm = this._fb.group({
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
      password: [''],
      profession: [''],
      employment_status: [''],
      students: ['']
    });

  }

  getStates() {
    this.states.recordRetrieve().then(data => {
      if (data.success) {
        this.stateOptions = data.payload.map(item => ({id: item.id, text: item.name}));
        console.log('List of states  ================ \n' + JSON.stringify(this.stateOptions) );
      } else {
        // this.showNotification('Could not retrieve admissions');
        console.log(data.message);
      }
    });
  }

  getCounties() {
    this.counties.recordRetrieve().then(data => {
      if (data.success) {
        this.countyOptions = data.payload.map(item => ({id: item.id, text: item.name}));
        console.log('List of counties  ================ \n' + JSON.stringify(this.countyOptions) );
      } else {
        // this.showNotification('Could not retrieve admissions');
        console.log(data.message);
      }
    });
  }

  ngDoCheck() {
    if (!isEqual(this.studentRecords, this.prevStudentRecords)) {
      this.prevStudentRecords = [...this.studentRecords];
      this.getStudentOptions();
    }
  }

  getStudentOptions() {

        this.studentOptions = this.studentRecords.map(item => (
          {
            id: item.id,
            text: `${item.surname} ${item.given_name}`
          }));
        console.log(this.studentOptions);


  }

  async onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    console.log(payload);
    if (this.addForm.invalid) {
      this.notify.showNotification('Invalid form! Please fill all the required* inputs.', 'warning');
      console.log('Invalid form! Please fill all the required* inputs.');
      // this.showNotification('Invalid form! Please fill all the required* inputs.');
      this.loading = false;
      return;
    }
    try {
      console.log(payload);
      this.parents.recordCreate(payload).then((res: ApiResponse) => {
          console.log(res);
          if (res.success) {
            this.notify.showNotification(res.message, 'success');
            this.goToDetail(res.payload);
        } else {
          console.log(res.message);
          this.notify.showNotification(res.message, 'warning');
        }
      },  (err) => console.log(err.message)
      );
    } catch (error) {
      this.notify.showNotification(error.message, 'danger');
    }
    this.loading = false;
    return;
  }

  goToDetail(record: any): void {
    this.router.navigate([`parent/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
