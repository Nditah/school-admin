import { Staff } from './staff';
import { Student } from './student';
import { Course } from './course';

export class Marksheet {
    id: string;
    type:  string; //enum: ["PAPER", "CBT"], required: true },
    course: Course;
    student: Student;
    score: number;
    assessment_sitting: object;
    deleted: boolean;
    deleted_at: Date;
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

export interface Marksheet {
    id: string;
    type:  string; //enum: ["PAPER", "CBT"], required: true },
    course: Course;
    student: Student;
    score: number;
    assessment_sitting: object;
    deleted: boolean;
    deleted_at: Date;
    created_by: Staff;
    updated_by: Staff;
}
