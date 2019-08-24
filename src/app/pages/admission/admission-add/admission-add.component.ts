import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admissions, Classes, Counties, States } from '../../../providers';
import {ApiResponse, SelectOption, Admission, Course, Staff, County } from '../../../models';

@Component({
  selector: 'app-admission-add',
  templateUrl: './admission-add.component.html',
  styleUrls: ['./admission-add.component.scss']
})
export class AdmissionAddComponent implements OnInit {

  @Input() currentForm: string;
  addForm: FormGroup;
  loading = false;
  classeOptions: Array<SelectOption>;
  stateOptions: Array<SelectOption>;
  countyOptions: Array<SelectOption>;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private admissions: Admissions,
              private classes: Classes,
              private states: States,
              private counties: Counties,
              private toastr: ToastrService,
               ) {
      this.createForm();
      this.getStates();
      this.getCounties();
      this.getClasses();
  }

  ngOnInit() {
  }

  createForm() {
    this.addForm = this.formBuilder.group({
              passport: [''],
              surname: ['', Validators.required],
              given_name: [''],
              county_id: [''],
              state_id: [''],
              birth_date: [''],
              religion: [''],
              denomination: [''],
              last_class: [''],
              intending_class: [''],
              last_school: ['', Validators.required],
              father_name: ['', Validators.required],
              mother_name: ['', Validators.required],
              home_address: ['', Validators.required],
              phone: ['', Validators.required],
    });
  }

  // ====================  All Methods to load external links for Object IDs  ======================= //
  // get admissions for the select box
  getStates() {
    this.admissions.recordRetrieve().then(data => {
      if (data.success) {
        this.stateOptions = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.other_name}));
        console.log('List of admissions  ================ \n' + JSON.stringify(this.stateOptions) );
      } else {
        this.showNotification('Could not retrieve admissions');
        console.log(data.message);
      }
    });
  }

  getCounties() {
    this.admissions.recordRetrieve().then(data => {
      if (data.success) {
        this.countyOptions = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.other_name}));
        console.log('List of admissions  ================ \n' + JSON.stringify(this.countyOptions) );
      } else {
        this.showNotification('Could not retrieve admissions');
        console.log(data.message);
      }
    });
  }

  getClasses() {
    this.classes.recordRetrieve().then(data => {
      if (data.success) {
        this.classeOptions = data.payload.map(item => ({id: item.id, text: item.name}));
        console.log('List of classes  ================ \n' + JSON.stringify(this.classeOptions) );
      } else {
        this.showNotification('Could not retrieve classes');
        console.log(data.message);
      }
    });
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    console.log(payload);
    if (this.addForm.invalid) {
      this.showNotification('Invalid form! Please fill all the required* inputs.');
      this.loading = false;
      return;
    }
    try {
      console.log(payload);
      this.admissions.recordCreate(payload).then((res: ApiResponse) => {
          console.log(res);
        if (res.success) {
          this.goToDetail(res.payload);
        } else {
          this.showNotification(res.message);
        }
      }, (err) => this.showNotification(err.message));
    } catch (error) {
      this.showNotification(error.message);
    }
    this.loading = false;
    return;
  }

  goToDetail(record: any): void {
    this.router.navigate([`admission/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`admission/edit/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

  showNotification(message) {
    this.toastr.show(message, 'Adding Record', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
    }

}
