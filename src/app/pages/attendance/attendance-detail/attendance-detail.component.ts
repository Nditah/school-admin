import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Attendance, ApiResponse, Classe} from '../../../models';
import {Attendances, Classes} from '../../../providers';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.component.scss']
})
export class AttendanceDetailComponent implements OnInit {

  record: Attendance;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public Attendances: Attendances,
    private classes: Classes) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.Attendances.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['attendance/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`attendance/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

  // getClasseFromId(record: Classe) {
  //   this.classes.recordRetrieve(`?id=${record.id}`).then( (res: ApiResponse) => {
  //     if (res.success) {
  //       console.log(res.payload);
  //       return res.payload.name;
  //     }
  //   });
  // }

}