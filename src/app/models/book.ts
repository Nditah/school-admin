// import { Staff } from './staff';
// import { Classe } from './classe';
// import { Classe } from './classe';

export class Book {
    id: string;
    title: string;
    subsidiary: string;
    description: string;
    classe_id: object;
    subject_id: object;
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

export interface Book {
    id: string;
    title: string;
    subsidiary: string;
    description: string;
    classe_id: object;
    subject_id: object;
    created_by: object;
    updated_by: object;
}
