import { Staff } from './staff';

export class AccountClass {
    id: string;
    code :	string;	
    heading	: string;	
    account_class_id :	number;
    description :	string;	
    category :	string;	
    class_type :	string;	
    subsidiary : string;
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

export interface AccountClass {
   // [prop: string]: any;
   id: string;
   name : string;
   code :	string;	
   heading	: string;	
   account_class_id :	number;
   description :	string;	
   category :	string;	
   class_type :	string;	
   subsidiary : string;
   created_by?: Staff;
   created_at?: Date;
   updated_by?: Staff;
   updated_at?: Date;
}
