import { Component, OnInit, Input} from '@angular/core';
import { SessionService} from '../../services/SessionService';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ValidationService } from '../../Validators/ValidationService';

@Component({
    selector: 'as-profile',
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
            this.buildForm();
        }
    }

    ngOnInit() {
    //
    }

    buildForm() {
        this.form = new FormGroup({
            full_name: new FormControl('', Validators.required),
            username: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([Validators.required, ValidationService.emailValidator])),
            mobile_number: new FormControl('', Validators.required),
            date_joined: new FormControl('', Validators.required),
            default_billing_address: new FormControl('', Validators.required),
            default_shipping_address: new FormControl('', Validators.required),
            mpesa_phone_number: new FormControl('', Validators.required)
        });

    }



}
