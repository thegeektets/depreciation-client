import {BaseModel} from '../../bases/models/BaseModel';

export class Auth extends BaseModel {


   constructor (obj: Object) {
       super();
       for (let field in obj) {
           if (obj.hasOwnProperty(field)) {
               this[field] = obj[field];
           }
       }
   }
}
