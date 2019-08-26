import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HostelAllocations, FeesPayments, HostelBedspaces, Students } from '../../../providers';
import { ApiResponse, SelectOption, HostelAllocation } from '../../../models';

@Component({
  selector: 'app-hostel-allocation-add',
  templateUrl: './hostel-allocation-add.component.html',
  styleUrls: ['./hostel-allocation-add.component.scss']
})
export class HostelAllocationAddComponent implements OnInit {

  @Input() currentForm: string;
  addForm: FormGroup;
  loading = false;
  feesPaymentOptions: Array<SelectOption>;
  studentOptions: Array<SelectOption>;
  hostelBedspaceOptions: Array<SelectOption>;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private hostelAllocations: HostelAllocations,
              private feesPayments: FeesPayments,
              private students: Students,
              private hostelBedspaces : HostelBedspaces,
              private toastr: ToastrService,
               ) {
      this.createForm();
      this.getStudents();
      this.getFeesPayments();
      this.getHostelBedspaces();
  }

  ngOnInit() {
  }

  createForm() {
    this.addForm = this.formBuilder.group({
              bedspace: [''],
              fees_payment: [''],
              occupant: [''],
              description: [''],
    });
  }

  // ====================  All Methods to load external links for Object IDs  ======================= //
  // get hostelAllocations for the select box
  getStudents() {
    this.students.recordRetrieve().then(data => {
      if (data.success) {
        this.studentOptions = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.other_name}));
        console.log('List of hostelAllocations  ================ \n' + JSON.stringify(this.studentOptions) );
      } else {
        this.showNotification('Could not retrieve hostelAllocations');
        console.log(data.message);
      }
    });
  }

  getFeesPayments() {
    this.feesPayments.recordRetrieve().then(data => {
      if (data.success) {
        this.feesPaymentOptions = data.payload.map(item => ({id: item.id, text: item.amount}));
        console.log('List of feesPayments  ================ \n' + JSON.stringify(this.feesPaymentOptions) );
      } else {
        this.showNotification('Could not retrieve feesPayments');
        console.log(data.message);
      }
    });
  }
  getHostelBedspaces() {
    this.hostelBedspaces.recordRetrieve().then(data => {
      if (data.success) {
        this.hostelBedspaceOptions = data.payload.map(item => ({id: item.id, text: item.amount}));
        console.log('List of feesPayments  ================ \n' + JSON.stringify(this.hostelBedspaceOptions) );
      } else {
        this.showNotification('Could not retrieve feesPayments');
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
      this.hostelAllocations.recordCreate(payload).then((res: ApiResponse) => {
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
    this.router.navigate([`hostel-allocation/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`hostel-allocation/edit/${record.id}`]);
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
