import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostelRoom, ApiResponse, FeesPayment, Hostel, HostelBedspace} from '../../../models';
import { HostelRooms, FeesPayments, Hostels, HostelBedspaces} from '../../../providers';

@Component({
  selector: 'app-hostel-room-detail',
  templateUrl: './hostel-room-detail.component.html',
  styleUrls: ['./hostel-room-detail.component.scss']
})
export class HostelRoomDetailComponent implements OnInit {

  record: HostelRoom;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public HostelRooms: HostelRooms,
    private feesPayments: FeesPayments,
    private hostels: Hostels,
    private hostelBedspaces : HostelBedspaces,    ) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.HostelRooms.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    this.router.navigate(['hostel-room/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`hostel-room/edit/${record.id}`]);
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
