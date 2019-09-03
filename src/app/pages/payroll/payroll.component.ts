import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Payroll, PayrollDetail, SelectOption, ApiResponse } from 'src/app/models';
import { NotificationService } from 'src/app/services';
import { Payrolls } from 'src/app/providers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {

  searchForm: FormGroup;
  record: Payroll;
  currentRecords: Array<Payroll>;
  loading = false;
  activeSidebar = false;
  page_name = 'Payrolls';
  addForm: FormGroup;
  sidebarView: string;
  sidebarContent: string;
  sidebarHeading: string;
  currentRecord: Payroll;

  constructor(private router: Router,
              private notify: NotificationService,
              private formBuilder: FormBuilder,
              private payrolls: Payrolls) {
      this.currentRecords = this.payrolls.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

    ngOnInit() {
      this.createForm();
    }

    createForm() {
      this.addForm = this.formBuilder.group({
        period: [''],
        code:	[''],
        subsidiary: [''],
        voucher:	[''],
        payroll_detail_ids: [''],
        total:	[''],
        pay_start:	[''],
        remark: [''],
      });
    }

    async onSubmit() {
      this.loading = true;
      const payload = this.addForm.value;
      try {
        const results = await this.payrolls.recordCreate(payload);
        if (results.success) {
          this.addForm.reset();
          this.payrolls.recordRetrieve().then((data: ApiResponse) => {
            if (data.success) {
              this.currentRecords = data.payload;
            }
          });
          this.notify.showNotification('This payroll has been created successfully', 'success');
        } else {
          this.notify.showNotification(results.message, 'danger');
        }
      } catch (error) {
        this.notify.showNotification(error, 'danger');
      } finally {
        this.loading = false;
      }
    }

    /**
     *
     * @param activePanel page to switch to in sidebar
     * @param status if active panel is form choose if you're adding or editing else add view
     * @param record the record to be editted or view
     */
    openSidebar(activePanel: string, status: string, record: Payroll | null) {
      this.sidebarView = activePanel;
      this.sidebarContent = status;
      this.activeSidebar = true;
      this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Payroll`;
      this.currentRecord = record;
      console.log(this.currentRecord);
    }

    /**
     * @description "Handle close right sidebar"
     */
    closeSidebar($event) {
      this.activeSidebar = $event;
    }

    async returnResponse(event: any) {
      console.log(event);
      this.notify.showNotification(event.message, event.status);
      const results = await this.payrolls.recordRetrieve();
      if (results.success) {
        this.currentRecords = results.payload;
      }
    }

}
