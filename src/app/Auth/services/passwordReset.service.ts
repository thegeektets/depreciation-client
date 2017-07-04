import {Injectable} from '@angular/core';
import {BaseService} from '../../bases/services/BaseService';
import {Http, Response, RequestOptionsArgs, URLSearchParams, Headers} from '@angular/http';
import {HttpSettingsService} from '../../services/HttpSettingsService';
import {ListResponse} from '../../bases/models/ListResponse';
import {Auth} from '../models/auth';
import {Observable} from 'rxjs/Rx';
import {AuthToken} from '../../services/AuthToken';


@Injectable()

export class PasswordResetService extends BaseService {
    public _basePath = 'password/reset/';

    constructor(public http: Http,
                public _httpSettings: HttpSettingsService,
                private _authToken: AuthToken
    ) {
        super(http, _httpSettings);
    }

    listMap(res: Response): ListResponse {
        let toReturn = <ListResponse>res.json();
        for (let num in toReturn.results) {
            if (toReturn.results.hasOwnProperty(num)) {
                toReturn.results[num] = new Auth(toReturn.results[num]);
            }
        }
        return toReturn;
    }

    singleMap(res: Response): Auth {
        return new Auth(res.json());
    }

    public passwordReset(data, params?): Observable<any> {

        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getUnauthorizedHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.post(this.getUrl(), data, options)
            .map(res => {
                let toReturn = <any>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                this._authToken.setToken(toReturn.token);
                return toReturn;
            })
            .catch(this.handleError);
    }

}
