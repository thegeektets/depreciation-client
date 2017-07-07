import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AssetsComponent } from "./components/assets.component";
import { NavbarModule } from "../navbar/navbar.module";

@NgModule({
    declarations: [
        AssetsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NavbarModule,
    ],
    exports: [
        AssetsComponent
    ],
    providers: [
    ],
})
export class AssetsModule {
}
