import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-advance-table',
  templateUrl: './advance-table.component.html',
  styleUrls: ['./advance-table.component.scss']
})
export class AdvanceTableComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dataTable: DataTableDirective;
  dtOptions: any = {};

  constructor() { }

  ngOnInit() {
  }

}
