import { Component, OnInit, Input } from '@angular/core';
import { Classroom } from '../../../models';

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.scss']
})
export class ClassroomDetailComponent implements OnInit {
  @Input() record: Classroom;

  constructor() {
    console.log(this.record);
  }

  ngOnInit() {
  }

}
