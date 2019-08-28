import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Student, Staff, Classe, SelectOption } from '../../../models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Classes } from '../../../providers';
import { isEqual, deepPropsExist } from '../../../helpers';

@Component({
  selector: 'app-classe-edit',
  templateUrl: './classe-edit.component.html',
  styleUrls: ['./classe-edit.component.scss']
})
export class ClasseEditComponent implements OnInit {

  @Input() record: Classe | null;
  @Input() formType: string;
  @Input() staffRecords: Array<Staff>;
  @Input() studentRecords: Array<Student>;
  @Output() returnResponse: EventEmitter<any> =  new EventEmitter();
  prevStaffRecords: Array<Staff>;
  prevStudentRecords: Array<Student>;
  prevRecords: Classe | null;
  staffOptions: Array<SelectOption>;
  studentOptions: Array<SelectOption>;
  editForm: FormGroup;
  loading = false;

  constructor(public _fb: FormBuilder,
              private classes: Classes) { }

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
      this.getStaffOptions();
    }

    if (!isEqual(this.studentRecords, this.prevStudentRecords)) {
      this.prevStudentRecords = [...this.studentRecords];
      this.getStudentOptions();
    }
  }

  async onSubmit() {
    const payload  = this.editForm.value;
    try {
      const result = await this.classes.recordUpdate(this.record, payload);
      if (result.success) {
        this.returnResponse.emit({message: 'This class has been updated', status: 'success'});
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
      name: [''],
      code: [''], // remove later
      subsidiary: [''],
      level: [''],
      master: [''],
      prefect: [''],
      classroom: [''],
      category: [''],
    });
  }

  setForm() {
    this.editForm.patchValue({
      name: deepPropsExist(this.record, 'name') ? this.record.name : '',
      code: deepPropsExist(this.record, 'code') ? this.record.code : '',
      subsidiary: deepPropsExist(this.record, 'subsidiary') ? this.record.subsidiary : '',
      level: deepPropsExist(this.record, 'level') ? this.record.level : '',
      master: deepPropsExist(this.record, 'master', 'id') ? this.record.master.id : '',
      prefect: deepPropsExist(this.record, 'prefect', 'id') ? this.record.prefect.id : '',
      classroom: deepPropsExist(this.record, 'classroom', 'id') ? this.record.classroom.id : '',
      category: deepPropsExist(this.record, 'category') ? this.record.category : '',
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

  getStudentOptions() {
    this.studentOptions = this.studentRecords.map(options => (
      {
        id: options.id,
        text: `${options.surname} ${options.given_name}`
      }
    ));
    console.log(this.studentOptions);
  }

}
