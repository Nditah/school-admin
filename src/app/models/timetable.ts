import { Classe } from './classe';
import { Course } from './course';
import { Classroom } from './classroom';
import { Staff } from './staff';

// import { Staff } from './staff';
// import { } from './';
export class Timetable {
    id: string;
    type: string;
    activity: string;
    day: string;
    from: Date;
    to: Date;
    duration: number;
    classe: Classe;
    course: Course;
    classroom: Classroom;
    subsidiary: string;
    description: string;
    created_by: Staff;
    updated_by: Staff;

constructor(fields: any) {
    // tslint:disable-next-line: forin
        for (const f in fields) {
            this[f] = fields[f];
        }
    }
}

export interface Timetable {
    id: string;
    type: string;
    activity: string;
    day: string;
    from: Date;
    to: Date;
    duration: number;
    classe: Classe;
    course: Course;
    classroom: Classroom;
    subsidiary: string;
    description: string;
    created_by: Staff;
    updated_by: Staff;
}
