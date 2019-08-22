import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Admission, ApiResponse, Classe} from '../../../models';
import {Admissions, Classes} from '../../../providers';

@Component({
  selector: 'app-admission-detail',
  templateUrl: './admission-detail.component.html',
  styleUrls: ['./admission-detail.component.scss']
})
export class AdmissionDetailComponent implements OnInit {

  record: Admission;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public Admissions: Admissions,
    private classes: Classes) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.Admissions.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    this.router.navigate(['admission/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`admission/edit/${record.id}`]);
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