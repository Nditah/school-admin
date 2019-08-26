import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectOption, ApiResponse, Fee, County, Hostel } from '../../../models';
import { Fees, Counties, Hostels } from '../../../providers';
import { deepPropsExist } from '../../../helpers';

@Component({
  selector: 'app-hostel-edit',
  templateUrl: './hostel-edit.component.html',
  styleUrls: ['./hostel-edit.component.scss']
})
export class HostelEditComponent implements OnInit {

  page_name = 'Edit Hostel';
  loading = false;
  editForm: FormGroup;
  record: Hostel;
  hostels: Hostels;
  feeRecords: Array<Fee>;
  feeOptions: SelectOption;
  countyRecords: Array<County>;
  countyOptions: SelectOption;
  router: Router;

  constructor(private _fb: FormBuilder,
              private fees: Fees,
              private counties: Counties) {
                this.feeRecords = this.fees.query();
                this.countyRecords = this.counties.query();
              }

  ngOnInit() {
    this.createForm();
    this.setForm();
  }
  createForm() {
    this.editForm = this._fb.group({
      block: [''],
      hall: [''],
      hostel_fees: [''],
      status: [''],
      description: [''],
      hostel_rooms: [''],
      
    });
  }

  setForm() {
    this.editForm.patchValue({
      hall: deepPropsExist(this.record, 'hall') ? this.record.hall : '',
      block: deepPropsExist(this.record, 'block') ? this.record.block : '',
      hostel_fees: deepPropsExist(this.record, 'hostel_fees') ? this.record.hostel_fees : '',
   //   hostel_rooms: deepPropsExist(this.record, 'hostel_rooms') ? this.record.hostel_rooms : '',
      description: deepPropsExist(this.record, 'description') ? this.record.description : '',
      status: deepPropsExist(this.record, 'status') ? this.record.status : '',

    });
  }

  async onSubmit() {
    this.loading = true;
    const payload = this.editForm.value;
    console.log(payload);
    if (this.editForm.invalid) {
      console.log('Invalid form! Please fill all the required* inputs.');
      // this.showNotification('Invalid form! Please fill all the required* inputs.');
      this.loading = false;
      return;
    }
    try {
      console.log(payload);
      this.hostels.recordCreate(payload).then((res: ApiResponse) => {
          console.log(res);
          if (res.success) {
          this.goToDetail(res.payload);
        } else {
          console.log(res.message);
          // this.showNotification(res.message);
        }
      }, (err) => console.log(err.message));
    } catch (error) {
      // this.showNotification(error.message);
    }
    this.loading = false;
    return;
  }

  goToDetail(record: any): void {
    this.router.navigate([`hostel/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
