import { Staff } from './staff';
import { Classe } from './classe';
import { Subject } from './subject';

export class Course {
    id: string;
    type: string;
    title: string;
    level: string;
    code: string;
    coefficient: string;
    description: string;
    classe: Classe;
    subject: Subject;
    teacher: Staff;
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

export interface Course {
 //   [prop: string]: any;
    id: string;
    type: string;
    title: string;
    level: string;
    code: string;
    coefficient: string;
    description: string;
    classe: Classe;
    subject: Subject;
    teacher: Staff;
    created_by: Staff;
    updated_by: Staff;
    }
