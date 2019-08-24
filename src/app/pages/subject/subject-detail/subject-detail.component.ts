import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {
  @Input() record: string;

  constructor() {
    console.log(this.record);
  }

  ngOnInit() {
  }

}
