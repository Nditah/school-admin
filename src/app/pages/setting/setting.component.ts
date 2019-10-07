import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Setting, ApiResponse } from '../../models';
import { Settings } from '../../providers';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {


  searchForm: FormGroup;
  currentRecords: Array<Setting> = [];
  loading = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public settings: Settings) {
      this.currentRecords = this.settings.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

    ngOnInit() {
    }

    goToAdd() {
      // console.log();
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      this.settings.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.currentRecords = this.settings.query();
          this.showNotification(`${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.showNotification(err.message);
      });
    }

    goToDetail(record: any): void {
      this.router.navigate([`setting/detail/${record.id}`]);
      return;
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
