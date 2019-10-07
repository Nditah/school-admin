import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Fee, ApiResponse } from '../../models';
import { Fees } from '../../providers';


@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<Fee> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public fees: Fees) {
      this.currentRecords = this.fees.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

    ngOnInit() {
    }

    getName = (para) => {
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      this.fees.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.fees.query();
          this.showNotification(`${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.showNotification(err.message);
      });
    }

    goToAdd(): void {
      this.router.navigate(['fee/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`fee/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`fee/edit/${record.id}`]);
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