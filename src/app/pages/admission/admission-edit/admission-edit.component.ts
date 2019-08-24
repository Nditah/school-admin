import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admissions, Classes, Counties, States } from '../../../providers';
import {ApiResponse, SelectOption, Admission, Course, Staff, County } from '../../../models';

@Component({
  selector: 'app-admission-edit',
  templateUrl: './admission-edit.component.html',
  styleUrls: ['./admission-edit.component.scss']
})
export class AdmissionEditComponent implements OnInit {

  @Input() currentForm: string;
  editForm: FormGroup;
  record: Admission;
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

      // get current billing id
                    const id = this.activatedRoute.snapshot.paramMap.get('id');
                    const record = this.admissions.query({id})[0];
                    if (!!record) {
                    this.record = record;
                    } else {
                    this.goBack();
                    }
                    this.createForm();
                    this.setForm();
                    this.getStates();
                    this.getCounties();
                    this.getClasses();
                  }

  ngOnInit() {
  }

  createForm() {
    this.editForm = this.formBuilder.group({
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

  setForm() {
    this.editForm.get('passport').setValue(this.record.passport || '');
    this.editForm.get('surname').setValue(this.record.surname || '');
    this.editForm.get('given_name').setValue(this.record.given_name || '');
    this.editForm.get('county_id').setValue(this.record.county_id || '');
    console.log('Random console' + JSON.stringify(this.record.county_id));
    this.editForm.get('state_id').setValue(this.record.state_id || '');
    this.editForm.get('birth_date').setValue(this.record.birth_date || '');
    this.editForm.get('religion').setValue(this.record.religion || '');
    this.editForm.get('denomination').setValue(this.record.denomination || '');
    this.editForm.get('last_class').setValue(this.record.last_class || '');
    this.editForm.get('intending_class').setValue(this.record.intending_class || '');
    this.editForm.get('last_school').setValue(this.record.last_school || '');
    this.editForm.get('father_name').setValue(this.record.father_name || '');
    this.editForm.get('mother_name').setValue(this.record.mother_name || '');
    this.editForm.get('home_address').setValue(this.record.home_address || '');
    this.editForm.get('phone').setValue(this.record.phone || '');
    }


  // ====================  All Methods to load external links for Object IDs  ======================= //
  // get admissions for the select box
  getStates() {
    this.states.recordRetrieve().then(data => {
      if (data.success) {
        this.stateOptions = data.payload.map(item => ({id: item.id, text: item.name}));
        console.log('List of admissions  ================ \n' + JSON.stringify(this.stateOptions) );
      } else {
        this.showNotification('Could not retrieve admissions');
        console.log(data.message);
      }
    });
  }

  getCounties() {
    this.counties.recordRetrieve().then(data => {
      if (data.success) {
        this.countyOptions = data.payload.map(item => ({id: item.id, text: item.name}));
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
        this.classeOptions = data.payload.map(item => ({id: item.id, text: item.level}));
        console.log('List of classes  ================ \n' + JSON.stringify(this.classeOptions) );
      } else {
        this.showNotification('Could not retrieve classes');
        console.log(data.message);
      }
    });
  }


showNotification(message) {
  this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
  timeOut: 8000,
  closeButton: true,
  enableHtml: true,
  toastClass: 'alert alert-primary alert-with-icon',
  });
  }

  // Navigation
  goToDetail(record: any): void {
  this.router.navigate([`admission/detail/${record.id}`]);
  return;
  }

  goBack() {
  window.history.back();
  }

  onSubmit() {
  return;
  }
  }
