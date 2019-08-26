import { Fee } from './fee';
import { HostelRoom } from './hostel-room';

export class Hostel {
    id: string;
    hall: string;
    block: string;
    hostel_fees: Fee;
    hostel_rooms: HostelRoom;
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

export interface Hostel {
    id: string;
    hall: string;
    block: string;
    hostel_fees: Fee;
    hostel_rooms: HostelRoom;
    description: string;
    status: string; // "AVAILABLE", "OCCUPIED"
    created_by: object;
    updated_by: object;
}
