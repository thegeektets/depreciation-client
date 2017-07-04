import {Injectable} from '@angular/core';
import { ENV } from '../shared/constant/env';

@Injectable()
export class SettingsService {
    private devMode = true;
    private protocol = ENV.API_PROTOCOL;
    private domain = ENV.API_DOMAIN;
    private baseUrl = ENV.API_baseUrl;
    private apiVersion = ENV.API_apiVersion;
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
