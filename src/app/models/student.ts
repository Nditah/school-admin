import { Staff } from './staff';
import { Classe } from './classe';
import { State } from './state';
import { County } from './county';
import { Hostel } from './hostel';
import { Parent } from './parent';

export class Student {
    id: string;
    surname: string;
    given_name: string;
    gender: string;
    birth_date: Date;
    address: string;
    state: State;
    county: County;
    email: string;
    phone: string;
    password: string;
<<<<<<< HEAD
=======
    blood_group: string;
>>>>>>> 9a79d1740909a56341bdb775b098125f105bcd2a
    classe: Classe;
    level: number;
    subsidiary: string;
    hostel: Hostel;
    photo: string;
    parents: Array<Parent>;
<<<<<<< HEAD
=======
    reg_no: string;
    admission_year: Date;
    serial_no: number;
>>>>>>> 9a79d1740909a56341bdb775b098125f105bcd2a
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
    state: State;
    county: County;
    email: string;
    phone: string;
    password: string;
    classe: Classe;
    level: number;
    subsidiary: string;
    hostel: Hostel;
    photo: string;
    parents: Array<Parent>;
<<<<<<< HEAD
=======
    reg_no: string;
    admission_year: Date;
    serial_no: number;
    serial: number;
>>>>>>> 9a79d1740909a56341bdb775b098125f105bcd2a
    created_by: Staff;
    updated_by: Staff;
}
