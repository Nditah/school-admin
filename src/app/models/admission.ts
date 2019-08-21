// import { Staff } from './staff';

export class Admission {
    id: string;
    passport: string;
    surname: string;
    county_id: Object;
    state_id: Object;
    birth_date: string;
    religion: string;
    denomination: string;
    last_class: Object;
    intending_class: Object;
    last_school: string;
    father_name: string;
    mother_name: string;
    home_address: string;
    phone: string;
    // created_by?: Staff;
    // updated_by?: Staff;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface Admission {
   // [prop: string]: any;
   id: string;
    passport: string;
    surname: string;
    county_id: Object;
    state_id: Object;
    birth_date: string;
    religion: string;
    denomination: string;
    last_class: Object;
    intending_class: Object;
    last_school: string;
    father_name: string;
    mother_name: string;
    home_address: string;
    phone: string;
    // created_by?: Staff;
    // updated_by?: Staff;
}
