import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { Asset, Staff, SelectOption } from '../../../models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { deepPropsExist, isEqual } from '../../../helpers';
import { NotificationService } from '../../../services';
import { Assets } from '../../../providers';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.scss']
})
export class AssetEditComponent implements OnInit {
  @Input() record: Asset | null;
  @Input() formType: string;
  @Input() staffRecords: Array<Staff>;
  @Output() returnResponse: EventEmitter<any> =  new EventEmitter();
  prevStaffRecords: Array<Staff>;
  prevRecords: Asset | null;
  staffOptions: Array<SelectOption>;
  editForm: FormGroup;
  loading = false;

  constructor(public _fb: FormBuilder,
              private assets: Assets, ) {
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
    if (!isEqual(this.staffRecords, this.prevStaffRecords)) {
      this.prevStaffRecords = [...this.staffRecords];
    }
  }

  async onSubmit() {
    const payload  = this.editForm.value;
    try {
      const result = await this.assets.recordUpdate(this.record, payload);
      if (result.success) {
        this.returnResponse.emit({message: 'This asset has been updated', status: 'success'});
        // this.notify.showNotification('This asset has been updated', 'success');
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
      type: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  setForm() {
    this.editForm.patchValue({
      name: deepPropsExist(this.record, 'name') ? this.record.name : '',
      type: deepPropsExist(this.record, 'type') ? this.record.type : '',
      value: deepPropsExist(this.record, 'value' ) ? this.record.value : ''
    });
  }

  

}
