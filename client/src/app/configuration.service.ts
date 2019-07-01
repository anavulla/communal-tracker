import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    private appConfig: any;
    private platformLocation: PlatformLocation;

    constructor(platformLocation: PlatformLocation, private http: HttpClient) { 
        this.platformLocation = platformLocation;
        //console.log((this.platformLocation as any).location);
    }

    loadAppConfig() {
        return this.http.get(this.platformLocation.pathname +'assets/configuration/client-config.json')
            .toPromise()
            .then(data => {
                this.appConfig = data;
            });
    }

    get serverURI() {
        if (!this.appConfig) {
            throw Error('client-config.json file is not loaded..');
        }
        return this.appConfig.serverURI;
    }
}