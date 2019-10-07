import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { Expense, Staff, SelectOption } from '../../../models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { deepPropsExist, isEqual } from '../../../helpers';
import { NotificationService } from '../../../services';
import { Expenses } from '../../../providers';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.scss']
})
export class ExpenseEditComponent implements OnInit {
  @Input() record: Expense | null;
  @Input() formType: string;
  @Input() staffRecords: Array<Staff>;
  @Output() returnResponse: EventEmitter<any> =  new EventEmitter();
  prevStaffRecords: Array<Staff>;
  prevRecords: Expense | null;
  staffOptions: Array<SelectOption>;
  editForm: FormGroup;
  loading = false;

  constructor(public _fb: FormBuilder,
              private expenses: Expenses, ) {
   }

  ngOnInit() {
    this.updateForm();
  }

  ngDoCheck() {
    if (!isEqual(this.record, this.prevRecords)) {
      this.prevRecords = this.record;
      this.setForm();
    }
  }

  ngOnChanges() {
    if (!isEqual(this.staffRecords, this.prevStaffRecords)) {
      this.prevStaffRecords = [...this.staffRecords];
     // this.getStaffOptions();
    }
  }

  async onSubmit() {
    const payload  = this.editForm.value;
    try {
      const result = await this.expenses.recordUpdate(this.record, payload);
      if (result.success) {
        this.returnResponse.emit({message: 'This expense has been updated', status: 'success'});
        // this.notify.showNotification('This expense has been updated', 'success');
      } else {
        this.returnResponse.emit({message: result.message, status: 'danger'});
        // this.notify.showNotification(result.message, 'danger');
      }
    } catch (error) {
      this.returnResponse.emit({message: error, status: 'danger'});
      // this.notify.showNotification(error, 'danger');
    }
  }

  updateForm() {
    this.editForm = this._fb.group({
      amount: ['', Validators.required],
      description: ['', Validators.required],
     
    });
  }

  setForm() {
    this.editForm.patchValue({
      amount: deepPropsExist(this.record, 'amount') ? this.record.amount : '',
      description: deepPropsExist(this.record, 'description') ? this.record.description : '',
      
    });
  }

  // getStaffOptions() {
  //   this.staffOptions = this.staffRecords.map(options => (
  //     {
  //       id: options.id,
  //       text: `${options.surname} ${options.given_name}`
  //     }
  //   ));
  //   console.log(this.staffOptions);
  // }

}
