import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AssetsComponent } from "./components/assets.component";
import { NavbarModule } from "../navbar/navbar.module";
import { AddAssetsComponent } from "./components/add-assets.component";

@NgModule({
    declarations: [
        AssetsComponent,
        AddAssetsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NavbarModule,
    ],
    exports: [
        AssetsComponent,
        AddAssetsComponent,
    ],
    providers: [
    ],
})
export class AssetsModule {
}
