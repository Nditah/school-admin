import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Student, ApiResponse } from '../../models';
import { Students } from '../../providers';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<Student>;
  loading = false;
  activeSidebar = false;
  page_name = 'List of Students';

  constructor(private router: Router,
              private toastr: ToastrService,
              public students: Students) {
                this.currentRecords = this.students.query();
               }

  ngOnInit() {
  }

  async search(data) {
    const queryString = `?q=${data.searchString}`; // queryString
    console.log(data);
  }

  closeSidebar($event) {
    this.activeSidebar = $event;
  }

  goToAdd(): void {
    this.router.navigate(['student/add']);
  }

  goToDetail(record: any): void {
    this.router.navigate([`student/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`student/edit/${record.id}`]);
  }

  removeRecord(record) {
    console.log(record.id);
  }

}
