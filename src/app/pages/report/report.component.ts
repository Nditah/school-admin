import { Component, OnInit } from '@angular/core';
import { Report, Student, SelectOption, Marksheet, ApiResponse } from '../../models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Reports, Students, Marksheets } from '../../providers';
import { NotificationService } from '../../services';
import { isEqual } from '../../helpers';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  searchForm: FormGroup;
  page_name = 'List of Reports';
  currentRecords: Array<Report>;
  loading = false;
  addForm: FormGroup;
  studentRecords: Array<Student>;
  prevStudentRecords: Array<Student>;
  studentOptions: SelectOption[];
  marksheetRecords: Array<Marksheet>;
  prevMarkRecords: Array<Marksheet>;
  marksheetOptions: SelectOption[];
  sidebarView: string;
  sidebarContent: string;
  activeSidebar = false;
  sidebarHeading: string;
  currentRecord: Report;

  constructor(private reports: Reports,
              private notify: NotificationService,
              private _fb: FormBuilder,
              private students: Students,
              private marksheets: Marksheets) {
                this.currentRecords = this.reports.query();
                this.studentRecords = this.students.query();
                this.marksheetRecords = this.marksheets.query();
              }

  ngOnInit() {
    this.createForm();
  }

  ngDoCheck() {
    if (!isEqual(this.marksheetRecords, this.prevMarkRecords)) {
      this.prevMarkRecords = [...this.marksheetRecords];
      this.getMarkOptions();
    }

    if (!isEqual(this.studentRecords, this.prevStudentRecords)) {
      this.prevStudentRecords = [...this.studentRecords];
      this.getStudentOptions();
    }
  }

  getMarkOptions() {
    this.marksheetOptions = this.marksheetRecords.map(options => (
      {
        id: options.id,
        text: `${options.type}`
      }
    ));
    console.log(this.marksheetOptions);
  }

  getStudentOptions() {
    this.studentOptions = this.studentRecords.map(options => (
      {
        id: options.id,
        text: `${options.surname} ${options.given_name}`
      }
    ));
    console.log(this.studentOptions);
  }

  createForm() {
    this.addForm = this._fb.group({
      type: [''],
      term: [''],
      cumulated: [''],
      student: [''],
      marksheets: [''],
      evaluation: [''],
      total: [''],
      rank: [''],
    });
  }

  async onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;

    try {
      const results = await this.reports.recordCreate(payload);
      if (results.success) {
        this.addForm.reset();
        this.reports.recordRetrieve().then((data: ApiResponse) => {
          if (data.success) {
            this.currentRecords = data.payload;
          }
        });
        this.notify.showNotification('This report has been created successfully', 'success');
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
  openSidebar(activePanel: string, status: string, record: Report | null) {
    this.sidebarView = activePanel;
    this.sidebarContent = status;
    this.activeSidebar = true;
    this.sidebarHeading = `${status.replace(/^[a-zA-Z]/, (c) => c.toUpperCase())} Report`;
    this.currentRecord = record;
    console.log(this.currentRecord);
  }

  /**
   * @description "Handle close right sidebar"
   */
  closeSidebar($event) {
    this.activeSidebar = $event;
  }

}
