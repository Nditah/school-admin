import { FeesPayment } from './fees-payment';
import { HostelBedspace } from './hostel-bedspace';
import { Student } from './student';

export class HostelAllocation {
    id: string;
    bedspace: HostelBedspace;
    fees_payment: FeesPayment;
    occupant : Student;
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

export interface HostelAllocation {
    id: string;
    hall: string;
    block: string;
    hostel_fees: Object;
    hostel_rooms: Object;
    description: string;
    status: string; // "AVAILABLE", "OCCUPIED"
    created_by: object;
    updated_by: object;
}
