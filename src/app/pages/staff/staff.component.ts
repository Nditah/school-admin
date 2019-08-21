import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Staff, ApiResponse } from 'src/app/models';
import { Staffs } from 'src/app/providers';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<Staff> = [];
  loading = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              public staffs: Staffs) { }

  ngOnInit() {
  }

  async search(data) {
    const queryString = `?q=${data.searchString}`; // queryString
    console.log(data);
    this.staffs.recordRetrieve(queryString).then((res: ApiResponse) => {
      if (res.success) {
        this.currentRecords = this.staffs.query();
        this.showNotification(`${res.payload.length} record(s) found!`);
      }
    }).catch(err => {
      this.showNotification(err.message);
    });
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

  showNotification(message) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
    }

}
