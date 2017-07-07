import { OnInit } from '@angular/core';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from "@angular/router";
import { SessionService } from "../../services/SessionService";

@Component({
    selector: 'as-navbar',
    templateUrl: '../templates/navbar.html',
    styleUrls: [
        '../styles/navbar.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
    constructor(
        private _sessionService: SessionService,
        private _router: Router
    ) {}

    logout() {
        this._sessionService.logout();
    }
    goto(url){
       this._router.navigateByUrl(url);
    }

}
