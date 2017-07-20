import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from "../navbar/navbar.module";
import { DepreciationComponent } from "./components/depreciation.component";
import { DepreciationClassesComponent } from "./components/depreciation-classes.component";

@NgModule({
    declarations: [
        DepreciationComponent,
        DepreciationClassesComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NavbarModule,
    ],
    exports: [
        DepreciationComponent,
        DepreciationClassesComponent,
    ],
    providers: [
    ],
})
export class DepreciationModule {
}
