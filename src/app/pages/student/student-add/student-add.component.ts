import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { State, SelectOption, County, ApiResponse, Classe, Parent, Hostel } from '../../../models';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services';
import { States, Counties, Students, Classes, Parents, Hostels } from '../../../providers';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {

  page_name = 'Add new Student';
  loading = false;
  addForm: FormGroup;
  stateRecords: Array<State>;
  stateOptions: SelectOption;
  countyRecords: Array<County>;
  countyOptions: SelectOption;
  classeRecords: Array<Classe>;
  classeOptions: SelectOption;
  parentRecords: Array<Parent>;
  parentOptions: SelectOption;
  hostelRecords: Array<Hostel>;
  hostelOptions: SelectOption;

  constructor(private _fb: FormBuilder,
              private router: Router,
              private notify: NotificationService,
              private students: Students,
              private parents: Parents,
              private hostels: Hostels,
              private states: States,
              private counties: Counties,
              private classes: Classes) {
      this.stateRecords = this.states.query();
      this.countyRecords = this.counties.query();
      this.parentRecords = this.parents.query();
      this.hostelRecords = this.hostels.query();
      this.classeRecords = this.classes.query();
    }
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addForm = this._fb.group({
    surname: [''],
    given_name: [''],
    gender: [''],
    birth_date: [''],
    address: [''],
    state: [''],
    county: [''],
    email: [''],
    phone: [''],
    password: [''],
    blood_group: [''],
    classe: [''],
    level: [''],
    subsidiary: [''],
    hostel: [''],
    photo: [''],
    parents: [''],
    });
  }

  getStates() {
    this.states.recordRetrieve().then(data => {
      if (data.success) {
        this.stateOptions = data.payload.map(item => ({id: item.id, text: item.name}));
        console.log('List of states  ================ \n' + JSON.stringify(this.stateOptions) );
      } else {
        console.log(data.message);
        this.notify.showNotification(data.message, 'danger');
      }
    });
  }

  getCounties() {
    this.counties.recordRetrieve().then(data => {
      if (data.success) {
        this.countyOptions = data.payload.map(item => ({id: item.id, text: item.name}));
        console.log('List of counties  ================ \n' + JSON.stringify(this.countyOptions) );
      } else {
        console.log(data.message);
        this.notify.showNotification(data.message, 'danger');
      }
    });
  }

  getClasses() {
    this.classes.recordRetrieve().then(data => {
      if (data.success) {
        this.classeOptions = data.payload.map(item => ({id: item.id, text: item.name}));
        console.log('List of classes  ================ \n' + JSON.stringify(this.classeOptions) );
      } else {
        console.log(data.message);
        this.notify.showNotification(data.message, 'danger');
      }
    });
  }

  getParents() {
    this.parents.recordRetrieve().then(data => {
      if (data.success) {
        this.parentOptions = data.payload.map(item => ({id: item.id, text: item.name}));
        console.log('List of parents  ================ \n' + JSON.stringify(this.parentOptions) );
      } else {
        console.log(data.message);
        this.notify.showNotification(data.message, 'danger');
      }
    });
  }

  getHostel() {
    this.hostels.recordRetrieve().then(data => {
      if (data.success) {
        this.hostelOptions = data.payload.map(item => ({id: item.id, text: item.block}));
        console.log('List of hostels  ================ \n' + JSON.stringify(this.hostelOptions) );
      } else {
        console.log(data.message);
        this.notify.showNotification(data.message, 'danger');
      }
    });
  }

  async onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    console.log(payload);
    if (this.addForm.invalid) {
      this.notify.showNotification('Invalid form! Please fill all the required* inputs.', 'warning');
      console.log('Invalid form! Please fill all the required* inputs.');
      this.notify.showNotification('Invalid form! Please fill all the required* inputs.', 'danger');
      this.loading = false;
      return;
    }
    try {
      console.log(payload);
      this.students.recordCreate(payload).then((res: ApiResponse) => {
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
    this.router.navigate([`student/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }


}
