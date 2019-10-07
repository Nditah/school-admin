import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Curriculum, ApiResponse } from '../../models';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services';
import { Curriculums } from 'src/app/providers';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

  searchForm: FormGroup;
  record: Curriculum;
  currentRecords: Array<Curriculum>;
  loading = false;
  activeSidebar = false;
  page_name = 'List of Curriculums';

  constructor(private router: Router,
              private notify: NotificationService,
              private formBuilder: FormBuilder,
              public curriculums: Curriculums) {
                this.currentRecords = this.curriculums.query();
                this.searchForm = this.formBuilder.group({
                  searchString: ['', Validators.required],
                });
              }

  ngOnInit() {
  }

  async search(data)  {
    const queryString = `?q=${data.searchString}`;
    console.log(data);
    this.curriculums.recordRetrieve(queryString).then((res: ApiResponse) => {
      if (res.success) {
        this.currentRecords = this.curriculums.query();
        this.notify.showNotification(`${res.payload.length} 'record(s) found!'`, 'success');
        this.notify.showNotification('Showing list of Curriculums', 'succes');
      }
    }).catch(err => {
      this.notify.showNotification(err.message);
    });
  }

  closeSidebar($event) {
    this.activeSidebar = $event;
  }

  goToAdd(): void {
    this.router.navigate(['curriculum/add']);
  }

  goToDetail(record: any): void {
    this.router.navigate([`curriculum/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`curriculum/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

  removeRecord(record) {
    console.log(record.id);
  }

}
