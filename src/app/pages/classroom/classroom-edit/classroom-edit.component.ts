import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { Classroom, Classe, SelectOption } from '../../../models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { deepPropsExist, isEqual } from '../../../helpers';
import { NotificationService } from '../../../services';
import { Classrooms } from '../../../providers';

@Component({
  selector: 'app-classroom-edit',
  templateUrl: './classroom-edit.component.html',
  styleUrls: ['./classroom-edit.component.scss']
})
export class ClassroomEditComponent implements OnInit {
  @Input() record: Classroom | null;
  @Input() formType: string;
  @Input() classeRecords: Array<Classe>;
  @Output() returnResponse: EventEmitter<any> =  new EventEmitter();
  prevClasseRecords: Array<Classe>;
  prevRecords: Classroom | null;
  classeOptions: Array<SelectOption>;
  editForm: FormGroup;
  loading = false;

  constructor(public _fb: FormBuilder,
              private classrooms: Classrooms,) {
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
    if(!isEqual(this.classeRecords, this.prevClasseRecords)) {
      this.prevClasseRecords = [...this.classeRecords];
      this.getClasseOptions();
    }
  }

  async onSubmit() {
    const payload  = this.editForm.value;
    try {
      const result = await this.classrooms.recordUpdate(this.record, payload);
      if (result.success) {
        this.returnResponse.emit({message: 'This classroom has been updated', status: 'success'});
        // this.notify.showNotification('This classroom has been updated', 'success');
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
      block: ['', Validators.required],
      level: ['', Validators.required],
      subsidiary: ['', Validators.required],
      classe: [''],
    });
  }

  setForm() {
    this.editForm.patchValue({
      name: deepPropsExist(this.record, 'name') ? this.record.name : '',
      block: deepPropsExist(this.record, 'block') ? this.record.block : '',
      level: deepPropsExist(this.record, 'level') ? this.record.level : '',
      subsidiary: deepPropsExist(this.record, 'subsidiary') ? this.record.subsidiary : '',
      classe: deepPropsExist(this.record, 'classe', 'id') ? this.record.classe.id : ''
    });
  }

  getClasseOptions() {
    this.classeOptions = this.classeRecords.map(options => (
      {
        id: options.id,
        text: `${options.master} ${options.level}`
      }
    ));
    console.log(this.classeOptions);
  }

}
