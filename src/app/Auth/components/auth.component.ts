import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AuthToken} from '../../services/AuthToken';
import {Router} from '@angular/router';


@Component({
    selector: 'as-auth',
    templateUrl: '../templates/auth.html',
    styleUrls: [
        '../styles/auth.css'
    ]
})

export class AuthComponent implements  OnInit{
    public password: string;
    public username: string;
    public errorMsg: string | void;
    private loading: boolean = false;

    constructor(
        private _authService: AuthService,
        private _authToken: AuthToken,
        private _router: Router
    ) {
        return;
    };

    ngOnInit () {
      let token = this._authToken.getToken();
      if(token !== ''){
          this.loadDashboard();
      }
    }
    login() {
        this.loading = true;
        this.errorMsg = null;
        this._authService.login(JSON.stringify({'username': this.username, 'password': this.password}))
            .subscribe((res) => {
                  this.loading = false;
                  console.log(res.token);
                  if(res.token !== ''){
                      this._authToken.setToken(res.token);
                      this.loadDashboard();
                  }
                },
                (errorMsg) => {
                    this.loading = false;
                    if (errorMsg.hasOwnProperty('non_field_errors')) {
                        this.errorMsg = errorMsg.non_field_errors;
                    }
                }
            );
    }

    loadDashboard() {
       this._router.navigateByUrl('dashboard');
    }


}
