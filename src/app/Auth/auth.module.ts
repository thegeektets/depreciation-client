import { NgModule } from '@angular/core';
import { AuthComponent } from './components/auth.component';
import { APP_PROVIDERS } from '../app.providers';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoadingModule } from '../directives/Loading/loading.module';
import {RouterModule} from '@angular/router';
import {PasswordResetComponent} from './components/password_reset.component';
import {PasswordResetService} from './services/passwordReset.service';
import {PasswordResetChangeComponent} from './components/password_reset_change.component';
import {PasswordChangeService} from './services/password-change.service';

@NgModule({
    declarations: [
        AuthComponent,
        PasswordResetComponent,
        PasswordResetChangeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        LoadingModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        AuthComponent,
        PasswordResetComponent,
        PasswordResetChangeComponent
    ],
    providers: [
            APP_PROVIDERS,
            PasswordResetService,
            PasswordChangeService
                ],
})
export class AuthModule {
}
