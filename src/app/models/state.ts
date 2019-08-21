export class State {
    id: string;
    name: string;
    country_iso2: string;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface State {
    [prop: string]: any;
     id: string;
    name: string;
    country_iso2: string;
}
