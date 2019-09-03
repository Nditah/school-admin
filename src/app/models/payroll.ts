import { PayrollDetail } from './payroll-detail';
import { Staff } from './staff';

export class Payroll {
    id: string;
    period: Date;
    code:	string;
    subsidiary: string;
    voucher:	any;
    payroll_detail_ids: PayrollDetail;
    total:	number;
    pay_start:	Date;
    remark: string;
    created_by: Staff;
    created_at: Date;
    updated_by: Staff;
    updated_at: Date;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface Payroll {
    id: string;
    period: Date;
    code:	string;
    subsidiary: string;
    voucher:	any;
    payroll_detail_ids: PayrollDetail;
    total:	number;
    pay_start:	Date;
    remark: string;
    created_by: Staff;
    created_at: Date;
    updated_by: Staff;
    updated_at: Date;
}

