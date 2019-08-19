import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse} from '../../models';
import { getLocalStorage } from '../../helpers';


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {


  searchForm: FormGroup;
  loading = false;
  updateForm: FormGroup;
  activeSidebar = false;
  currentForm = 'create';

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    ) {
      // this.currentRecords = this.pmlShipments.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

    ngOnInit() {
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      // this.pmlShipments.recordRetrieve(queryString).then((res: ApiResponse) => {
      //   if (res.success) {
      //     this.currentRecords = this.pmlShipments.query();
      //     this.showNotification(`${res.payload.length} record(s) found!`);
      //   }
      // }).catch(err => {
      //   this.showNotification(err.message);
      // });
    }

  /**
   * @description "Handle close right sidebar"
   */
  closeSidebar($event) {
    this.activeSidebar = $event;
  }

    goToAdd(): void {
      this.router.navigate(['example/add']);
    }

    goToDetail(record: any): void {
      this.router.navigate([`example/detail/${record.id}`]);
      return;
    }

    goToEdit(record: any): void {
      this.router.navigate([`example/edit/${record.id}`]);
    }

    removeRecord(record) {
      console.log(record.id);
    }

    showNotification(message) {
      this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-primary alert-with-icon',
        });
      }
}
