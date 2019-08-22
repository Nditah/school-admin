import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admissions } from '../../../providers';
import {ApiResponse, SelectOption, Admission, Course, Staff } from '../../../models';

@Component({
  selector: 'app-admission-add',
  templateUrl: './admission-add.component.html',
  styleUrls: ['./admission-add.component.scss']
})
export class AdmissionAddComponent implements OnInit {

  addForm: FormGroup;
  loading = false;

  constructor(
          private formBuilder: FormBuilder,
          private router: Router,
          public admissions: Admissions,
          private toastr: ToastrService
        ) {
            this.addForm = this.formBuilder.group({
              passport: ['', Validators.required],
              surname: ['', Validators.required],
              given_name: [''],
              county_id: ['', Validators.required],
              state_id: [''],
              birth_date: [''],
              religion: [''],
              denomination: [''],
              last_class: ['', Validators.required],
              intending_class: ['', Validators.required],
              last_school: ['', Validators.required],
              father_name: ['', Validators.required],
              mother_name: ['', Validators.required],
              home_address: ['', Validators.required],
              phone: ['', Validators.required],
            });
    }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    if (this.addForm.invalid) {
      this.showNotification('Invalid form! Please fill all the required* inputs.');
      this.loading = false;
      return;
    }
    try {
      payload.is_pmt_client = true;
      payload.password = payload.phone;
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