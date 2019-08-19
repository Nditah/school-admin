import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../models';

@Component({
  selector: 'app-example-detail',
  templateUrl: './example-detail.component.html',
})
export class ExampleDetailComponent implements OnInit {

  // record: PmlShipment;

  constructor( private router: Router,
              private activatedRoute: ActivatedRoute,
    ) {
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // this.pmlShipments.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
    //   if (res.success) {
    //     const record = res.payload[0];
    //     this.record = record;
    //     console.log(record);
    //   } else {
    //     console.log(res.message);
    //   }
    // });
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['example/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`example/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
