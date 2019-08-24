import { Staff } from './staff';

export class Office {
    id: string;
    name: string;
    code: string;
    email: string;
    phone: string;
    functions: string;
    hierarchy: number;
    subsidiary: string;
    office_type: string;
    office_above: Office;
    head: Staff;
    assistant: Staff;
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

export interface Office {
    // [prop: string]: any;
    id: string;
    name: string;
    code: string;
    functions: string;
    hierarchy: number;
    subsidiary: string;
    office_type: string;
    office_above: Office;
    head: Staff;
    assistant: Staff;
    description: string;
    created_by?: Staff;
    created_at?: Date;
    updated_by?: Staff;
    updated_at?: Date;
}
