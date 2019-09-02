import { Component, OnInit } from '@angular/core';
import { Expense, Staff, SelectOption, ApiResponse } from '../../models';
import { Expenses, Staffs } from '../../providers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { isEqual } from '../../helpers';
import { NotificationService } from '../../services';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  searchForm: FormGroup;
  page_name = 'List of Expenses';
  currentRecords: Array<Expense>;
  loading = false;
  addForm: FormGroup;
  staffRecords: Array<Staff>;
  prevStaffRecords: Array<Staff>;
  staffOptions: SelectOption[];
  sidebarView: string;
  sidebarContent: string;
  activeSidebar = false;
  sidebarHeading: string;
  currentRecord: Expense;

  constructor(public expenses: Expenses,
              private notify: NotificationService,
              private _fb: FormBuilder,
              private staffs: Staffs) {
                this.currentRecords = this.expenses.query();
                this.staffRecords = this.staffs.query();
               }

  ngOnInit() {
    this.createForm();
  }

  ngDoCheck() {
    if (!isEqual(this.staffRecords, this.prevStaffRecords)) {
      this.prevStaffRecords = [...this.staffRecords];
     // this.getStaffOptions();
    }
  }

  createForm() {
    this.addForm = this._fb.group({
      amount: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  async onSubmit() {
    const payload = this.addForm.value;
    // let codeName;
    // if (payload.name.split(' ').length > 1) {
    //   const splitted = payload.name.split(' ');
    //   codeName = splitted[0].substring(0, 2).toUpperCase() + splitted[1].substring(0, 2).toUpperCase();
    // } else {
    //   codeName = payload.name.length > 7 ? payload.name.substring(0, 4).toUpperCase() : payload.name.substring(0, 3).toUpperCase();
    // }
    // const codeSubsidiary = payload.subsidiary.substring(0, 3).toUpperCase();
    // payload.code = codeName + codeSubsidiary;
    console.log(payload);
    try {
      const results = await this.expenses.recordCreate(payload);
      if (results.success) {
        this.addForm.reset();
        this.expenses.recordRetrieve().then((data: ApiResponse) => {
          if (data.success) {
            this.currentRecords = data.payload;
          }
        });
        // this.currentRecords = this.expenses.query();
        this.notify.showNotification('This expense has been added', 'success');
      } else {
        this.notify.showNotification(results.message, 'danger');
      }
    } catch (error) {
      this.notify.showNotification(error, 'danger');
    }
  }

  /**
   *
   * @param activePanel page to switch to in sidebar
   * @param status if active panel is form choose if you're adding or editing else add view
   * @param record the record to be editted or view
   */
  openSidebar(activePanel: string, status: string, record: Expense | null) {
    this.sidebarView = activePanel;
    this.sidebarContent = status;
    this.activeSidebar = true;
    this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Expense`;
    this.currentRecord = record;
    console.log(this.currentRecord);
  }

  /**
   * @description "Handle close right sidebar"
   */
  closeSidebar($event) {
    this.activeSidebar = $event;
  }

  onChange(event: any, name: string) {
    let codeName;
    if (name.split(' ').length > 1) {
      const splitted = name.split(' ');
      codeName = splitted[0].substring(0, 2).toUpperCase() + splitted[1].substring(0, 2).toUpperCase();
    } else {
      codeName = name.length > 7 ? name.substring(0, 4).toUpperCase() : name.substring(0, 3).toUpperCase();
    }
    const codeSubsidiary = event.target.value.substring(0, 3);
    const code = codeName + codeSubsidiary;
    console.log('?code=' + code);
    this.expenses.recordRetrieve('?code=' + code).then((data: ApiResponse) => {
      if (data.success) {
        if (data.payload.length > 0) {
          // tslint:disable-next-line: max-line-length
          this.notify.showNotification('A course with the code ' + code + ' already exist you may change the course name to resolve this conflict', 'info');
        } else {
          this.notify.showNotification('The generated course code is ' + code , 'success');
        }
      }
    });
  }

  // getStaffOptions() {
  //   this.staffOptions = this.staffRecords.map(options => (
  //     {
  //       id: options.id,
  //       text: `${options.surname} ${options.given_name}`
  //     }
  //   ));
  //   console.log(this.staffOptions);
  // }

  async returnResponse(event: any) {
    console.log(event);
    this.notify.showNotification(event.message, event.status);
    const results = await this.expenses.recordRetrieve();
    if (results.success) {
      this.currentRecords = results.payload;
    }
  }
}
