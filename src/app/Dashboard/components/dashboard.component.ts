import { Component, OnInit, Input} from '@angular/core';
import { SessionService} from '../../services/SessionService';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ValidationService } from '../../Validators/ValidationService';

@Component({
    selector: 'as-dashboard',
    templateUrl: '../templates/dashboard.html',
    styleUrls: [
        '../styles/dashboard.css'
    ],
    providers: [FormBuilder]
})

export class DashboardComponent implements OnInit {
    public userDisplayDetails: any = '';
    public isAuthenticated: boolean = false;
    public loading: boolean = false;

    private form: FormGroup;

    constructor(
        private _sessionService: SessionService,
        private fb: FormBuilder
    ) {
        this.isAuthenticated = this._sessionService.isLoggedIn();
        if (this.isAuthenticated) {
        }
    }

    ngOnInit() {
    //
    }



}
