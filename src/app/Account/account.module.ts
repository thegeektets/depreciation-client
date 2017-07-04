import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register.component';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
    ],
    exports: [
        RegisterComponent,
        ProfileComponent
    ],
    providers: [
        UserService
    ],
})
export class AccountModule {
}
