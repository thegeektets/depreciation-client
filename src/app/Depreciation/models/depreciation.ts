export class Depreciation {

    id: number;
    title: string;
    price: number;
    doa: string;
    assingee_id: number;
    assingee: any;
    serialnumber: string;
    depreciation_id:number;
    depreciation:any;
    depreciation_results: any;


    constructor (obj: Object) {
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                this[field] = obj[field];
            }
        }
    }

}
