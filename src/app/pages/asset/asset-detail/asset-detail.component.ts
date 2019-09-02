import { Component, OnInit, Input } from '@angular/core';
import { Asset } from '../../../models';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})
export class AssetDetailComponent implements OnInit {
  @Input() record: Asset;

  constructor() {
    console.log(this.record);
  }

  ngOnInit() {
  }

}
