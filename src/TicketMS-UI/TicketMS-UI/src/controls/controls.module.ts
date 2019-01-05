import { NgModule } from "@angular/core";
import { TableComponent } from './table/table.component';
import { TableCellLinkComponent } from './table/components/table-cell-link/table-cell-link.component';
import { BrowserModule } from "@angular/platform-browser";
import { CoreModule } from "../core/core.module";

@NgModule({
    declarations: [
        TableComponent, 
        TableCellLinkComponent
    ],
    exports: [
        TableComponent
    ],
    imports: [
        BrowserModule,

        CoreModule
    ]
})
export class ControlsModule {
}