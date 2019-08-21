// import { Staff } from './staff';
// import { Student } from './student';

export class Marksheet {
    id: string;
    subject_id: object;
    student_id: object;
    teacher_id: object;
    ca_id: object;
    exam_id: object;
    classe_id: object;
    created_by: object;
    updated_by: object;

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
    subject_id: object;
    student_id: object;
    teacher_id: object;
    ca_id: object;
    exam_id: object;
    classe_id: object;
    created_by: object;
    updated_by: object;
}
