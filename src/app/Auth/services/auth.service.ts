import {Injectable} from '@angular/core';
import {BaseService} from '../../bases/services/BaseService';
import {Http, Response, RequestOptionsArgs, URLSearchParams, Headers} from '@angular/http';
import {HttpSettingsService} from '../../services/HttpSettingsService';
import {ListResponse} from '../../bases/models/ListResponse';
import {Auth} from '../models/auth';
import {Observable} from 'rxjs/Rx';
import {AuthToken} from '../../services/AuthToken';
import {SessionService} from '../../services/SessionService';
import { SettingsService } from "../../services/SettingsService";

@Injectable()

export class AuthService extends BaseService {

    public _basePath = 'get_auth_token/';
    private protocol;
    private domain;
    private baseUrl;

    constructor(public http: Http,
                public _httpSettings: HttpSettingsService,
                public _sessionService: SessionService,
                private _authToken: AuthToken,
                private _settings: SettingsService

    ) {
        super(http, _httpSettings);
         this.protocol = _settings.getProtocol();
         this.domain = _settings.getDomain();
         this.baseUrl = _settings.getBaseUrl();
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


    public login(data, params?): Observable<any> {

        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getUnauthorizedHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.post(this.protocol + '://' + this.domain + '/' + this._basePath, data, options)
            .map(res => {
                let toReturn = <any>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public logout(): Observable<any> {

        let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders()
        };
        return this.http.post(this._httpSettings.getBaseUrl() + 'logout/', '', options)
            .map(res => {
                let toReturn = <any>res.json();
                this._authToken.setToken(toReturn.token);
                this._sessionService.logout();
                return toReturn;
            })
            .catch(this.handleError);
    }

}
