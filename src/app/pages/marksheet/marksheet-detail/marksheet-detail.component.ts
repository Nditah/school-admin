import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Marksheet, ApiResponse, Classe} from '../../../models';
import {Marksheets, Classes} from '../../../providers';

@Component({
  selector: 'app-marksheet-detail',
  templateUrl: './marksheet-detail.component.html',
  styleUrls: ['./marksheet-detail.component.scss']
})
export class MarksheetDetailComponent implements OnInit {

  record: Marksheet;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public Marksheets: Marksheets,
    private classes: Classes) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.Marksheets.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    this.router.navigate(['marksheet/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`marksheet/edit/${record.id}`]);
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