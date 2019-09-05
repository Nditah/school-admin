import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { AccountClass, Staff, SelectOption } from '../../../models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { deepPropsExist, isEqual } from '../../../helpers';
import { NotificationService } from '../../../services';
import { AccountClasses } from '../../../providers';

@Component({
  selector: 'app-account-class-edit',
  templateUrl: './account-class-edit.component.html',
  styleUrls: ['./account-class-edit.component.scss']
})
export class AccountClassEditComponent implements OnInit {
  @Input() record: AccountClass | null;
  @Input() formType: string;
  @Input() staffRecords: Array<Staff>;
  @Output() returnResponse: EventEmitter<any> =  new EventEmitter();
  prevStaffRecords: Array<Staff>;
  prevRecords: AccountClass | null;
  staffOptions: Array<SelectOption>;
  editForm: FormGroup;
  loading = false;

  constructor(public _fb: FormBuilder,
              private accountClasses: AccountClasses,) {
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
    if(!isEqual(this.staffRecords, this.prevStaffRecords)) {
      this.prevStaffRecords = [...this.staffRecords];
      this.getStaffOptions();
    }
  }

  async onSubmit() {
    const payload  = this.editForm.value;
    try {
      const result = await this.accountClasses.recordUpdate(this.record, payload);
      if (result.success) {
        this.returnResponse.emit({message: 'This accountClass has been updated', status: 'success'});
        // this.notify.showNotification('This accountClass has been updated', 'success');
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
      name: ['', Validators.required],
      code: ['', Validators.required],
      // email: ['', Validators.required],
      // phone: ['', Validators.required],
      // functions: [''],
      // hierarchy: [''],
      // accountClass_type: [''],
      subsidiary: [''],
      // head: [''],
      // assistant: [''],
    });
  }

  setForm() {
    this.editForm.patchValue({
      name: deepPropsExist(this.record, 'name') ? this.record.name : null,
      code: deepPropsExist(this.record, 'code') ? this.record.code : null,
      // email: deepPropsExist(this.record, 'email') ? this.record.email : null,
      // phone: deepPropsExist(this.record, 'phone') ? this.record.phone : null,
      // functions: deepPropsExist(this.record, 'functions') ? this.record.functions : null,
      // hierarchy: deepPropsExist(this.record, 'hierarchy') ? this.record.hierarchy : null,
      // accountClass_type: deepPropsExist(this.record, 'accountClass_type') ? this.record.accountClass_type : null,
      subsidiary: deepPropsExist(this.record, 'subsidiary') ? this.record.subsidiary : null,
      // accountClass_above: deepPropsExist(this.record, 'accountClass_above') ? this.record.accountClass_above : null,
      // head: deepPropsExist(this.record, 'head') ? this.record.head : null,
      // assistant: deepPropsExist(this.record, 'assistant') ? this.record.assistant : null,
    });
  }

  getStaffOptions() {
    this.staffOptions = this.staffRecords.map(options => (
      {
        id: options.id,
        text: `${options.surname} ${options.given_name}`
      }
    ));
    console.log(this.staffOptions);
  }

}
