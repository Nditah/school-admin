import { Student } from './student';
import { Marksheet } from './marksheet';
import { Staff } from './staff';

// import { Staff } from './staff';
// import { } from './';
export class Report {
        id: string;
        type: string;
        term: string;
        cumulated: any;
        student: Student;
        marksheets: Array<Marksheet>;
        evaluation: number;
        total: number;
        rank: number;
        created_by: Staff;
        updated_by: Staff;

    constructor(fields: any) {
        // tslint:disable-next-line: forin
            for (const f in fields) {
                this[f] = fields[f];
            }
        }
    }

export interface Report {
    id: string;
    type: string;
    term: string;
    cumulated: any;
    student: Student;
    marksheets: Array<Marksheet>;
    evaluation: number;
    total: number;
    rank: number;
    created_by: Staff;
    updated_by: Staff;
    }
