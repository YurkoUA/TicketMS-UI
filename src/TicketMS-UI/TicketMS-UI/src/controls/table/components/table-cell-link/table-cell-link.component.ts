import { Component, Input } from '@angular/core';

@Component({
    selector: 'controls-table-cell-link',
    templateUrl: './table-cell-link.component.html'
})
export class TableCellLinkComponent {
    @Input() text: string;
    @Input() urlTree: string[];
}
