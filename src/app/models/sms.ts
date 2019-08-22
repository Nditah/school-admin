import { Staff } from './staff';

export class Sms {
    id: string;
    sid?: string;
    sender?: string;
    recipient? : string;
    message? : string;
    direction? : 'INBOUND' | 'OUTBOUND';
    delivery_status? : string;
    created_by?: Staff;
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

export interface Sms {
    id: string;
    sid?: string;
    sender?: string;
    recipient? : string;
    message? : string;
    direction? : 'INBOUND' | 'OUTBOUND';
    delivery_status? : string;
    created_by?: Staff;
    created_at?: Date;
    updated_by?: Staff;
    updated_at?: Date;
}
