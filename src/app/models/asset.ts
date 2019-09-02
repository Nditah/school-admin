import { Staff } from './staff';

export class Asset {
    id: string;
    name: string;
    type: string;
    value : string;
    created_by?: Staff;
    created_at?: Date;
    updated_by?: Staff;
    updated_at?: Date;

    // constructor(fields: any) {
    //     // Quick and dirty extend/assign fields to this model
    //     for (const f in fields) {
    //         // @ts-ignore
    //         this[f] = fields[f];
    //     }
    // }
    constructor(fields: any) {
        Object.keys(fields).forEach(key => {
            this[key] = fields[key];
        });
    }

}

export interface Asset {
    id: string;
    name: string;
    type: string;
    value : string;
    created_by?: Staff;
    created_at?: Date;
    updated_by?: Staff;
    updated_at?: Date;
}
