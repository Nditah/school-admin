// import { Staff } from './staff';
// import { Student } from './student';

export class FeesType {
    id: string;
    type: string;
    classe:object;
    amount: number;
    description:  string;
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

export interface FeesType {
    id: string;
    type: string;
    classe:object;
    amount: number;
    description:  string;
    created_by: object;
    updated_by: object;
}
