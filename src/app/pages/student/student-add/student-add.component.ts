import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { State, SelectOption, County, ApiResponse, Classe, Parent, Hostel } from '../../../models';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services';
import { States, Counties, Students, Classes, Parents, Hostels } from '../../../providers';
import { isEqual } from 'src/app/helpers';

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
  stateOptions: SelectOption[];
  countyRecords: Array<County>;
  countyOptions: SelectOption[];
  classeRecords: Array<Classe>;
  prevClasseRecords: Array<Classe>;
  classeOptions: SelectOption[];
  parentRecords: Array<Parent>;
  prevParentRecords: Array<Parent>;
  parentOptions: SelectOption[];
  hostelRecords: Array<Hostel>;
  prevHostelRecords: Array<Hostel>;
  hostelOptions: SelectOption[];

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
    classe: [''],
    level: [''],
    subsidiary: [''],
    hostel: [''],
    photo: [''],
    parents: [''],
    admission_year: [''],
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

  ngDoCheck() {
    if (!isEqual(this.classeRecords, this.prevClasseRecords)) {
      this.prevClasseRecords = [...this.classeRecords];
      this.getClasses();
    }
    if (!isEqual(this.parentRecords, this.prevParentRecords)) {
      this.prevParentRecords = [...this.parentRecords];
      this.getParents();
    }
    if (!isEqual(this.hostelRecords, this.prevHostelRecords)) {
      this.prevHostelRecords = [...this.hostelRecords];
      this.getHostels();
    }
  }

  getClasses() {
    this.classeOptions = this.classeRecords.map(options => (
      {
        id: options.id,
        text: options.code
      }
    ));
    console.log(this.classeOptions);
  }

  getParents() {
    this.parentOptions = this.parentRecords.map(options => (
      {
        id: options.id,
        text: `${options.given_name} ${options.surname}`
      }
    ));
    console.log(this.parentOptions);
  }

  getHostels() {
    this.hostelOptions = this.hostelRecords.map(options => (
      {
        id: options.id,
        text: options.block
      }
    ));
    console.log(this.hostelOptions);
  }

  async onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;

    // const year = payload.admission_year.getFullYear().toString().substr(-2);
    // const sub = payload.subsidiary.substr(0, 3).toUpperCase();
    // const sn = payload.serial;

    // payload.reg_no = 'RAFS/' + year + '/' + sub + '/' + sn;


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
