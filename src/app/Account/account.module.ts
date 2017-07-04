import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register.component';
import { APP_PROVIDERS } from '../app.providers';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '../directives/Loading/loading.module';
import {ProfileComponent} from './components/profile.component';
import {UserService} from './services/user.service';

@NgModule({
    declarations: [
        RegisterComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingModule
    ],
    exports: [
        RegisterComponent,
        ProfileComponent
    ],
    providers: [
        APP_PROVIDERS,
        UserService
    ],
})
export class AccountModule {
}
