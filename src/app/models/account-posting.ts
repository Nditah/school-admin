import { Staff } from './staff';
import { AccountHeading } from './account-heading';

export class AccountPosting {
    id: string;
    code :	string;	
    transaction_date :	Date;
    description :	string;	
    amount :	number;	
    transaction_code :	string;	
    transaction_details : string; // object
    posting_type : string; // "DEBIT|CREDIT"
    category : string; // "INCOME|EXPENSES"
    account_heading_id : AccountHeading;
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

export interface AccountPosting {
   // [prop: string]: any;
   id: string;
   code :	string;	
   transaction_date :	Date;
   description :	string;	
   amount :	number;	
   transaction_code :	string;	
   transaction_details : string; // object
   posting_type : string; // "DEBIT|CREDIT"
   category : string; // "INCOME|EXPENSES"
   account_heading_id : AccountHeading;
   created_by?: Staff;
   created_at?: Date;
   updated_by?: Staff;
   updated_at?: Date;
}
