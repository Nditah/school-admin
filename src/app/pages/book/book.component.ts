import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Book, ApiResponse, Subject, SelectOption } from '../../models';
import { Books, Subjects } from '../../providers';
import { NotificationService } from '../../services';
import { isEqual } from '../../helpers';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  page_name = 'List of Books';
  addForm: FormGroup;
  searchForm: FormGroup;
  records: Array<Book>;
  prevRecords: Array<Book>;
  subjectRecords: Array<Subject>;
  prevSubjectRecords: Array<Subject>;
  subjectOptions: Array<SelectOption>;
  loading = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private notify: NotificationService,
              public books: Books,
              public _fb: FormBuilder,
              private subjects: Subjects) {
      this.records = this.books.query();
      this.subjectRecords = this.subjects.query();
      this.searchForm = this.formBuilder.group({
        searchString: ['', Validators.required],
      });
    }

    ngOnInit() {
      this.createForm();
    }

    ngDoCheck() {
      console.log('Checking.....');
      if (!isEqual(this.subjectRecords, this.prevSubjectRecords)) {
        this.prevSubjectRecords = [...this.subjectRecords];
        this.generateSubjectOptions();
      }
    }

    async search(data) {
      const queryString = `?q=${data.searchString}`; // queryString
      console.log(data);
      this.books.recordRetrieve(queryString).then((res: ApiResponse) => {
        if (res.success) {
          this.records = this.books.query();
          this.notify.showNotification(`${res.payload.length} record(s) found!`);
        }
      }).catch(err => {
        this.notify.showNotification(err.message);
      });
    }

    async onSubmit() {

    }

    createForm() {
      this.addForm = this._fb.group({
        title: ['', Validators.required],
        subject: ['', Validators.required],
        author: [''],
        description: ['', Validators.required],
        level: [''],
        subsidiary: ['']
      });
    }

    generateSubjectOptions() {
      this.subjectOptions = this.subjectRecords.map(options => ({
        id: options.id,
        text: options.name
      }));
    }

    removeRecord(record) {
      console.log(record.id);
    }
}
