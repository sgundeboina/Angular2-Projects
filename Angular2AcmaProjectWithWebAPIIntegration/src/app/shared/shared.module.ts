import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Starcomponent = require("./star.component");

@NgModule({
    imports: [CommonModule],
    declarations: [Starcomponent.StarComponent],
    exports: [
        CommonModule,
        FormsModule,
        Starcomponent.StarComponent
    ]
})
export class SharedModule {
    
}
