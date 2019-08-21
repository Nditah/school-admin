import { Staff } from './staff';
import { Classe } from './classe';

export class Student {
    id: string;
    surname: string;
    given_name: string;
    gender: string;
    birth_date: Date;
    address: string;
    state: any; // State
    county: any; // County
    email: string;
    phone: string;
    password: string;
    blood_group: string;
    classe: Classe;
    level: string;
    subsidiary: string;
    hostel: any; // Hostel
    photo: string;
    parents: Array<object>;
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

export interface Student {
    id: string;
    surname: string;
    given_name: string;
    gender: string;
    birth_date: Date;
    address: string;
    state: any; // State
    county: any; // County
    email: string;
    phone: string;
    password: string;
    blood_group: string;
    classe: Classe;
    level: string;
    subsidiary: string;
    hostel: any; // Hostel
    photo: string;
    parents: Array<object>;
    created_by: Staff;
    updated_by: Staff;
}
