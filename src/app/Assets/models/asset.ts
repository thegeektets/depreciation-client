export class Asset {

    id: number;
    Name: string;
    Price: number;
    DOA: string;
    Assignee: number;
    SerialNumber: string;
    DepClass:number;

    constructor (obj: Object) {
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                this[field] = obj[field];
            }
        }
    }

}
