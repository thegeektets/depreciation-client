import {Injectable} from '@angular/core';
import {BaseService} from '../../bases/services/BaseService';
import {Http, Response, RequestOptionsArgs, URLSearchParams, Headers} from '@angular/http';
import {HttpSettingsService} from '../../services/HttpSettingsService';
import {ListResponse} from '../../bases/models/ListResponse';
import {Observable} from 'rxjs/Rx';
import {AuthToken} from '../../services/AuthToken';
import {SessionService} from '../../services/SessionService';
import { Depreciation } from "../models/depreciation";

@Injectable()

export class DepreciationService extends BaseService {

    public _basePath = 'assets/';
    public _depPath = 'depreciation/'

    constructor(public http: Http,
                public _httpSettings: HttpSettingsService,
                public _sessionService: SessionService,
                private _authToken: AuthToken
    ) {
        super(http, _httpSettings);
    }

    listMap(res: Response): ListResponse {
        let toReturn = <ListResponse>res.json();
        for (let num in toReturn.results) {
            if (toReturn.results.hasOwnProperty(num)) {
                toReturn.results[num] = new Depreciation(toReturn.results[num]);
            }
        }
        return toReturn;
    }

    singleMap(res: Response): Depreciation {
        return new Depreciation(res);
    }

    getDepreciation(start_date, end_date,  params?) {
      let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this._httpSettings.getBaseUrl() + this._basePath + '?startdate='+start_date+'&enddate='+end_date, options)
            .map(res => {
                let toReturn = <any>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    getDepreciationClasses( params?) {
      let options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this._httpSettings.getBaseUrl() + this._depPath , options)
            .map(res => {
                let toReturn = <any>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }
}
