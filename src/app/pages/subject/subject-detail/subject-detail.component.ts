import { Component, OnInit, Input } from '@angular/core';
import { Subject } from '../../../models';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {
  @Input() record: Subject;

  constructor() {
    console.log(this.record);
  }

  ngOnInit() {
  }

}
