import { Classe } from './classe';
import { Subject } from './subject';

export class Staff {
    id: string;
    title: string;
    surname: string;
    given_name: string;
    gender: string;
    birth_date: Date;
    marital_status: string;
    phone: string;
    phone_personal: string;
    address: string;
    state: any; // State
    county: any; // County
    email: string;
    staff_type: string;
    classe: Classe; // Classe
    subject: Subject; // Subject
    password: string;
    kin: string;
    kin_phone: string;
    kin_address: string;
    guarantor1: string;
    guarantor1_phone: string;
    guarantor1_address: string;
    guarantor2: string;
    guarantor2_phone: string;
    guarantor2_address: string;
    profession: string;
    qualification: string;
    employment_status: string;
    tax: number;
    basic_salary: number;
    bonus: number;
    entertainment_allowance: number;
    house_allowance: number;
    lunch_allowance: number;
    medical_allowance: number;
    transport_allowance: number;
    utility_allowance: number;
    welfare_allowance: number;
    pension: number;
    bank_name: any; // Bank
    bank_account_number: number;
    bank_account_name: string;
    rank: string;
    office: any; // Office
    role: string;
    subsidiary: string;
    remark: string;
    photo: string;
    is_salary_payable: boolean;
    is_document_complete: boolean;
    approved_by: boolean;
    approved_date: Date;
    disengaged_by: Staff;
    disengaged_date: Date;
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

export interface Staff {
    [prop: string]: any;

    id: string;
    title: string;
    surname: string;
    given_name: string;
    gender: string;
    birth_date: Date;
    marital_status: string;
    phone: string;
    phone_personal: string;
    address: string;
    state: any; // State
    county: any; // County
    email: string;
    staff_type: string;
    classe: Classe; // Classe
    subject: Subject; // Subject
    password: string;
    kin: string;
    kin_phone: string;
    kin_address: string;
    guarantor1: string;
    guarantor1_phone: string;
    guarantor1_address: string;
    guarantor2: string;
    guarantor2_phone: string;
    guarantor2_address: string;
    profession: string;
    qualification: string;
    employment_status: string;
    tax: number;
    basic_salary: number;
    bonus: number;
    entertainment_allowance: number;
    house_allowance: number;
    lunch_allowance: number;
    medical_allowance: number;
    transport_allowance: number;
    utility_allowance: number;
    welfare_allowance: number;
    pension: number;
    bank_name: any; // Bank
    bank_account_number: number;
    bank_account_name: string;
    rank: string;
    office: any; // Office
    role: string;
    subsidiary: string;
    remark: string;
    photo: string;
    is_salary_payable: boolean;
    is_document_complete: boolean;
    approved_by: boolean;
    approved_date: Date;
    disengaged_by: Staff;
    disengaged_date: Date;
    created_by: Staff;
    updated_by: Staff;
}
