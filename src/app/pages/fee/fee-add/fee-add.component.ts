import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fees, Classes } from '../../../providers';
import {ApiResponse, SelectOption, Fee, Classe } from '../../../models';

@Component({
  selector: 'app-fee-add',
  templateUrl: './fee-add.component.html',
  styleUrls: ['./fee-add.component.scss']
})
export class FeeAddComponent implements OnInit {

  @Input() currentForm: string;
  addForm: FormGroup;
  loading = false;
  feeOptions: Array<SelectOption>;
  classeOptions: Array<SelectOption>;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fees: Fees,
              private classes: Classes,
              private toastr: ToastrService,
               ) {
      this.createForm();
      this.getClasses();
  }

  ngOnInit() {
  }

  createForm() {
    this.addForm = this.formBuilder.group({
              type: [''],
              amount: ['', Validators.required],
              classe: [''],
              description: [''],
    });
  }

  // ====================  All Methods to load external links for Object IDs  ======================= //
  // get fees for the select box
  getClasses() {
    this.fees.recordRetrieve().then(data => {
      if (data.success) {
        this.classeOptions = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.other_name}));
        console.log('List of fees  ================ \n' + JSON.stringify(this.classeOptions) );
      } else {
        this.showNotification('Could not retrieve fees');
        console.log(data.message);
      }
    });
  }

  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    console.log(payload);
    if (this.addForm.invalid) {
      this.showNotification('Invalid form! Please fill all the required* inputs.');
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
          this.showNotification(res.message);
        }
      }, (err) => this.showNotification(err.message));
    } catch (error) {
      this.showNotification(error.message);
    }
    this.loading = false;
    return;
  }

  goToDetail(record: any): void {
    this.router.navigate([`fee/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`fee/edit/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

  showNotification(message) {
    this.toastr.show(message, 'Adding Record', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
    }

}
