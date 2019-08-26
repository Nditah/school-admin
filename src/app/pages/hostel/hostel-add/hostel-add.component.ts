import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hostels, Fees, Counties, States } from '../../../providers';
import {ApiResponse, SelectOption, Hostel, Course, Staff, County } from '../../../models';

@Component({
  selector: 'app-hostel-add',
  templateUrl: './hostel-add.component.html',
  styleUrls: ['./hostel-add.component.scss']
})
export class HostelAddComponent implements OnInit {

  @Input() currentForm: string;
  addForm: FormGroup;
  loading = false;
  feeOptions: Array<SelectOption>;
  stateOptions: Array<SelectOption>;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private hostels: Hostels,
              private fees: Fees,
              private states: States,
              private toastr: ToastrService,
               ) {
      this.createForm();
      this.getStates();
      this.getFees();
  }

  ngOnInit() {
  }

  createForm() {
    this.addForm = this.formBuilder.group({
              block: [''],
              hall: ['', Validators.required],
              hostel_fees: [''],
              description: [''],
              status: [''],
    });
  }

  // ====================  All Methods to load external links for Object IDs  ======================= //
  // get hostels for the select box
  getStates() {
    this.hostels.recordRetrieve().then(data => {
      if (data.success) {
        this.stateOptions = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.other_name}));
        console.log('List of hostels  ================ \n' + JSON.stringify(this.stateOptions) );
      } else {
        this.showNotification('Could not retrieve hostels');
        console.log(data.message);
      }
    });
  }

  getFees() {
    this.fees.recordRetrieve().then(data => {
      if (data.success) {
        this.feeOptions = data.payload.map(item => ({id: item.id, text: item.amount}));
        console.log('List of fees  ================ \n' + JSON.stringify(this.feeOptions) );
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
      this.hostels.recordCreate(payload).then((res: ApiResponse) => {
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
    this.router.navigate([`hostel/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`hostel/edit/${record.id}`]);
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
