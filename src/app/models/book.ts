import { Staff } from './staff';
import { Classe } from './classe';
import { Subject } from './subject';

export class Book {
    id: string;
    title: string;
    subsidiary: string;
    description: string;
    classe_id: Classe;
    subject_id: Subject;
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

export interface Book {
    id: string;
    title: string;
    subsidiary: string;
    description: string;
    classe_id: Classe;
    subject_id: Subject;
    created_by: Staff;
    updated_by: Staff;
}
