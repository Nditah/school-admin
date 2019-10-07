import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Report, SelectOption } from '../../../models';
import { Marksheet, Student } from '../../../models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Reports } from '../../../providers';
import { isEqual, deepPropsExist } from '../../../helpers';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.scss']
})
export class ReportEditComponent implements OnInit {

  @Input() record: Report | null;
  @Input() formType: string;
  @Input() marksheetRecords: Array<Marksheet>;
  @Input() studentRecords: Array<Student>;
  @Output() returnResponse: EventEmitter<any> =  new EventEmitter();
  prevMarkRecords: Array<Marksheet>;
  prevStudentRecords: Array<Student>;
  prevRecords: Marksheet | null;
  marksheetOptions: Array<SelectOption>;
  studentOptions: Array<SelectOption>;
  editForm: FormGroup;
  loading = false;

  constructor(private _fb: FormBuilder,
              private reports: Reports) { }

  ngOnInit() {
    this.updateForm();
  }

  // ngDoCheck() {
  //   if (!isEqual(this.record, this.prevRecords)) {
  //     this.prevRecords = this.record;
  //     this.setForm();
  //   }
  // }

  ngDoCheck() {
    if (!isEqual(this.marksheetRecords, this.prevMarkRecords)) {
      this.prevMarkRecords = [...this.marksheetRecords];
      this.getMarkOptions();
    }

    if (!isEqual(this.studentRecords, this.prevStudentRecords)) {
      this.prevStudentRecords = [...this.studentRecords];
      this.getStudentOptions();
    }
  }

  getMarkOptions() {
    this.marksheetOptions = this.marksheetRecords.map(options => (
      {
        id: options.id,
        text: `${options.type}`
      }
    ));
    console.log(this.marksheetOptions);
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

  setForm() {
    this.editForm.patchValue({
      type: deepPropsExist(this.record, 'type') ? this.record.type : '',
      term: deepPropsExist(this.record, 'term') ? this.record.term : '',
      cumulated: deepPropsExist(this.record, 'cumulated') ? this.record.cumulated : '',
      marksheets: deepPropsExist(this.record, 'marksheets', 'id') ? this.record.marksheets : '',
      student: deepPropsExist(this.record, 'student', 'id') ? this.record.student.id : '',
      evaluation: deepPropsExist(this.record, 'evaluation') ? this.record.evaluation : '',
      total: deepPropsExist(this.record, 'total') ? this.record.total : '',
      rank: deepPropsExist(this.record, 'rank') ? this.record.rank : '',
    });
  }

  updateForm() {
    this.editForm = this._fb.group({
      type: [''],
      term: [''],
      cumulated: [''],
      student: [''],
      marksheets: [''],
      evaluation: [''],
      total: [''],
      rank: [''],
    });
  }

  async onSubmit() {
    const payload  = this.editForm.value;
    try {
      const result = await this.reports.recordUpdate(this.record, payload);
      if (result.success) {
        this.returnResponse.emit({message: 'This report has been updated', status: 'success'});
      } else {
        this.returnResponse.emit({message: result.message, status: 'danger'});
      }
    } catch (error) {
      this.returnResponse.emit({message: error, status: 'danger'});
    }
  }

}
