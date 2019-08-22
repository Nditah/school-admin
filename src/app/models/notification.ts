import { Staff } from './staff';

export class Notification {
    id: string;
    title: string;
    status: string;
    user_type?: string;
    staff_id?: Object;
    driver_id?: Object;
    customer_id?: Object;
    partner_id?: Object;
    message?: string;
    notification_status?: string;
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

export interface Notification {
    id: string;
    title: string;
    status: string;
    user_type?: string;
    staff_id?: Object;
    driver_id?: Object;
    customer_id?: Object;
    partner_id?: Object;
    message?: string;
    notification_status?: string;
    created_by?: Staff;
    created_at?: Date;
    updated_by?: Staff;
    updated_at?: Date;
}
