import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Marksheets, Students, Courses, Staffs } from '../../../providers';
import {ApiResponse, SelectOption, Marksheet, Course, Staff, County } from '../../../models';

@Component({
  selector: 'app-marksheet-add',
  templateUrl: './marksheet-add.component.html',
  styleUrls: ['./marksheet-add.component.scss']
})
export class MarksheetAddComponent implements OnInit {

  @Input() currentForm: string;
  addForm: FormGroup;
  loading = false;
  courseOptions: Array<SelectOption>;
  staffOptions: Array<SelectOption>;
  marksheetOptions: Array<SelectOption>;
  assessmentsittingOptions: Array<SelectOption>;
  studentOptions: Array<SelectOption>;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private marksheets : Marksheets,
              private courses: Courses, 
              private students: Students,
              private staff : Staffs,
              private toastr: ToastrService,
               ) {
      this.createForm();
      this.getCourses();
      this.getStudents();
      //this.getClasses();
  }

  ngOnInit() {
  }

  createForm() {
    this.addForm = this.formBuilder.group({
              type: ['', Validators.required],
              course: ['', Validators.required],
              student: ['', Validators.required],
              score: ['', Validators.required],
              total: ['', Validators.required],
              assessment_sitting: [''],
    });
  }

  // ====================  All Methods to load external links for Object IDs  ======================= //
  // get Marksheet for the select box
  getMarksheets() {
    this.marksheets.recordRetrieve().then(data => {
      if (data.success) {
        this.marksheetOptions = data.payload.map(item => ({id: item.id, text: item.type}));
        console.log('List of marksheets  ================ \n' + JSON.stringify(this.marksheetOptions) );
      } else {
        this.showNotification('Could not retrieve marksheets');
        console.log(data.message);
      }
    });
  }

  getCourses() {
    this.courses.recordRetrieve().then(data => {
      if (data.success) {
        this.courseOptions = data.payload.map(item => ({id: item.id, text: item.code }));
        console.log('List of admissions  ================ \n' + JSON.stringify(this.courseOptions) );
      } else {
        this.showNotification('Could not retrieve admissions');
        console.log(data.message);
      }
    });
  }

  getStudents() {
    this.students.recordRetrieve().then(data => {
      if (data.success) {
        this.studentOptions = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.given_names}));
        console.log('List of classes  ================ \n' + JSON.stringify(this.studentOptions) );
      } else {
        this.showNotification('Could not retrieve classes');
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
      this.marksheets.recordCreate(payload).then((res: ApiResponse) => {
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
    this.router.navigate([`marksheet/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`marksheet/edit/${record.id}`]);
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