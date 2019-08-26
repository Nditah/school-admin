import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectOption, ApiResponse, FeesPayment, Student, HostelAllocation, HostelBedspace } from '../../../models';
import { FeesPayments, Students, HostelAllocations, HostelBedspaces } from '../../../providers';
import { deepPropsExist } from '../../../helpers';

@Component({
  selector: 'app-hostel-allocation-edit',
  templateUrl: './hostel-allocation-edit.component.html',
  styleUrls: ['./hostel-allocation-edit.component.scss']
})
export class HostelAllocationEditComponent implements OnInit {

  page_name = 'Edit HostelAllocation';
  loading = false;
  editForm: FormGroup;
  record: HostelAllocation;
  hostelAllocations: HostelAllocations;
  feesPaymentRecords: Array<FeesPayment>;
  feesPaymentOptions: SelectOption;
  studentRecords: Array<Student>;
  studentOptions: SelectOption;
  hostelBedspaceRecords: Array<Student>;
  hostelBedspaceOptions: SelectOption;
  router: Router;

  constructor(private _fb: FormBuilder,
              private feesPayments: FeesPayments,
              private students: Students,
              private hostelBedspaces : HostelBedspaces) {
                this.feesPaymentRecords = this.feesPayments.query();
                this.studentRecords = this.students.query();
             //   this.hostelBedspaceRecords = this.hostelBedspaces.query();
              }

  ngOnInit() {
    this.createForm();
    this.setForm();
  }
  createForm() {
    this.editForm = this._fb.group({
      bedspace: [''],
      fees_payment: [''],
      occupant: [''],
      description: [''],
      
    });
  }

  setForm() {
    this.editForm.patchValue({
      bedspace: deepPropsExist(this.record, 'bedspace') ? this.record.bedspace : '',
      fees_payment: deepPropsExist(this.record, 'fees_payment') ? this.record.fees_payment : '',
      description: deepPropsExist(this.record, 'description') ? this.record.description : '',
      occupant: deepPropsExist(this.record, 'occupant') ? this.record.occupant : '',

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
      this.hostelAllocations.recordCreate(payload).then((res: ApiResponse) => {
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
    this.router.navigate([`hostel-allocation/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
