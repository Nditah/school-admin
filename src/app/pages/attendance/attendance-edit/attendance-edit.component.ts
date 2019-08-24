import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attendances, Classes, Counties, States, Students, Staffs, Offices } from '../../../providers';
import {ApiResponse, SelectOption, Attendance, Course, Staff, County } from '../../../models';

@Component({
  selector: 'app-attendance-edit',
  templateUrl: './attendance-edit.component.html',
  styleUrls: ['./attendance-edit.component.scss']
})
export class AttendanceEditComponent implements OnInit {

  @Input() currentForm: string;
  editForm: FormGroup;
  record: Attendance;
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

      // get current billing id
                    const id = this.activatedRoute.snapshot.paramMap.get('id');
                    const record = this.attendances.query({id})[0];
                    if (!!record) {
                    this.record = record;
                    } else {
                    this.goBack();
                    }
                    this.createForm();
                    this.getStudents();
                    this.getStaff();
                    this.getClasses();
                  }

  ngOnInit() {
  }

  createForm() {
    this.editForm = this.formBuilder.group({
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

  setForm() {
    this.editForm.get('type').setValue(this.record.type || '');
    this.editForm.get('staff').setValue(this.record.staff || '');
    this.editForm.get('student').setValue(this.record.student || '');
    this.editForm.get('office').setValue(this.record.office || '');
    this.editForm.get('attendance_status').setValue(this.record.attendance_status || '');
    this.editForm.get('subsidiary').setValue(this.record.subsidiary || '');
    this.editForm.get('classe').setValue(this.record.classe || '');
    this.editForm.get('arrival_time').setValue(this.record.arrival_time || '');
    this.editForm.get('departure_time').setValue(this.record.departure_time || '');
    }
    

  // ====================  All Methods to load external links for Object IDs  ======================= //
  // get attendance for the select box
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

  
showNotification(message) {
  this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
  timeOut: 8000,
  closeButton: true,
  enableHtml: true,
  toastClass: 'alert alert-primary alert-with-icon',
  });
  }
  
  // Navigation
  goToDetail(record: any): void {
  this.router.navigate([`attendance/detail/${record.id}`]);
  return;
  }
  
  goBack() {
  window.history.back();
  }
  
  onSubmit() {
  return;
  }
  }