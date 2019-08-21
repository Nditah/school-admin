import { Component, OnInit } from '@angular/core';
import { Subject, Staff, SelectOption } from '../../models';
import { Subjects, Staffs } from '../../providers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { isEqual } from 'src/app/helpers';

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
              private toastr: ToastrService,
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
      hod: ['']
    });
  }

  async onSubmit() {
    const payload = this.addForm.value;
    console.log(payload);
    try {
      const results = await this.staffs.recordCreate(payload);
      if (results.success) {
        this.showNotification('This subject has been added');
        this.currentRecords =  this.subjects.query();
      } else {
        this.showNotification(results.message);
      }
    } catch (error) {
      this.showNotification(error.error.message);
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

  showNotification(message) {
  this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    });
  }
}
