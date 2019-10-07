import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HostelBedspaces, HostelRooms, Students } from '../../../providers';
import { ApiResponse, SelectOption, HostelBedspace } from '../../../models';

@Component({
  selector: 'app-hostel-bedspace-add',
  templateUrl: './hostel-bedspace-add.component.html',
  styleUrls: ['./hostel-bedspace-add.component.scss']
})
export class HostelBedspaceAddComponent implements OnInit {

  @Input() currentForm: string;
  addForm: FormGroup;
  loading = false;
  studentOptions: Array<SelectOption>;
  hostelRoomOptions: Array<SelectOption>;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private hostelBedspaces: HostelBedspaces,
              private students: Students,
              private hostelRooms : HostelRooms,
              private toastr: ToastrService,
               ) {
      this.createForm();
      this.getStudents();
      this.getHostelRooms();
  }

  ngOnInit() {
  }

  createForm() {
    this.addForm = this.formBuilder.group({
              room: [''],
              code: [''],
              occupant: [''],
              description: [''],
    });
  }

  // ====================  All Methods to load external links for Object IDs  ======================= //
  // get hostelBedspaces for the select box
  getStudents() {
    this.students.recordRetrieve().then(data => {
      if (data.success) {
        this.studentOptions = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.given_name}));
        console.log('List of hostelBedspaces  ================ \n' + JSON.stringify(this.studentOptions) );
      } else {
        this.showNotification('Could not retrieve hostelBedspaces');
        console.log(data.message);
      }
    });
  }

  getHostelRooms() {
    this.hostelRooms.recordRetrieve().then(data => {
      if (data.success) {
        this.hostelRoomOptions = data.payload.map(item => ({id: item.id, text: item.code}));
        console.log('List of feesPayments  ================ \n' + JSON.stringify(this.hostelRoomOptions) );
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
      this.hostelBedspaces.recordCreate(payload).then((res: ApiResponse) => {
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
    this.router.navigate([`hostel-bedspace/detail/${record.id}`]);
    return;
  }

  goToEdit(record: any): void {
    this.router.navigate([`hostel-bedspace/edit/${record.id}`]);
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
