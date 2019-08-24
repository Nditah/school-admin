
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Setting, ApiResponse } from '../../../models';
import { Settings } from '../../../providers';

@Component({
  selector: 'app-setting-detail',
  templateUrl: './setting-detail.component.html',
})
export class SettingDetailComponent implements OnInit {

  record: Setting;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public settings: Settings) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.settings.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  goToList(record: any): void {
    this.router.navigate([`setting`]);
  }

  goBack() {
    window.history.back();
  }

}
