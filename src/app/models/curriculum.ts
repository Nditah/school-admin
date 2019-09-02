import { Staff } from './staff';
// import { Scheme } from './scheme';
import { Book } from './book';
import { Course } from './course';
import { Classe } from './classe';
import { Subject } from './subject';

export class Curriculum {
    id: string;
    code: string;
    title: string;
    description: string;
    duration: number;
    term: string;
    level: number;
    subsidiary: string;
    course: Course;
    classes: Classe;
    subject: Subject;
    book: Book;
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

export interface Curriculum {
    id: string;
    code: string;
    title: string;
    description: string;
    duration: number;
    term: string;
    level: number;
    subsidiary: string;
    course: Course;
    classes: Classe;
    subject: Subject;
    book: Book;
    created_by: Staff;
    updated_by: Staff;
}
