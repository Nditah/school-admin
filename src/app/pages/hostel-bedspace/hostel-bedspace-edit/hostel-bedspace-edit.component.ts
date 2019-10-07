import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectOption, ApiResponse, FeesPayment, Student, HostelBedspace, HostelRoom } from '../../../models';
import { FeesPayments, Students, HostelBedspaces, HostelRooms } from '../../../providers';
import { deepPropsExist } from '../../../helpers';

@Component({
  selector: 'app-hostel-bedspace-edit',
  templateUrl: './hostel-bedspace-edit.component.html',
  styleUrls: ['./hostel-bedspace-edit.component.scss']
})
export class HostelBedspaceEditComponent implements OnInit {

  page_name = 'Edit HostelBedspace';
  loading = false;
  editForm: FormGroup;
  record: HostelBedspace;
  hostelBedspaces: HostelBedspaces;
  feesPaymentRecords: Array<FeesPayment>;
  feesPaymentOptions: SelectOption;
  studentRecords: Array<Student>;
  studentOptions: SelectOption;
  hostelRoomRecords: Array<Student>;
  hostelRoomOptions: SelectOption;
  router: Router;

  constructor(private _fb: FormBuilder,
              private feesPayments: FeesPayments,
              private students: Students,
              private hostelRooms : HostelRooms) {
                this.feesPaymentRecords = this.feesPayments.query();
                this.studentRecords = this.students.query();
             //   this.hostelRoomRecords = this.hostelRooms.query();
              }

  ngOnInit() {
    this.createForm();
    this.setForm();
  }
  createForm() {
    this.editForm = this._fb.group({
      room: [''],
      code: [''],
      occupant: [''],
      description: [''],
      status: [''],
      
    });
  }

  setForm() {
    this.editForm.patchValue({
      room: deepPropsExist(this.record, 'room') ? this.record.room : '',
      code: deepPropsExist(this.record, 'code') ? this.record.code : '',
      description: deepPropsExist(this.record, 'description') ? this.record.description : '',
      occupant: deepPropsExist(this.record, 'occupant') ? this.record.occupant : '',
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
      this.hostelBedspaces.recordCreate(payload).then((res: ApiResponse) => {
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
    this.router.navigate([`hostel-bedspace/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
