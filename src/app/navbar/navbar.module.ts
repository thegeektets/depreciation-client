import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./components/navbar.component";

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule {
}
