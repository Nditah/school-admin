import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ApiResponse} from '../../../models';

@Component({
  selector: 'app-example-add',
  templateUrl: './example-add.component.html',
  styleUrls: ['./example-add.component.scss']
})
export class ExampleAddComponent implements OnInit {

  @Input() currentForm: string;
  addForm: FormGroup;
  loading = false;
  // terminalOptions: Array<SelectOption>;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              ) {
      this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      sender_id: [''],
      recipient_id: ['', Validators.required],
      urgency: [''],
      distance: [''],
      mass: [''],
      volume: [''],
      worth: ['', Validators.required],
      is_fragile: ['', Validators.required],
      is_perishable: ['', Validators.required],
      is_combustible: ['', Validators.required],
      is_odiferous: ['', Validators.required],
      is_liquid: ['', Validators.required],
      is_unique: ['', Validators.required],
      description: ['', Validators.required],
      terminal_from: [''],
      terminal_to: [''],
      terminal_store: [''],
      travel_hour: [''],
      departure_date: ['', Validators.required],
      expected_date: ['', Validators.required],
      billing_type: ['', Validators.required],
      cost_estimate: ['', Validators.required],
      cost_payable: ['', Validators.required],
      delivery_type: [''],
      identification: [''],
      remark: [''],
      recipient_confirm: [''],
      recipient_confirm_date: [''],
      recipient_confirm_remark: [''],
      payment_gateway: [''],
      payment_method: [''],
      // delivery_status: ['']
    });
  }

  // ====================  All Methods to load external links for Object IDs  ======================= //
  // get customers for the select box
  // getCustomers() {
  //   this.customers.recordRetrieve().then(data => {
  //     if (data.success) {
  //       this.customerOptions = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.other_name}));
  //       console.log('List of customers  ================ \n' + JSON.stringify(this.customerOptions) );
  //     } else {
  //       this.showNotification('Could not retrieve customers');
  //       console.log(data.message);
  //     }
  //   });
  // }


  onSubmit() {
    this.loading = true;
    const payload = this.addForm.value;
    console.log('\n   terminal from = ' + payload.terminal_from);
    payload.terminal_store = payload.terminal_from;
    // payload.delivery_status = 'STORED';
    console.log(payload);
    // this.pmlShipments.recordCreate(payload).then((res: ApiResponse) => {
    //       console.log(res);
    //       if (res.success) {
    //         this.goToDetail(res.payload);
    //       } else {
    //         this.showNotification(res.message);
    //       }
    //     }).catch(error => {
    //       this.showNotification(error);
    //   });

    this.loading = false;
    return;
  }

  showNotification(message) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    });
  }

  // Navigation
  goToDetail(record: any): void {
    this.router.navigate([`pml-shipment/detail/${record.id}`]);
    return;
  }

  goBack() {
    window.history.back();
  }

}
