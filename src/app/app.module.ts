import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthService } from "./Auth/services/auth.service";
import { AuthModule } from "./Auth/auth.module";
import { AccountModule } from "./Account/account.module";
import { AuthToken } from "./services/AuthToken";
import { HttpSettingsService } from "./services/HttpSettingsService";
import { UserService } from "./Account/services/user.service";
import { SessionService } from "./services/SessionService";
import { SettingsService } from "./services/SettingsService";
import { RouterModule } from "@angular/router";
import { Routes } from '@angular/router';
import {AuthRoutes} from './Auth/auth.routes';
import {AccountRoutes} from './Account/account.routes';
import { HttpModule } from "@angular/http";

const appRoutes: Routes = [
    ...AuthRoutes,
    ...AccountRoutes
];


 @NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    AccountModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    AuthToken,
    AuthService,
    HttpSettingsService,
    UserService,
    SessionService,
    SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
