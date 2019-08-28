import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectOption, ApiResponse, State, County, Staff } from '../../../models';
import { States, Counties, Staffs } from '../../../providers';
import { deepPropsExist } from '../../../helpers';
import { NotificationService } from '../../../services';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent implements OnInit {

  @Input() currentForm: string;
  @Output() returnResponse: EventEmitter<any> = new EventEmitter();
  page_name = 'Edit Staff';
  loading = false;
  editForm: FormGroup;
  record: Staff;
  stateRecords: Array<State>;
  stateOptions: SelectOption;
  countyRecords: Array<County>;
  countyOptions: SelectOption;
  router: Router;

  constructor(private _fb: FormBuilder,
              private notify: NotificationService,
              private states: States,
              private activatedRoute: ActivatedRoute,
              private counties: Counties,
              private staffs: Staffs) {
                const id = this.activatedRoute.snapshot.paramMap.get('id');
                const record = this.staffs.query({id})[0];
                if (!!record) {
                  this.record = record;
                } else {
                  this.goBack();
                }
                this.stateRecords = this.states.query();
                this.countyRecords = this.counties.query();
              }

  ngOnInit() {
    this.createForm();
    this.setForm();
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
      surname: deepPropsExist(this.record, 'surname') ? this.record.surname : '',
      given_name: deepPropsExist(this.record, 'given_name') ? this.record.given_name : '',
      gender: deepPropsExist(this.record, 'gender') ? this.record.gender : '',
      birth_date: deepPropsExist(this.record, 'birth_date') ? this.record.birth_date : '',
      marital_status: deepPropsExist(this.record, 'marital_status') ? this.record.marital_status : '',
      phone: deepPropsExist(this.record, 'phone') ? this.record.phone : '',
      phone_personal: deepPropsExist(this.record, 'phone_personal') ? this.record.phone_personal : '',
      address: deepPropsExist(this.record, 'address') ? this.record.address : '',
      state: deepPropsExist(this.record, 'state') ? this.record.state : '',
      county: deepPropsExist(this.record, 'county') ? this.record.county : '',
      email: deepPropsExist(this.record, 'email') ? this.record.email : '',
      staff_type: deepPropsExist(this.record, 'staff_type') ? this.record.staff_type : '',
      classe: deepPropsExist(this.record, 'classe') ? this.record.classe : '',
      subject: deepPropsExist(this.record, 'subject') ? this.record.subject : '',
      password: deepPropsExist(this.record, 'password') ? this.record.password : '',
      kin: deepPropsExist(this.record, 'kin') ? this.record.kin : '',
      kin_phone: deepPropsExist(this.record, 'kin_phone') ? this.record.kin_phone : '',
      kin_address: deepPropsExist(this.record, 'kin_address') ? this.record.kin_address : '',
      guarantor1: deepPropsExist(this.record, 'guarantor1') ? this.record.guarantor1 : '',
      guarantor1_phone: deepPropsExist(this.record, 'guarantor1_phone') ? this.record.guarantor1_phone : '',
      guarantor1_address: deepPropsExist(this.record, 'guarantor1_address') ? this.record.guarantor1_address : '',
      qualification: deepPropsExist(this.record, 'qualification') ? this.record.qualification : '',
      employment_status: deepPropsExist(this.record, 'employment_status') ? this.record.employment_status : '',
      basic_salary: deepPropsExist(this.record, 'basic_salary') ? this.record.basic_salary : '',
      office: deepPropsExist(this.record, 'office') ? this.record.office : '',
      subsidiary: deepPropsExist(this.record, 'subsidiary') ? this.record.subsidiary : '',
      photo: deepPropsExist(this.record, 'photo') ? this.record.photo : ''
    });
  }

  // async onSubmit() {
  //   this.loading = true;
  //   const payload = this.editForm.value;
  //   console.log(payload);
  //   if (this.editForm.invalid) {
  //     console.log('Invalid form! Please fill all the required* inputs.');
  //     this.notify.showNotification('Invalid form! Please fill all the required* inputs.');
  //     this.loading = false;
  //     return;
  //   }
  //   try {
  //     console.log(payload);
  //     this.staffs.recordUpdate(this.record, payload).then((res: ApiResponse) => {
  //         console.log(res);
  //         if (res.success) {
  //         this.goToDetail(res.payload);
  //       } else {
  //         console.log(res.message);
  //         this.notify.showNotification(res.message);
  //       }
  //     }, (err) => console.log(err.message));
  //   } catch (error) {
  //     this.notify.showNotification(error.message, 'danger');
  //   }
  //   this.loading = false;
  //   return;
  // }

  async onSubmit() {
    const payload  = this.editForm.value;
    try {
      const result = await this.staffs.recordUpdate(this.record, payload);
      if (result.success) {
        this.returnResponse.emit({message: 'Record successfully updated', status: 'success'});
        // this.notify.showNotification('This subject has been updated', 'success');
      } else {
        this.returnResponse.emit({message: result.message, status: 'danger'});
        this.goToDetail(result.payload);
        // this.notify.showNotification(result.message, 'danger');
      }
    } catch (error) {
      this.returnResponse.emit({message: error, status: 'danger'});
      // this.notify.showNotification(error, 'danger');
    }
  }

  goToDetail(record: any): void {
    this.router.navigate([`staff/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
