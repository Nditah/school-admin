import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectOption, ApiResponse } from '../../../models';
@Component({
  selector: 'app-example-edit',
  templateUrl: './example-edit.component.html',
  styleUrls: ['./example-edit.component.scss']
})
export class ExamplEditComponent implements OnInit {
  editForm: FormGroup;
  loading = false;
  customer: SelectOption;
  terminal: SelectOption;
  // record: PmlShipment;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {
    // get current billing id
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // const record = this.pmlShipments.query({id})[0];
    // if (!!record) {
    //   this.record = record;
    // } else {
    //   this.goBack();
    // }
    this.createForm();
  }
  ngOnInit() {
  }
  createForm() {
    this.editForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      sender_id: ['', Validators.required],
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
      is_solid: ['', Validators.required],
      is_unique: ['', Validators.required],
      description: ['', Validators.required],
      terminal_to: [''],
      terminal_store: [''],
      travel_hour: [''],
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
      payment_method: ['']
    });
  }
  // ======== set Values for the form here ========== //
  // setForm() {
  //   this.editForm.get('name').setValue(this.record.name || '');
  //   this.editForm.get('code').setValue(this.record.code || '');
  //   this.editForm.get('sender_id').setValue(this.record.sender_id ? this.record.sender_id.id : '');
  //   this.editForm.get('recipient_id').setValue(this.record.recipient_id ? this.record.recipient_id.id : '');
  //   this.editForm.get('urgency').setValue(this.record.urgency || '');
  //   this.editForm.get('distance').setValue(this.record.distance || '');
  //   this.editForm.get('mass').setValue(this.record.mass || '');
  //   this.editForm.get('volume').setValue(this.record.volume || '');
  //   this.editForm.get('worth').setValue(this.record.worth || '');
  //   this.editForm.get('is_fragile').setValue(this.record.is_fragile || '');
  //   this.editForm.get('is_perishable').setValue(this.record.is_perishable || '');
  //   this.editForm.get('is_combustible').setValue(this.record.is_combustible || '');
  //   this.editForm.get('is_odiferous').setValue(this.record.is_odiferous || '');
  //   this.editForm.get('is_solid').setValue(this.record.is_solid || '');
  //   this.editForm.get('is_unique').setValue(this.record.is_unique || '');
  //   this.editForm.get('description').setValue(this.record.description || '');
  //   this.editForm.get('terminal_to').setValue(this.record.terminal_to.id || '');
  //   // do this coz of the objectId to avoid errors
  //   if (this.record.terminal_store !== null) {
  //     this.editForm.get('terminal_store').setValue(this.record.terminal_store.id);
  //   } else {
  //     this.editForm.get('terminal_store').setValue('');
  //   }
  //   this.editForm.get('travel_hour').setValue(this.record.travel_hour || '');
  //   this.editForm.get('billing_type').setValue(this.record.billing_type || '');
  //   this.editForm.get('cost_estimate').setValue(this.record.cost_estimate || '');
  //   this.editForm.get('cost_payable').setValue(this.record.cost_payable || '');
  //   this.editForm.get('delivery_type').setValue(this.record.delivery_type || '');
  //   this.editForm.get('identification').setValue(this.record.identification || '');
  //   this.editForm.get('remark').setValue(this.record.remark || '');
  //   this.editForm.get('recipient_confirm').setValue(this.record.recipient_confirm || '');
  //   this.editForm.get('recipient_confirm_date').setValue(this.record.recipient_confirm_date || '');
  //   this.editForm.get('recipient_confirm_remark').setValue(this.record.recipient_confirm_remark || '');
  //   this.editForm.get('payment_gateway').setValue(this.record.payment_gateway || '');
  //   this.editForm.get('payment_method').setValue(this.record.payment_method || '');
  // }
  // ====================  All Methods to load external links for Object IDs  ======================= //
  // get customers for the select box
  // getCustomers() {
  //   this.customers.recordRetrieve().then(data => {
  //     if (data.success) {
  //       this.customer = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.other_name}));
  //       console.log('List of customers  ================ \n' + JSON.stringify(this.customer) );
  //     } else {
  //       this.showNotification('Could not retrieve customers');
  //       console.log(data.message);
  //     }
  //   });
  // }
  // ============ SUBMIT METHOD
  onSubmit() {
    this.loading = true;
    const payload = this.editForm.value;
    // try {
    payload.distance = `${payload.distance}`;
    console.log(payload);
    // this.pmlShipments.recordUpdate(this.record, payload).then((res: ApiResponse) => {
    //     console.log(res);
    //     if (res.success) {
    //       this.goToDetail(res.payload);
    //     } else {
    //       this.showNotification(res.message);
    //     }
    //   }, (err) => this.showNotification(err.message)
    //   ).catch( (err: ApiResponse) => {
    //     this.showNotification(err.message);
    //   });
    // } catch (error) {
    //   this.showNotification(error.message);
    // }
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

