import { Component, OnInit } from '@angular/core';
import { Parent } from '../../models';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services';
import { Parents } from '../../providers';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  searchForm: FormGroup;
  currentRecords: Array<Parent>;
  loading = false;
  activeSidebar = false;
  page_name = 'List of Parents';

  constructor(private router: Router,
              private notify: NotificationService,
              private parents: Parents) {
                this.currentRecords = this.parents.query();
              }

  ngOnInit() {
    // this.notify.showNotification('Showing records of Parents', 'info');
  }

  async search(data) {
    const queryString = `?q=${data.searchString}`;
    console.log(data);
  }

  closeSideBar($event) {
    this.activeSidebar = $event;
  }

  goToAdd() {
    this.router.navigate(['parent/add']);
  }

  goToDetail(record) {
    this.router.navigate([`parent/detail/${record.id}`]);
  }

  goToEdit(record) {
    this.router.navigate([`parent/edit/${record.id}`]);
  }
  removeRecord(record) {
    // delete method
  }

}
