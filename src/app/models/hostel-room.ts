import { Hostel } from './hostel';
import { HostelBedspace } from './hostel-bedspace'

export class HostelRoom {
    id: string;
    hostel: Hostel;
    code: string;
    floor : string;
    hostel_bedspaces: HostelBedspace;
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

export interface HostelRoom {
    id: string;
    hostel: Hostel;
    code: string;
    floor : string;
    hostel_bedspaces: HostelBedspace;
    description: string;
    status: string; // "AVAILABLE", "OCCUPIED"
    created_by: object;
    updated_by: object;
}
