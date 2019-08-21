import { Staff } from './staff';

export class Parent {
    id: string;
    title: string;
    surname: string;
    given_name: string;
    gender: string;
    birth_date: Date;
    marital_status: string;
    address: string;
    state: any; // State
    county: any; // County
    email: string;
    phone: string;
    password: string;
    profession: string;
    employment_status: boolean;
    students_name: Array<object>;
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

export interface Parent {
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
    classe: any; // Classe
    level: string;
    subsidiary: string;
    hostel: any; // Hostel
    photo: string;
    students_name: Array<object>;
    created_by: Staff;
    updated_by: Staff;
}
