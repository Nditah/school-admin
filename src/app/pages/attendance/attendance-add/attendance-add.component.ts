import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attendances, Classes, Students, Staffs, Offices } from '../../../providers';
import {ApiResponse, SelectOption, Attendance, Course, Staff, County } from '../../../models';

@Component({
  selector: 'app-attendance-add',
  templateUrl: './attendance-add.component.html',
  styleUrls: ['./attendance-add.component.scss']
})
export class AttendanceAddComponent implements OnInit {

  @Input() currentForm: string;
  addForm: FormGroup;
  loading = false;
  classeOptions: Array<SelectOption>;
  staffOptions: Array<SelectOption>;
  studentOptions: Array<SelectOption>;
  officeOptions: Array<SelectOption>;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private attendances: Attendances, 
              private classes: Classes,
              private students : Students,
              private staffs : Staffs,
              private offices : Offices,
              private toastr: ToastrService,
               ) {
      this.createForm();
      this.getStudents();
      this.getStaff();
      this.getClasses();
  }

  ngOnInit() {
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      type: ['', Validators.required],
      staff: [''],
      student: [''],
      office: [''],
      attendance_status: ['', Validators.required],
      subsidiary: [''],
      classe: [''],
      arrival_time: [''],
      departure_time: [''],
          
    });
  }

  // ====================  All Methods to load external links for Object IDs  ======================= //
  // get students for the select box
  getStudents() {
    this.students.recordRetrieve().then(data => {
      if (data.success) {
        this.studentOptions = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.other_name}));
        console.log('List of students  ================ \n' + JSON.stringify(this.studentOptions) );
      } else {
        this.showNotification('Could not retrieve students');
        console.log(data.message);
      }
    });
  }

  getStaff() {
    this.staffs.recordRetrieve().then(data => {
      if (data.success) {
        this.staffOptions = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.other_name}));
        console.log('List of staffs  ================ \n' + JSON.stringify(this.staffOptions) );
      } else {
        this.showNotification('Could not retrieve staffs');
        console.log(data.message);
      }
    });
  }

  getClasses() {
    this.classes.recordRetrieve().then(data => {
      if (data.success) {
        this.classeOptions = data.payload.map(item => ({id: item.id, text: item.name}));
        console.log('List of classes  ================ \n' + JSON.stringify(this.classeOptions) );
      } else {
        this.showNotification('Could not retrieve classes');
        console.log(data.message);
      }
    });
  }
  getOffices() {
    this.offices.recordRetrieve().then(data => {
      if (data.success) {
        this.officeOptions = data.payload.map(item => ({id: item.id, text: item.name}));
        console.log('List of classes  ================ \n' + JSON.stringify(this.officeOptions) );
      } else {
        this.showNotification('Could not retrieve Offices');
        console.log(data.message);
      }
    });
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    console.log(payload);
    if (this.addForm.invalid) {
      this.showNotification('Invalid form! Please fill all the required* inputs.');
      this.loading = false;
      return;
    }
    try {
      console.log(payload);
      this.attendances.recordCreate(payload).then((res: ApiResponse) => {
          console.log(res);
        if (res.success) {
          this.goToDetail(res.payload);
        } else {
          this.showNotification(res.message);
        }
      }, (err) => this.showNotification(err.message));
    } catch (error) {
      this.showNotification(error.message);
    }
    this.loading = false;
    return;
  }

  goToDetail(record: any): void {
    this.router.navigate([`attendance/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`attendance/edit/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

  showNotification(message) {
    this.toastr.show(message, 'Adding Record', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
    }

}