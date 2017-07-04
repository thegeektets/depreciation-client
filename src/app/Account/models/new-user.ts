
export class NewUser {

    username: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
    password: string;


    constructor (obj: Object) {
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                this[field] = obj[field];
            }
        }
    }

}
