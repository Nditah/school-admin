import { Component, OnInit } from '@angular/core';
import { Student, ApiResponse } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { Students } from 'src/app/providers';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

  record: Student;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private students: Students) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.students.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  goToEdit(record) {
    this.router.navigate([`student/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
