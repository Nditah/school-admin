import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Staff, ApiResponse } from '../../models';
import { Staffs } from '../../providers';
import { NotificationService } from '../../services';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<Staff>;
  loading = false;
  activeSidebar = false;
  page_name = 'List of Staff';

  constructor(private router: Router,
              private notify: NotificationService,
              private formBuilder: FormBuilder,
              public staffs: Staffs) {
      this.currentRecords = this.staffs.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

  ngOnInit() {
  }

  async search(data)  {
    const queryString = `?q=${data.searchString}`; // queryString
    console.log(data);
    this.staffs.recordRetrieve(queryString).then((res: ApiResponse) => {
      if (res.success) {
        this.currentRecords = this.staffs.query();
        this.notify.showNotification(`${res.payload.length} record(s) found!`);
      }
    }).catch(err => {
      this.notify.showNotification(err.message);
    });
  }

  closeSidebar($event) {
    this.activeSidebar = $event;
  }

  goToAdd(): void {
    this.router.navigate(['staff/add']);
  }

  goToDetail(record: any): void {
    this.router.navigate([`staff/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`staff/edit/${record.id}`]);
  }

  removeRecord(record) {
    console.log(record.id);
  }

}
