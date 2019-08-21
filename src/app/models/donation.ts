// import { Staff } from './staff';

export class Donation {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    amount: number;
    description: string;
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

export interface Donation {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    amount: number;
    description: string;
    created_by: object;
    updated_by: object;
}
