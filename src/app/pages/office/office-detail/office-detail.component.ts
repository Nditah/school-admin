import { Component, OnInit, Input } from '@angular/core';
import { Office } from '../../../models';

@Component({
  selector: 'app-office-detail',
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.scss']
})
export class OfficeDetailComponent implements OnInit {
  @Input() record: Office;

  constructor() {
    console.log(this.record);
  }

  ngOnInit() {
  }

}
