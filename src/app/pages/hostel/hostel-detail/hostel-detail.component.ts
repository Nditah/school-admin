import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hostel, ApiResponse, Fee} from '../../../models';
import { Hostels, Fees} from '../../../providers';

@Component({
  selector: 'app-hostel-detail',
  templateUrl: './hostel-detail.component.html',
  styleUrls: ['./hostel-detail.component.scss']
})
export class HostelDetailComponent implements OnInit {

  record: Hostel;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public Hostels: Hostels,
    private fees: Fees) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.Hostels.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    this.router.navigate(['hostel/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`hostel/edit/${record.id}`]);
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
