import { Component, OnInit } from '@angular/core';
import { Staff } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {

  records: Array<Staff>;
  record: Staff;
  response: any;
  success = false;
  message = '';

      title: '';
      surname: '';
      given_name: '';
      gender: '';
      birth_date: '';
      marital_status: '';
      phone: '';
      phone_personal: '';
      address: '';
      state: '';
      county: '';
      email: '';
      staff_type: '';
      classe: '';
      subject: '';
      password: '';
      kin: '';
      kin_phone: '';
      kin_address: '';
      guarantor1: '';
      guarantor1_phone: '';
      guarantor1_address: '';
      guarantor2: '';
      guarantor2_phone: '';
      guarantor2_address: '';
      profession: '';
      qualification: '';
      employment_status: '';
      tax: '';
      basic_salary: '';
      bonus: '';
      entertainment_allowance: '';
      house_allowance: '';
      lunch_allowance: '';
      medical_allowance: '';
      transport_allowance: '';
      utility_allowance: '';
      welfare_allowance: '';
      pension: '';
      bank_name: '';
      bank_account_number: '';
      bank_account_name: '';
      rank: '';
      office: '';
      role: '';
      subsidiary: '';
      remark: '';
      photo: '';
      is_salary_payable: '';
      is_document_complete: '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  goToEdit(record: any): void {
    this.router.navigate([`staff/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }




  // this.id = this.user.id || '';
  //   this.serial = this.user.serial;
  //   this.driver_type = this.user.driver_type || '';
  //   this.driver_licence = this.user.driver_licence || '';
  //   this.surname = this.user.surname || '';
  //   this.other_name = this.user.other_name || '';
  //   this.gender = this.user.gender || '';
  //   this.birth_date = this.user.birth_date || '';
  //   this.marital_status = this.user.marital_status || '';

}
