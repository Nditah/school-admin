import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectOption, ApiResponse, State, County, Staff } from '../../../models';
import { States, Counties } from 'src/app/providers';
import { deepPropsExist } from 'src/app/helpers';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent implements OnInit {

  page_name = 'Edit Staff';
  loading = false;
  editForm: FormGroup;
  record: Staff;
  stateRecords: Array<State>;
  stateOptions: SelectOption;
  countyRecords: Array<County>;
  countyOptions: SelectOption;

  constructor(private _fb: FormBuilder,
              private states: States,
              private counties: Counties) {
                this.stateRecords = this.states.query();
                this.countyRecords = this.counties.query();
              }

  ngOnInit() {
    this.createForm();

  }
  createForm() {
    this.editForm = this._fb.group({
      title: [''],
      surname: [''],
      given_name: [''],
      gender: [''],
      birth_date: [''],
      marital_status: [''],
      phone: [''],
      phone_personal: [''],
      address: [''],
      state: [''],
      county: [''],
      email: [''],
      staff_type: [''],
      classe: [''],
      subject: [''],
      password: [''],
      kin: [''],
      kin_phone: [''],
      kin_address: [''],
      guarantor1: [''],
      guarantor1_phone: [''],
      guarantor1_address: [''],
      guarantor2: [''],
      guarantor2_phone: [''],
      guarantor2_address: [''],
      profession: [''],
      qualification: [''],
      employment_status: [''],
      tax: [''],
      basic_salary: [''],
      bonus: [''],
      entertainment_allowance: [''],
      house_allowance: [''],
      lunch_allowance: [''],
      medical_allowance: [''],
      transport_allowance: [''],
      utility_allowance: [''],
      welfare_allowance: [''],
      pension: [''],
      bank_name: [''],
      bank_account_number: [''],
      bank_account_name: [''],
      rank: [''],
      office: [''],
      role: [''],
      subsidiary: [''],
      remark: [''],
      photo: [''],
      is_salary_payable: [''],
      is_document_complete: ['']
    });
  }

  setForm() {
    this.editForm.patchValue({
      title: deepPropsExist(this.record, 'title') ? this.record.title : '',
    });
  }

}
