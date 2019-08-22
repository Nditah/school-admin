import { Staff } from './staff';
import { Student } from './student';
import { FeesType } from './fees-type';

export class FeesPayment {
    id: string;
    fees_type_id: FeesType;
    student_id: Student;
    payment_method: string;
    amount: number;
    deposition: string;
    pay_date:Date;
    remark: string;
    status: string;
    created_by: Staff;
    updated_by: Staff;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface FeesPayment {
    id: string;
    fees_type_id: FeesType;
    student_id: Student;
    payment_method: string;
    amount: number;
    deposition: string;
    pay_date:Date;
    remark: string;
    status: string;
    created_by: Staff;
    updated_by: Staff;
}
