import { Component, OnInit } from '@angular/core';
import { Staff, ApiResponse } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { Staffs } from '../../../providers';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {

  record: Staff;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private staffs: Staffs
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.staffs.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  goToEdit(record: any): void {
    this.router.navigate([`staff/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
