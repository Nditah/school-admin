import { Component, OnInit, Input } from '@angular/core';
import { Expense } from '../../../models';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss']
})
export class ExpenseDetailComponent implements OnInit {
  @Input() record: Expense;

  constructor() {
    console.log(this.record);
  }

  ngOnInit() {
  }

}
