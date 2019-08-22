import { Staff } from './staff';

export class Setting {
    id: string;
    name: string;
    access: string;
    value: string;
    category: string;
    description: string;
    created_by?: Staff;
    created_at?: Date;
    updated_by?: Staff;
    updated_at?: Date;

    constructor(fields: any) {
        // tslint:disable-next-line: forin
            for (const f in fields) {
                this[f] = fields[f];
            }
        }
    }

    export interface Setting {
        id: string;
        name: string;
        access: string;
        value: string;
        category: string;
        description: string;
        created_by?: Staff;
        created_at?: Date;
        updated_by?: Staff;
        updated_at?: Date;
    }
