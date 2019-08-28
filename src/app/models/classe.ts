import { Staff } from './staff';
import { Student } from './student';

export class Classe {
    id: string;
    name: string;
    code: string;
    subsidiary: string;
    level: string;
    master: Staff;
    prefect: Student;
    classroom: any;
    category: any;
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

export interface Classe {
    id: string;
    name: string;
    code: string;
    subsidiary: string;
    level: string;
    master: Staff;
    prefect: Student;
    classroom: any;
    category: any;
    created_by: Staff;
    updated_by: Staff;
    }
