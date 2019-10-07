import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostelAllocation, ApiResponse, FeesPayment, Student, HostelBedspace} from '../../../models';
import { HostelAllocations, FeesPayments, Students, HostelBedspaces} from '../../../providers';

@Component({
  selector: 'app-hostel-allocation-detail',
  templateUrl: './hostel-allocation-detail.component.html',
  styleUrls: ['./hostel-allocation-detail.component.scss']
})
export class HostelAllocationDetailComponent implements OnInit {

  record: HostelAllocation;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public HostelAllocations: HostelAllocations,
    private feesPayments: FeesPayments,
    private students: Students,
    private hostelBedspaces : HostelBedspaces,    ) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.HostelAllocations.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
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
    this.router.navigate(['hostel-allocation/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`hostel-allocation/edit/${record.id}`]);
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
