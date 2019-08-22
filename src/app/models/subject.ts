import { Staff } from './staff';
import { Course } from './course';

export class Subject {
    id: string;
    name: string;
    course: Course;
    teacher: Staff;
    hod: Staff;
    description: string;
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

export interface Subject {
    id: string;
    name: string;
    course: Course;
    teacher: Staff;
    hod: Staff;
    description: string;
    created_by: Staff;
    updated_by: Staff;
    }
