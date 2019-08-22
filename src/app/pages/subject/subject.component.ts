import { Component, OnInit } from '@angular/core';
import { Subject, Staff, SelectOption } from '../../models';
import { Subjects, Staffs } from '../../providers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { isEqual } from 'src/app/helpers';
import { NotificationService } from '../../services';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  searchForm: FormGroup;
  page_name = 'List of Subjects';
  currentRecords: Array<Subject>;
  loading: false;
  addForm: FormGroup;
  staffRecords: Array<Staff>;
  prevStaffRecords: Array<Staff>;
  staffOptions: SelectOption[];

  constructor(private subjects: Subjects,
              private notify: NotificationService,
              private _fb: FormBuilder,
              private staffs: Staffs) {
                this.currentRecords = this.subjects.query();
                this.staffRecords = this.staffs.query();
               }

  ngOnInit() {
    this.createForm();
  }

  ngDoCheck() {
    if (!isEqual(this.staffRecords, this.prevStaffRecords)) {
      this.prevStaffRecords = [...this.staffRecords];
      this.getStaffOptions();
    }
  }

  createForm() {
    this.addForm = this._fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      hod: [''],
      subsidiary: ['', Validators.required]
    });
  }

  async onSubmit() {
    const payload = this.addForm.value;
    const codeName = payload.name.length > 7 ? payload.name.substring(0, 4) : payload.name.substring(0, 3);
    const codeSubsidiary = payload.subsidiary.substring(0, 3);
    payload.code = codeName.toUpperCase() + codeSubsidiary;
    console.log(payload);
    try {
      const results = await this.subjects.recordCreate(payload);
      if (results.success) {
        this.notify.showNotification('This subject has been added', 'success');
        this.currentRecords =  this.subjects.query();
      } else {
        this.notify.showNotification(results.message, 'danger');
      }
    } catch (error) {
      this.notify.showNotification(error, 'danger');
    }
  }

  openSidebar() {

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
