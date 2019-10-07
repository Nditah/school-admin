import { Student } from './student';

export class HostelBedspace {
    id: string;
    room: string;
    code: string;
    occupant: Student;
    description: string;
    status: string; // "AVAILABLE", "OCCUPIED"
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

export interface HostelBedspace {
    id: string;
    room: string;
    code: string;
    occupant: Student;
    description: string;
    status: string; // "AVAILABLE", "OCCUPIED"
    created_by: object;
    updated_by: object;
}
