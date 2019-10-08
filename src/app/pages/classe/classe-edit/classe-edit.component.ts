import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Student, Staff, Classe, SelectOption, Classroom } from '../../../models';
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
  @Input() classroomRecords: Array<Classroom>;
  @Output() returnResponse: EventEmitter<any> =  new EventEmitter();
  prevStaffRecords: Array<Staff>;
  prevStudentRecords: Array<Student>;
  prevClassroomRecords: Array<Classroom>;
  prevRecords: Classe | null;
  staffOptions: Array<SelectOption>;
  studentOptions: Array<SelectOption>;
  classroomOptions: Array<SelectOption>;
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

    if (!isEqual(this.classroomRecords, this.prevClassroomRecords)) {
      this.prevClassroomRecords = [...this.classroomRecords];
      this.getClassrooms();
    }
  }

  async onSubmit() {
    const payload  = this.editForm.value;

    let codeSub = payload.subsidiary.substring(0, 3).toUpperCase();
    if(payload.subsidiary == 'SECONDARY' && payload.level <= 3) {
      codeSub = 'JSS';
    } else if(payload.subsidiary == 'SECONDARY' && payload.level > 3) {
      codeSub = 'SS';
    } else {
      console.log('invalid codeSub');
    }

    let codeLevel = payload.level;
    if(payload.subsidiary == 'SECONDARY' && payload.level == 4) {
      codeLevel = 1;
    } else if(payload.subsidiary == 'SECONDARY' && payload.level == 5) {
      codeLevel = 2;
    } else if(payload.subsidiary == 'SECONDARY' && payload.level == 6) {
      codeLevel = 3;
    } else {
      console.log('invalid codeLevel');
    }

    const codeName = payload.name;
    payload.code = codeSub + codeLevel + codeName;

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

  getClassrooms() {
    this.classroomOptions = this.classroomRecords.map(options => (
      {
        id: options.id,
        text: `${options.name} ${options.block}`
      }
    ));
    console.log(this.classroomOptions);
  }

}
