import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectOption, ApiResponse, FeesPayment, Hostel, HostelRoom, HostelBedspace } from '../../../models';
import { FeesPayments, Hostels, HostelRooms, HostelBedspaces } from '../../../providers';
import { deepPropsExist } from '../../../helpers';

@Component({
  selector: 'app-hostel-room-edit',
  templateUrl: './hostel-room-edit.component.html',
  styleUrls: ['./hostel-room-edit.component.scss']
})
export class HostelRoomEditComponent implements OnInit {

  page_name = 'Edit HostelRoom';
  loading = false;
  editForm: FormGroup;
  record: HostelRoom;
  hostelRooms: HostelRooms;
  feesPaymentRecords: Array<FeesPayment>;
  feesPaymentOptions: SelectOption;
  hostelRecords: Array<Hostel>;
  hostelOptions: SelectOption;
  hostelBedspaceRecords: Array<Hostel>;
  hostelBedspaceOptions: SelectOption;
  router: Router;

  constructor(private _fb: FormBuilder,
              private feesPayments: FeesPayments,
              private hostels: Hostels,
              private hostelBedspaces : HostelBedspaces) {
                this.feesPaymentRecords = this.feesPayments.query();
                this.hostelRecords = this.hostels.query();
             //   this.hostelBedspaceRecords = this.hostelBedspaces.query();
              }

  ngOnInit() {
    this.createForm();
    this.setForm();
  }
  createForm() {
    this.editForm = this._fb.group({
              hostel: [''],
              code: [''],
              hostel_bedspaces: [''],
              floor: [''],
              status: [''],
              description: [''],
      
    });
  }

  setForm() {
    this.editForm.patchValue({
      hostel: deepPropsExist(this.record, 'hostel') ? this.record.hostel : '',
      code: deepPropsExist(this.record, 'code') ? this.record.code : '',
      hostel_bedspaces: deepPropsExist(this.record, 'hostel_bedspaces') ? this.record.hostel_bedspaces : '',
      floor: deepPropsExist(this.record, 'floor') ? this.record.floor : '',
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
      this.hostelRooms.recordCreate(payload).then((res: ApiResponse) => {
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
    this.router.navigate([`hostel-room/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
