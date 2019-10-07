import { Staff } from './staff';
import { Student } from './student';
import { Office } from './office';
import { Classe } from './classe';

export class Attendance {
    id: string;
    access_token: string;
    type: string;
    staff: Staff;
    student: Student;
    classe: Classe;
     office: Office;
    attendance_status: string;
    subsidiary: string;
    arrival_time: Date;
    departure_time: Date;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface Attendance {
    id: string;
    access_token: string;
    type: string;
    staff: Staff;
    student: Student;
    classe: Classe;
     office: Office;
    attendance_status: string;
    subsidiary: string;
    arrival_time: Date;
    departure_time: Date;
}
