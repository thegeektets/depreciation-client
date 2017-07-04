import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {User} from '../../Account/models/user';
import {Router, ActivatedRoute} from '@angular/router';
import {ValidationService} from '../../Validators/ValidationService';
import {PasswordChangeService} from '../services/password-change.service';

interface UrlParams {
    uid: string;
    token: string;
}

@Component({
    selector: 'as-auth',
    templateUrl: '../templates/password_reset_change.html',
    styleUrls: [
        '../styles/auth.css'
    ],
     providers: [FormBuilder]
})

export class PasswordResetChangeComponent {

    public new_password1: string;
    public new_password2: string;
    public user_uid: string;
    public user_token: string;
    public user: User;
    public errorMsg: Object;
    public response: string;
    private passwordchanged: boolean = false;
    private form: FormGroup;
    private loading: boolean = false;

    constructor(private _passwordchangedservice: PasswordChangeService,
                private _router: Router,
                private fb: FormBuilder,
                private _route: ActivatedRoute
    ) {
        this.getToken();
    };

    buildForm(uid, token) {
        this.form = new FormGroup({
            new_password1: new FormControl('', Validators.compose([ValidationService.passwordValidator, ValidationService.validateControl('new_password2')])),
            new_password2: new FormControl('', Validators.compose([ValidationService.passwordValidator, ValidationService.matchesFieldValidator('new_password1')])),
            uid: new FormControl(uid, Validators.required),
            token: new FormControl(token, Validators.required)
        });

    }
    public getToken() {
        this._route.params.subscribe( (params: UrlParams) => {
            if (params.hasOwnProperty('uid')) {
                this.user_uid = params.uid;
            }
            if (params.hasOwnProperty('token')) {
                this.user_token = params.token;
            }
            this.buildForm(this.user_uid, this.user_token);
        });
    }
    passwordChange() {
        if (this.form.valid) {
            this.loading = true;
            this.errorMsg = undefined;
            this._passwordchangedservice.passwordChange( JSON.stringify(this.form.getRawValue()))
                .subscribe((res) => {
                        this.loading = false;
                        this.passwordchanged = true;
                    },
                    (errors) => {
                        this.loading = false;
                        this.errorMsg = errors;
                    }
                );
        }
    }
}
