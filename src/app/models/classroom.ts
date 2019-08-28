import { Staff } from './staff';
import { Classe } from './classe';

export class Classroom {
    id: string;
    name: string;
    block: string;
    level: string;
    subsidiary: string;
    classe: Classe;
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

export interface Classroom {
    id: string;
    name: string;
    block: string;
    level: string;
    subsidiary: string;
    classe: Classe;
    created_by: Staff;
    updated_by: Staff;
    }
    





