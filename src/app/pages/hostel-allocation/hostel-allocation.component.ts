import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HostelAllocation, ApiResponse } from '../../models';
import { HostelAllocations } from '../../providers';

@Component({
  selector: 'app-hostel-allocation',
  templateUrl: './hostel-allocation.component.html',
  styleUrls: ['./hostel-allocation.component.scss']
})
export class HostelAllocationComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<HostelAllocation> = [];
  loading = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              public hostelAllocations: HostelAllocations) {
      this.currentRecords = this.hostelAllocations.query();
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
      this.hostelAllocations.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.hostelAllocations.query();
          this.showNotification(`${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.showNotification(err.message);
      });
    }

    goToAdd(): void {
      this.router.navigate(['hostel-allocation/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`hostel-allocation/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`hostel-allocation/edit/${record.id}`]);
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



 