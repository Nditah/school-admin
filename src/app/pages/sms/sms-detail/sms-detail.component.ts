
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sms } from '../../../models';
import { Smss } from '../../../providers';

@Component({
  selector: 'app-sms-detail',
  templateUrl: './sms-detail.component.html',
})
export class SmsDetailComponent implements OnInit {
    @Input() record: Sms;
  // record: Sms;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public smss: Smss) {
    }

  ngOnInit() {
  }

}
