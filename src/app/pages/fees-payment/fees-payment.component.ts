import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FeesPayment, ApiResponse } from '../../models';
import { FeesPayments } from '../../providers';


@Component({
  selector: 'app-fees-payment',
  templateUrl: './fees-payment.component.html',
  styleUrls: ['./fees-payment.component.scss']
})
export class FeesPaymentComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<FeesPayment> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public feespayments: FeesPayments) {
      this.currentRecords = this.feespayments.query();
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
      this.feespayments.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.feespayments.query();
          this.showNotification(`${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.showNotification(err.message);
      });
    }

    goToAdd(): void {
      this.router.navigate(['fees-payment/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`fees-payment/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`fees-payment/edit/${record.id}`]);
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