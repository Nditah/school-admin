// import { Staff } from './staff';
// import { Scheme } from './scheme';
// import { Book } from './book';

export class Curriculum {
    id: string;
    description: string;
    scheme_id: object;
    book_id: object;
    materials: File;
    staff_id: object;
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

export interface Curriculum {
    id: string;
    description: string;
    scheme_id: object;
    book_id: object;
    materials: File;
    staff_id: object;
    created_by: object;
    updated_by: object;
}
