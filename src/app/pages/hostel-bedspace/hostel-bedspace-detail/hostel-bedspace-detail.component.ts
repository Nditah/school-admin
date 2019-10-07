import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostelBedspace, ApiResponse, FeesPayment, Student, HostelRoom} from '../../../models';
import { HostelBedspaces, FeesPayments, Students, HostelRooms} from '../../../providers';

@Component({
  selector: 'app-hostel-bedspace-detail',
  templateUrl: './hostel-bedspace-detail.component.html',
  styleUrls: ['./hostel-bedspace-detail.component.scss']
})
export class HostelBedspaceDetailComponent implements OnInit {

  record: HostelBedspace;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public HostelBedspaces: HostelBedspaces,
    private feesPayments: FeesPayments,
    private students: Students,
    private hostelRooms : HostelRooms,    ) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.HostelBedspaces.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    this.router.navigate(['hostel-bedspace/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`hostel-bedspace/edit/${record.id}`]);
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
