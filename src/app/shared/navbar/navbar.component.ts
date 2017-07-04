import { OnInit } from '@angular/core';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SessionService } from '../../services/SessionService';

@Component({
    selector: 'as-navbar',
    templateUrl: 'navbar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
    @Input() brand: string;
    @Input() isAuthenticated: boolean = false;
    @Input() isAdmin: boolean = false;
    @Input() isSuperUser: boolean = false;
    @Input() userDisplayName: string = '';
    @Input() cartTotal: number = 0;

    constructor(
        private _sessionService: SessionService
    ) {}

    logout() {
        this._sessionService.logout();
    }


}
