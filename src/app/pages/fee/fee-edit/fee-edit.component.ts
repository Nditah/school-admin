import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectOption, ApiResponse, Fee, Classe } from '../../../models';
import { Fees, Classes } from '../../../providers';
import { deepPropsExist } from '../../../helpers';

@Component({
  selector: 'app-fee-edit',
  templateUrl: './fee-edit.component.html',
  styleUrls: ['./fee-edit.component.scss']
})
export class FeeEditComponent implements OnInit {

  page_name = 'Edit Fee';
  loading = false;
  editForm: FormGroup;
  record: Fee;
  feeRecords: Array<Fee>;
  feeOptions: SelectOption;
  classeRecords: Array<Classe>;
  classeOptions: SelectOption;
  router: Router;

  constructor(private _fb: FormBuilder,
              private fees: Fees,
              private classes: Classes) {
                this.feeRecords = this.fees.query();
                this.classeRecords = this.classes.query();
              }

  ngOnInit() {
    this.createForm();
    this.setForm();
  }
  createForm() {
    this.editForm = this._fb.group({
      type: [''],
      amount: [''],
      classe: [''],
      description: [''],
      
    });
  }

  setForm() {
    this.editForm.patchValue({
      type: deepPropsExist(this.record, 'type') ? this.record.type : '',
      amount: deepPropsExist(this.record, 'amount') ? this.record.amount : '',
      classe: deepPropsExist(this.record, 'classe') ? this.record.classe : '',
      description: deepPropsExist(this.record, 'description') ? this.record.description : '',

    });
  }

  async onSubmit() {
    this.loading = true;
    const payload = this.editForm.value;
    console.log(payload);
    if (this.editForm.invalid) {
      console.log('Invalid form! Please fill all the required* inputs.');
      // this.showNotification('Invalid form! Please fill all the required* inputs.');
      this.loading = false;
      return;
    }
    try {
      console.log(payload);
      this.fees.recordCreate(payload).then((res: ApiResponse) => {
          console.log(res);
          if (res.success) {
          this.goToDetail(res.payload);
        } else {
          console.log(res.message);
          // this.showNotification(res.message);
        }
      }, (err) => console.log(err.message));
    } catch (error) {
      // this.showNotification(error.message);
    }
    this.loading = false;
    return;
  }

  goToDetail(record: any): void {
    this.router.navigate([`fee/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
