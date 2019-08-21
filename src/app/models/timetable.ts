
// import { Staff } from './staff';
// import { } from './';
export class Timetable {
    id: string;
    name: string;
    description: string;
    datetime: Date;
    duration: number;
    classe: object;
    teacher_id: object;
    subject_id: object;
    created_by: object;
    updated_by: object;
    
constructor(fields: any) {
    // tslint:disable-next-line: forin
        for (const f in fields) {
            this[f] = fields[f];
        }
    }
}

export interface Timetable {
    id: string;
    name: string;
    description: string;
    datetime: Date;
    duration: number;
    classe: object;
    teacher_id: object;
    subject_id: object;
    created_by: object;
    updated_by: object;
}
