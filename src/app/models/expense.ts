import { Staff } from './staff';

export class Expense {
    id: string;
    amount: number;
    description: string;
    created_by?: Staff;
    created_at?: Date;
    updated_by?: Staff;
    updated_at?: Date;

   
    constructor(fields: any) {
        Object.keys(fields).forEach(key => {
            this[key] = fields[key];
        });
    }

}

export interface Expense {
    id: string;
    amount: number;
    description: string;
    created_by?: Staff;
    created_at?: Date;
    updated_by?: Staff;
    updated_at?: Date;
}
