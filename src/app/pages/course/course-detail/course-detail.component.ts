import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../models';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  @Input() record: Course | null;

  constructor() { }

  ngOnInit() {
  }

}
