import { Staff } from './staff';
import { Student } from './student';

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
    students_name: Array<Student>;
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
    students_name: Array<Student>;
    created_by: Staff;
    updated_by: Staff;
}
