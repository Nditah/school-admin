// import { Staff } from './staff';
// import { Voucher } from './voucher';
import { Payroll } from './payroll';

export class PayrollDetail {
    id : string;
    payroll_id :Payroll;
    code :	string;	
    staff_id : object;	
    salary :	Number;
    is_paid :	Boolean;	
    paid_date :	Date; 	
    paid_by : object;	
    remark 	: string;
    payment_method : string; 	
    payment_gateway : string;	
    payment_status : string;
    created_by?: object;
    created_at?: Date;
    updated_by?: object;
    updated_at?: Date;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface PayrollDetail {
    // [prop: string]: any;
    id : string;
    payroll_id :Payroll;
    code :	string;	
    staff_id : object;	
    salary :	Number;
    is_paid :	Boolean;	
    paid_date :	Date; 	
    paid_by : object;	
    remark 	: string;
    payment_method : string; 	
    payment_gateway : string;	
    payment_status : string;
    created_by?: object;
    created_at?: Date;
    updated_by?: object;
    updated_at?: Date;
}

