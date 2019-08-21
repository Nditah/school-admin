export class Classe {
    id: string;


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

}
