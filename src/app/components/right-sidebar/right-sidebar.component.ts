import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit, OnChanges {
 @Input() activeSidebar: boolean;
 @Input() zIndex: number;
 @Output() closeSidebar = new EventEmitter<boolean>();
 sidebar: boolean;

  constructor() {}

  ngOnInit() {
    this.sidebar = this.activeSidebar;
  }
  ngOnChanges() {
    this.sidebar =  this.activeSidebar;
  }

  closeView() {
    this.closeSidebar.emit(false);
  }


}
