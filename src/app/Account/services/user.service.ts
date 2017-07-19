import {Injectable} from '@angular/core';
import {BaseService} from '../../bases/services/BaseService';
import {Http, Response, RequestOptionsArgs, URLSearchParams, Headers} from '@angular/http';
import {HttpSettingsService} from '../../services/HttpSettingsService';
import {ListResponse} from '../../bases/models/ListResponse';
import {Observable} from 'rxjs/Rx';
import {AuthToken} from '../../services/AuthToken';
import {SessionService} from '../../services/SessionService';
import {User} from '../models/user';

@Injectable()

export class UserService extends BaseService {

    public _basePath = 'users/';
    public _registerPath = 'register/';

    constructor(public http: Http,
                public _httpSettings: HttpSettingsService,
    ) {
        super(http, _httpSettings);
    }

    listMap(res: Response): ListResponse {
        let toReturn = <ListResponse>res.json();
        for (let num in toReturn.results) {
            if (toReturn.results.hasOwnProperty(num)) {
                toReturn.results[num] = new User(toReturn.results[num]);
            }
        }
        return toReturn;
    }

    singleMap(res: Response): User {
        return new User(res.json());
    }

    public get_Assignees(params?): Observable<any> {
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this.getUrl(this._basePath), options)
            .map(res => {
                let toReturn = <any>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public register(data, params?): Observable<any> {
        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getUnauthorizedHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.post(this.getUrl(this._registerPath), data, options)
            .map(res => {
                let toReturn = <any>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

}
