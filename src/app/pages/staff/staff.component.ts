import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Staff, ApiResponse } from '../../models';
import { Staffs } from '../../providers';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<Staff>;
  loading = false;
  page_name = 'List of Staff';

  constructor(private router: Router,
              private toastr: ToastrService,
              public staffs: Staffs) {
      this.currentRecords = this.staffs.query();
    }

  ngOnInit() {
  }

  goToEdit(record: Staff) {
    console.log(record.id);
  }

  goToDetail(record: Staff) {
    console.log('trying to view :' + record.id);
  }

}
