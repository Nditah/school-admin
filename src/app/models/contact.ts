import { Staff } from './staff';


export class Contact {
    id: string;
    fullname? : string;
    email : string;
    phone : string;
    subject?: string;
    message : string;
    body?: string;
    request_type :	string; // "COMPLAINT", "ENQUIRY", "SUGGESTION",
    request_status?: string; // "PENDING", "ACTIVE", "CLOSED"
    remark?: string;
    has_ticket : boolean;
    created_by?: Staff ;
    created_at?: Date;
    updated_by?: Staff;
    updated_at?: Date;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface Contact {
    id: string;
    fullname? : string;
    email : string;
    phone : string;
    subject?: string;
    message : string;
    body?: string;
    request_type :	string; // "COMPLAINT", "ENQUIRY", "SUGGESTION",
    request_status?: string; // "PENDING", "ACTIVE", "CLOSED"
    remark?: string;
    has_ticket : boolean;
    created_by?: Staff ;
    created_at?: Date;
    updated_by?: Staff;
    updated_at?: Date;
}
