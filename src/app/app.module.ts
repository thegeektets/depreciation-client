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
import { DashboardModule } from "./Dashboard/dashboard.module";
import { DashboardRoutes } from "./Dashboard/dashboard.routes";
import { AssetsRoutes } from "./Assets/assets.routes";
import { AssetsModule } from "./Assets/assets.module";
import { AssetsService } from "./Assets/services/assets.service";

const appRoutes: Routes = [
    ...AuthRoutes,
    ...AccountRoutes,
    ...DashboardRoutes,
    ...AssetsRoutes,
];


 @NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AssetsModule,
    DashboardModule,
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
    AssetsService,
    HttpSettingsService,
    UserService,
    SessionService,
    SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
