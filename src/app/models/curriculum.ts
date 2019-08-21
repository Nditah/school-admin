import { Staff } from './staff';
// import { Scheme } from './scheme';
import { Book } from './book';

export class Curriculum {
    id: string;
    description: string;
    scheme_id: object;
    book_id: Book;
    materials: File;
    staff_id: Staff;
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

export interface Curriculum {
    id: string;
    description: string;
    scheme_id: object;
    book_id: Book;
    materials: File;
    staff_id: Staff;
    created_by: Staff;
    updated_by: Staff;
}
