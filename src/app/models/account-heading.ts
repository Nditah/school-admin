import { Staff } from './staff';

export class AccountHeading {
    id: string;
    code :	string;	
    heading	: string;	
    account_class_id :	number;
    description :	string;	
    amount :	number;	
    opening_balance :	number;	
    bank_account_id : number;
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

export interface AccountHeading {
   // [prop: string]: any;
    id: string;
    code :	string;	
    heading	: string;	
    account_class_id :	number;
    description :	string;	
    amount :	number;	
    opening_balance :	number;	
    bank_account_id : number;
    created_by?: Staff;
    created_at?: Date;
    updated_by?: Staff;
    updated_at?: Date;
}
