// import { Staff } from './staff';
// import { Voucher } from './voucher';

export class Payroll {
    id: string;
    period : Date;	
    code :	string;
    subsidiary : string; 	
    voucher :	object; 	
    payroll_detail_ids : Object; 	
    total :	Number;	
    pay_start :	Date; 	
    remark : string;
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

export interface Payroll {
    // [prop: string]: any;
    id: string;
    period : Date;	
    code :	string;
    subsidiary : string; 	
    voucher :	object; 	
    payroll_detail_ids : Object; 	
    total :	Number;	
    pay_start :	Date; 	
    remark : string;
    created_by?: object;
    created_at?: Date;
    updated_by?: object;
    updated_at?: Date;
}

