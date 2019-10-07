import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FeesType, ApiResponse } from '../../models';
import { FeesTypes } from '../../providers';


@Component({
  selector: 'app-fees-type',
  templateUrl: './fees-type.component.html',
  styleUrls: ['./fees-type.component.scss']
})
export class FeesTypeComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<FeesType> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public feestypes: FeesTypes) {
      this.currentRecords = this.feestypes.query();
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
      this.feestypes.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.feestypes.query();
          this.showNotification(`${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.showNotification(err.message);
      });
    }

    goToAdd(): void {
      this.router.navigate(['fees-type/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`fees-type/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`fees-type/edit/${record.id}`]);
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