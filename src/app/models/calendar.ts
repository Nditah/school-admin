import { Staff } from './staff';

export class Calendar {
    id: string;
    start_date: Date;
    end_date: Date;
    title: string;
    notification: string;
    created_by: Staff;
    updated_by: Staff;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface Calendar {
    id: string;
    start_date: Date;
    end_date: Date;
    title: string;
    notification: string;
    created_by: Staff;
    updated_by: Staff;
}
