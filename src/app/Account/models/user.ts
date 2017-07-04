import {BaseModel} from '../../bases/models/BaseModel';

export class User extends BaseModel {

    id: number;
    last_login: string | Date;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    is_superuser: boolean;
    is_admin: boolean;
    date_joined: string | Date;
    full_name: string;
    mobile_number: string;
    default_billing_address: string;
    default_shipping_address: string;
    mpesa_id: string;
    avatar: string;
    groups: any[];
    user_permissions: any[];


    constructor (obj: Object) {
        super();
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                if (
                    field === 'last_login' ||
                    field === 'date_joined'
                ) {
                    this[field] = new Date(obj[field]);
                } else {
                    this[field] = obj[field];
                }
            }
        }
    }

    getName() {
        return this.first_name + ' ' + this.last_name;
    }

}
