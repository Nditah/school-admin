import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HostelRoom, ApiResponse } from '../../models';
import { HostelRooms } from '../../providers';

@Component({
  selector: 'app-hostel-room',
  templateUrl: './hostel-room.component.html',
  styleUrls: ['./hostel-room.component.scss']
})
export class HostelRoomComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<HostelRoom> = [];
  loading = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              public hostelRooms: HostelRooms) {
      this.currentRecords = this.hostelRooms.query();
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
      this.hostelRooms.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.hostelRooms.query();
          this.showNotification(`${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.showNotification(err.message);
      });
    }

    goToAdd(): void {
      this.router.navigate(['hostel-room/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`hostel-room/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`hostel-room/edit/${record.id}`]);
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



 