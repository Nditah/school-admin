import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { State, SelectOption, County, Classe, Parent, Hostel, Student } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services';
import { Students, Parents, Hostels, States, Counties, Classes } from 'src/app/providers';
import { deepPropsExist } from 'src/app/helpers';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

  page_name = 'Edit Student';
  loading = false;
  editForm: FormGroup;
  record: Student;
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
              private activatedRoute: ActivatedRoute,
              private students: Students,
              private parents: Parents,
              private hostels: Hostels,
              private states: States,
              private counties: Counties,
              private classes: Classes) {
                const id = this.activatedRoute.snapshot.paramMap.get('id');
                const record = this.students.query({id})[0];
                if (!!record) {
                  this.record = record;
                } else {
                  this.goBack();
                }
                this.stateRecords = this.states.query();
                this.countyRecords = this.counties.query();
                this.classeRecords = this.classes.query();
                this.parentRecords = this.parents.query();
                this.hostelRecords = this.hostels.query();
              }

  ngOnInit() {
    this.updateForm();
    this.setForm();
  }

  updateForm() {
    this.editForm = this._fb.group({
    surname: [''],
    given_name: [''],
    gender: [''],
    birth_date: [''],
    address: [''],
    state: [''],
    county: [''],
    email: [''],
    phone: [''],
    blood_group: [''],
    classe: [''],
    level: [''],
    subsidiary: [''],
    hostel: [''],
    photo: [''],
    parents: [''],
    });
  }

  setForm() {
    this.editForm.patchValue({
      surname: deepPropsExist(this.record, 'surname') ? this.record.surname : '',
      given_name: deepPropsExist(this.record, 'given_name') ? this.record.given_name : '',
      gender: deepPropsExist(this.record, 'gender') ? this.record.gender : '',
      birth_date: deepPropsExist(this.record, 'birth_date') ? this.record.birth_date : '',
      phone: deepPropsExist(this.record, 'phone') ? this.record.phone : '',
      address: deepPropsExist(this.record, 'address') ? this.record.address : '',
      state: deepPropsExist(this.record, 'state') ? this.record.state : '',
      county: deepPropsExist(this.record, 'county') ? this.record.county : '',
      email: deepPropsExist(this.record, 'email') ? this.record.email : '',
      blood_group: deepPropsExist(this.record, 'blood_group') ? this.record.blood_group : '',
      classe: deepPropsExist(this.record, 'classe') ? this.record.classe : '',
      level: deepPropsExist(this.record, 'level') ? this.record.level : '',
      subsidiary: deepPropsExist(this.record, 'subsidiary') ? this.record.subsidiary : '',
      hostel: deepPropsExist(this.record, 'hostel') ? this.record.hostel : '',
      photo: deepPropsExist(this.record, 'photo') ? this.record.photo : '',
      parents: deepPropsExist(this.record, 'parents') ? this.record.parents : '',
    });
  }

  async onSubmit() {
    const payload  = this.editForm.value;
    try {
      const result = await this.students.recordUpdate(this.record, payload);
      if (result.success) {
        this.notify.showNotification('This student has been updated', 'success');
        this.goToDetail(result.payload);
      } else {
        this.notify.showNotification(result.message, 'danger');
      }
    } catch (error) {
      this.notify.showNotification(error, 'danger');
    }
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

  goToDetail(record) {
    this.router.navigate([`student/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
