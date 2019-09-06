import { Component, OnInit, Input } from '@angular/core';
import { AccountClass } from '../../../models';

@Component({
  selector: 'app-account-class-detail',
  templateUrl: './account-class-detail.component.html',
  styleUrls: ['./account-class-detail.component.scss']
})
export class AccountClassDetailComponent implements OnInit {
  @Input() record: AccountClass;

  constructor() {
    console.log(this.record);
  }

  ngOnInit() {
  }

}
