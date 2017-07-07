import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from "./components/dashboard.component";
import { NavbarModule } from "../navbar/navbar.module";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NavbarModule,
    ],
    exports: [
        DashboardComponent
    ],
    providers: [
    ],
})
export class DashboardModule {
}
