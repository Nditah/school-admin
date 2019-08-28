import { Component, OnInit, Input } from '@angular/core';
import { Classe } from '../../../models';

@Component({
  selector: 'app-classe-detail',
  templateUrl: './classe-detail.component.html',
  styleUrls: ['./classe-detail.component.scss']
})
export class ClasseDetailComponent implements OnInit {
  @Input() record: Classe;

  constructor() {
    console.log(this.record);
  }

  ngOnInit() {
  }

}
