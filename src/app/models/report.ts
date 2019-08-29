
// import { Staff } from './staff';
// import { } from './';
export class Report {
        id: string;
        type: string;
        term: string;
        cumulated: Array<T>;
        description: string;
        created_by: object;
        updated_by: object;

    constructor(fields: any) {
        // tslint:disable-next-line: forin
            for (const f in fields) {
                this[f] = fields[f];
            }
        }
    }

export interface Report {
        id: string;
        code: string;
        type: string;
        name: string;
        description: string;
        created_by: object;
        updated_by: object;
    }
