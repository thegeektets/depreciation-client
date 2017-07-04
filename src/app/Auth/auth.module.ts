import { NgModule } from '@angular/core';
import { AuthComponent } from './components/auth.component';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        AuthComponent,
        PasswordResetComponent,
        PasswordResetChangeComponent
    ],
    providers: [
            PasswordResetService,
            PasswordChangeService
                ],
})
export class AuthModule {
}
