import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from "../navbar/navbar.module";
import { DepreciationComponent } from "./components/depreciation.component";

@NgModule({
    declarations: [
        DepreciationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NavbarModule,
    ],
    exports: [
        DepreciationComponent
    ],
    providers: [
    ],
})
export class DepreciationModule {
}
