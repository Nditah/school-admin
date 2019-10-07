import { Component, OnInit, Input } from '@angular/core';
import { Report } from '../../../models';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {

  @Input() record: Report;

  constructor() {
    console.log(this.record);
  }

  ngOnInit() {
  }

}
