import { Component, OnInit } from '@angular/core';
import { Parent, ApiResponse } from 'src/app/models';
import { Router, ActivatedRoute } from '@angular/router';
import { Parents } from '../../../providers';

@Component({
  selector: 'app-parent-detail',
  templateUrl: './parent-detail.component.html',
  styleUrls: ['./parent-detail.component.scss']
})
export class ParentDetailComponent implements OnInit {

  record: Parent;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private parents: Parents) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.parents.recordRetrieve(`?_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
  }

  goToEdit(record) {
    this.router.navigate([`parent/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
