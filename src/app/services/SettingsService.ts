import {Injectable} from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable()
export class SettingsService {
    private ENV = environment;
    private devMode = true;
    private protocol = this.ENV.API_PROTOCOL;
    private domain = this.ENV.API_DOMAIN;
    private baseUrl = this.ENV.API_baseUrl;
    private apiVersion = this.ENV.API_apiVersion;
    constructor() {
        if (!this.devMode) {
            this.protocol = 'http';
            this.domain = '127.0.0.1';
        }
    }
    public getProtocol() {
        return this.protocol;
    }
    public isDevMode() {
        return this.devMode;
    }
    public getDomain() {
        return this.domain;
    }
    public getBaseUrl(version?: string) {
        if (typeof version === 'undefined') {
            version = this.apiVersion;
        }
        return this.baseUrl + 'v' + version + '/';
    }
}
