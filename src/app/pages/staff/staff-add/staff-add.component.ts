import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { States, Counties, Staffs, Offices } from '../../../providers';
import { State, County, ApiResponse, Office } from '../../../models';
import { SelectOption } from 'src/app/models';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services';
import { isEqual } from '../../../helpers';

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss']
})
export class StaffAddComponent implements OnInit {

  page_name = 'Add new Staff';
  loading = false;
  addForm: FormGroup;
  stateRecords: Array<State>;
  stateOptions: SelectOption[];
  countyRecords: Array<County>;
  countyOptions: SelectOption[];
  officeRecords: Array<Office>;
  prevOfficeRecords: Array<Office>;
  officeOptions: SelectOption[];

  constructor(private _fb: FormBuilder,
              private router: Router,
              private notify: NotificationService,
              private staffs: Staffs,
              private states: States,
              private counties: Counties,
              private offices: Offices) {
                this.stateRecords = this.states.query();
                this.countyRecords = this.counties.query();
                this.officeRecords = this.offices.query();
              }

  ngOnInit() {
    this.updateForm();
  }

  updateForm() {
    this.addForm = this._fb.group({
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
        console.log(data.message);
      }
    });
  }

  ngDoCheck() {
    if (!isEqual(this.officeRecords, this.prevOfficeRecords)) {
      this.prevOfficeRecords = [...this.officeRecords];
      this.getOfficeOptions();
    }
  }

  getOfficeOptions() {
    this.officeOptions = this.officeRecords.map(options => (
      {
        id: options.id,
        text: options.name
      }
    ));
    console.log(this.officeOptions);
  }

  async onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    console.log(payload);
    if (this.addForm.invalid) {
      console.log('Invalid form! Please fill all the required * inputs.');
      this.notify.showNotification('Invalid form! Please fill all the required * inputs', 'warning');
      this.loading = false;
      return;
    }
    try {
      console.log(payload);
      this.staffs.recordCreate(payload).then((res: ApiResponse) => {
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
    this.router.navigate([`staff/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
