import { Component, OnInit, Input} from '@angular/core';
import { SessionService} from '../../services/SessionService';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ValidationService } from '../../Validators/ValidationService';
import { RouterLink, Router } from "@angular/router";
import { NavbarComponent } from "../../navbar/components/navbar.component";
import { AuthToken } from "../../services/AuthToken";

@Component({
    selector: 'as-dashboard',
    templateUrl: '../templates/dashboard.html',
    styleUrls: [
        '../styles/dashboard.css'
    ],
    providers: [FormBuilder],
})

export class DashboardComponent implements OnInit {
    public userDisplayDetails: any = '';
    public isAuthenticated: boolean = false;
    public loading: boolean = false;

    private form: FormGroup;

    constructor(
        private _sessionService: SessionService,
        private _authToken: AuthToken,
        private fb: FormBuilder,
        private _router: Router,
    ) {
        let token = this._authToken.getToken();
        if (token !== null) {
        } else {
          this._router.navigateByUrl('');
        }
    }

    ngOnInit() {
    //
    }




}
