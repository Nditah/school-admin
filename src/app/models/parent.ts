import { Staff } from './staff';
import { Student } from './student';
import { State } from './state';
import { County } from './county';

export class Parent {
    id: string;
    title: string;
    surname: string;
    given_name: string;
    gender: string;
    marital_status: string;
    address: string;
    state: State;
    county: County;
    email: string;
    phone: string;
    password: string;
    profession: string;
    employment_status: string;
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
    birth_date: Date;  // remove
    marital_status: string;
    address: string;
    state: State;
    county: County;
    email: string;
    phone: string;
    password: string;
    profession: string;
    employment_status: string;
    students: Array<Student>;
    created_by: Staff;
    updated_by: Staff;
}
