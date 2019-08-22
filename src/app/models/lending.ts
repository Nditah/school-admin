import { Staff } from './staff';
import { Student } from './student';
import { Classe } from './classe';
import { Book } from './book';

export class Lending {
    id: string;
    user_type:  string;
    staff_id: Staff;
    student_id: Student;
    request_date: Date;
    classe_id: Classe;
    book_id: Book;
    issued_date: Date;
    issued_by:  Staff;
    issuer_remark: string;
    request_status: string;
    lending_status: string;
    is_returnable: boolean;
    expected_returned_date: Date;
    actual_returned_date: Date;
    collected_date: Date;
    collected_by: Staff;
    collected_remark: string;
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

export interface Lending {
    id: string;
    user_type:  string;
    staff_id: Staff;
    student_id: Student;
    request_date: Date;
    classe_id: Classe;
    book_id: Book;
    issued_date: Date;
    issued_by:  Staff;
    issuer_remark: string;
    request_status: string;
    lending_status: string;
    is_returnable: boolean;
    expected_returned_date: Date;
    actual_returned_date: Date;
    collected_date: Date;
    collected_by: Staff;
    collected_remark: string;
    created_by: Staff;
    updated_by: Staff;
}
