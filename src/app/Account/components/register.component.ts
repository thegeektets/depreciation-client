import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ValidationService } from '../../Validators/ValidationService';
import { User } from '../models/user';

@Component({
    selector: 'as-register',
    templateUrl: '../templates/register.html',
    styleUrls: [
        '../styles/register.css'
    ],
    providers: [FormBuilder]
})

export class RegisterComponent {

    public user: User;

    public errors: Object;

    private registered: boolean = false;

    private form: FormGroup;
    private loading: boolean = false;

    constructor(private _userService: UserService,
                private _router: Router,
                private fb: FormBuilder
    ) {
        this.buildForm();
    };

    buildForm() {
        this.form = new FormGroup({
            first_name: new FormControl('', Validators.required),
            last_name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([Validators.required, ValidationService.emailValidator])),
            username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
            password: new FormControl('', Validators.compose([ValidationService.passwordValidator, ValidationService.validateControl('password_again')])),
            password_again: new FormControl('', Validators.compose([ValidationService.passwordValidator, ValidationService.matchesFieldValidator('password')]))
        });

    }

    registerUser() {
        if (this.form.valid) {
            this.loading = true;
            this.errors = undefined;
            this._userService.register(JSON.stringify(this.form.getRawValue()))
                .subscribe((res) => {
                        this.loading = false;
                        this.registered = true;
                    },
                    (errors) => {
                        this.loading = false;
                        this.errors = errors;
                    }
                );
        }
    }

}
