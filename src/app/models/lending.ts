// import { Staff } from './staff';
// import { Student } from './student';

export class Lending {
    id: string;
    user_type:  string;
    staff_id: object;
    student_id: object;
    request_date: Date;
    classe_id: object;
    book_id: object;
    issued_date: Date;
    issued_by:  object;
    issuer_remark: string;
    request_status: string;
    lending_status: string;
    is_returnable: boolean;
    expected_returned_date: Date;
    actual_returned_date: Date;
    collected_date: Date;
    collected_by: object;
    collected_remark: string;
    created_by: object;
    updated_by: object;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface Lending {
    id: string;
    user_type:  string;
    staff_id: object;
    student_id: object;
    request_date: Date;
    classe_id: object;
    book_id: object;
    issued_date: Date;
    issued_by:  object;
    issuer_remark: string;
    request_status: string;
    lending_status: string;
    is_returnable: boolean;
    expected_returned_date: Date;
    actual_returned_date: Date;
    collected_date: Date;
    collected_by: object;
    collected_remark: string;
    created_by: object;
    updated_by: object;
}
