import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fee, ApiResponse} from '../../../models';
import { Fees} from '../../../providers';

@Component({
  selector: 'app-fee-detail',
  templateUrl: './fee-detail.component.html',
  styleUrls: ['./fee-detail.component.scss']
})
export class FeeDetailComponent implements OnInit {

  record: Fee;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public Fees: Fees,
    private fees: Fees) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.Fees.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['fee/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`fee/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

  // getFeeFromId(record: Fee) {
  //   this.fees.recordRetrieve(`?id=${record.id}`).then( (res: ApiResponse) => {
  //     if (res.success) {
  //       console.log(res.payload);
  //       return res.payload.name;
  //     }
  //   });
  // }

}
