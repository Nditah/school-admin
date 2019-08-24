import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { Subject, Staff, SelectOption } from '../../../models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { deepPropsExist, isEqual } from '../../../helpers';
import { NotificationService } from '../../../services';
import { Subjects } from '../../../providers';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.scss']
})
export class SubjectEditComponent implements OnInit {
  @Input() record: Subject | null;
  @Input() formType: string;
  @Input() staffRecords: Array<Staff>;
  @Output() returnResponse: EventEmitter<any> =  new EventEmitter();
  prevStaffRecords: Array<Staff>;
  prevRecords: Subject | null;
  staffOptions: Array<SelectOption>;
  editForm: FormGroup;

  constructor(public _fb: FormBuilder,
              private subjects: Subjects,) {
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
      const result = await this.subjects.recordUpdate(this.record, payload);
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
      name: ['', Validators.required],
      description: ['', Validators.required],
      subsidiary: ['', Validators.required],
      hod: [''],
    });
  }

  setForm() {
    this.editForm.patchValue({
      name: deepPropsExist(this.record, 'name') ? this.record.name : '',
      description: deepPropsExist(this.record, 'description') ? this.record.description : '',
      subsidiary: deepPropsExist(this.record, 'subsidiary') ? this.record.subsidiary : '',
      hod: deepPropsExist(this.record, 'hod', 'id') ? this.record.hod.id : ''
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
