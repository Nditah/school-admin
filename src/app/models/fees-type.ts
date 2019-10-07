 import { Staff } from './staff';
import { Classe } from './classe';

export class FeesType {
    id: string;
    type: string;
    classe:Classe;
    amount: number;
    description:  string;
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

export interface FeesType {
    id: string;
    type: string;
    classe:Classe;
    amount: number;
    description:  string;
    created_by: Staff;
    updated_by: Staff;
}
