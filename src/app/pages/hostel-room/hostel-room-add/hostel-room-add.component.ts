import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HostelRooms, FeesPayments, HostelBedspaces, Hostels } from '../../../providers';
import { ApiResponse, SelectOption, HostelRoom } from '../../../models';

@Component({
  selector: 'app-hostel-room-add',
  templateUrl: './hostel-room-add.component.html',
  styleUrls: ['./hostel-room-add.component.scss']
})
export class HostelRoomAddComponent implements OnInit {

  @Input() currentForm: string;
  addForm: FormGroup;
  loading = false;
  feesPaymentOptions: Array<SelectOption>;
  hostelOptions: Array<SelectOption>;
  hostelBedspaceOptions: Array<SelectOption>;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private hostelRooms: HostelRooms,
              private feesPayments: FeesPayments,
              private hostels: Hostels,
              private hostelBedspaces : HostelBedspaces,
              private toastr: ToastrService,
               ) {
      this.createForm();
      this.getHostels();
      this.getFeesPayments();
      this.getHostelBedspaces();
  }

  ngOnInit() {
  }

  createForm() {
    this.addForm = this.formBuilder.group({
              hostel: [''],
              code: [''],
              hostel_bedspaces: [''],
              floor: [''],
              status: [''],
              description: [''],
    });
  }

  // ====================  All Methods to load external links for Object IDs  ======================= //
  // get hostelRooms for the select box
  getHostels() {
    this.hostels.recordRetrieve().then(data => {
      if (data.success) {
        this.hostelOptions = data.payload.map(item => ({id: item.id, text: item.hall + ' ' + item.block}));
        console.log('List of hostelRooms  ================ \n' + JSON.stringify(this.hostelOptions) );
      } else {
        this.showNotification('Could not retrieve hostelRooms');
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
      this.hostelRooms.recordCreate(payload).then((res: ApiResponse) => {
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
    this.router.navigate([`hostel-room/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`hostel-room/edit/${record.id}`]);
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
