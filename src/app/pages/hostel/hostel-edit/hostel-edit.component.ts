import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectOption, ApiResponse, Fee, County, Hostel } from '../../../models';
import { Fees, Counties, Hostels } from '../../../providers';
import { deepPropsExist, isEqual } from '../../../helpers';

@Component({
  selector: 'app-hostel-edit',
  templateUrl: './hostel-edit.component.html',
  styleUrls: ['./hostel-edit.component.scss']
})
export class HostelEditComponent implements OnInit {

  @Input() record: Hostel | null;
  @Input() formType: string;
  @Input() feeRecords: Array<Fee>;
  @Output() returnResponse: EventEmitter<any> = new EventEmitter();
  prevStaffRecords: Array<Fee>;
  prevRecords: Hostel | null;
  feeOptions: Array<SelectOption>;
  countyRecords: Array<County>;
  countyOptions: SelectOption;
  editForm: FormGroup;
  loading = false;
  router : Router;

  constructor(private _fb: FormBuilder,
              private hostels: Hostels,
              ) {

              }

  ngOnInit() {
    this.updateForm();
  }
  ngDoCheck() {
    if (!isEqual(this.record, this.prevRecords)) {
      this.prevRecords = this.record;
      this.setForm();
    }
  }
  ngOnChanges() {
    if(!isEqual(this.feeRecords, this.prevStaffRecords)) {
      this.prevStaffRecords = [...this.feeRecords];
      this.getFeeOptions();
    }
  }
  async onSubmit() {
    const payload  = this.editForm.value;
    try {
      const result = await this.hostels.recordUpdate(this.record, payload);
      if (result.success) {
        this.returnResponse.emit({message: 'This subject has been updated', status: 'success'});
        // this.notify.showNotification('This subject has been updated', 'success');
      } else {
        this.returnResponse.emit({message: result.message, status: 'danger'});
        // this.notify.showNotification(result.message, 'danger');
      }
    } catch (error) {
      this.returnResponse.emit({message: error, status: 'danger'});
      // this.notify.showNotification(error, 'danger');
    }
  }
  updateForm() {
    this.editForm = this._fb.group({
      block: ['', Validators.required],
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

  getFeeOptions() {
    this.feeOptions = this.feeRecords.map(options => (
      {
        id: options.id,
        text: `${options.amount} ${options.type}`
      }
    ));
    console.log(this.feeOptions);
  }



  goToDetail(record: any): void {
    this.router.navigate([`hostel/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}

