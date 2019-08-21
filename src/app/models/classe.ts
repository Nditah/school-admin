import { Staff } from './staff';

export class Classe {
    id: string;
    subsidiary: string;
    level: string;
    form_teacher: Staff;
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

export interface Classe {
 //   [prop: string]: any;
    id: string;
    subsidiary: string;
    level: string;
    form_teacher: Staff;
    created_by: Staff;
    updated_by: Staff;
    }
