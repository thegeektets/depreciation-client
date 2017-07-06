import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AssetsComponent } from "./components/assets.component";

@NgModule({
    declarations: [
        AssetsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        AssetsComponent
    ],
    providers: [
    ],
})
export class AssetsModule {
}
