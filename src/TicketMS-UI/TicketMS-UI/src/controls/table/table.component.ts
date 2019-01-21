import { Component, OnInit, Input } from '@angular/core';
import { ITable } from './models/table.interface';
import { ITableColumn } from './models/table-column.interface';
import { TableColumnType } from './models/table-column-type.enum';

@Component({
    selector: 'controls-table',
    templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
    TableColumnType = TableColumnType;

    @Input() options: ITable<any>;

    constructor() { }

    get isEmpty(): boolean {
        return this.options.items.length == 0;
    }

    get length(): number {
        return this.options.itemsTotalCount || this.options.items.length;
    }

    get showInsideCard(): boolean {
        return this.options.styles.withoutCard == undefined || this.options.styles.withoutCard == false
    }

    get visibleColumns(): ITableColumn[] {
        return this.options.columns.filter(c => !c.isHidden);
    }

    ngOnInit(): void {
    }

    getRowClass(item: any): any {
        let ngClassObj = {};

        for (var i in this.options.styles.rowClasses) {
            let rowClass = this.options.styles.rowClasses[i];

            if (rowClass.computed && rowClass.computed(item) === true) {
                ngClassObj[rowClass.className] = true;
            }
        }

        return ngClassObj;
    }

    getCellTextValue(item: any, column: ITableColumn): string {
        if (column.property) {
            return item[column.property];
        }

        if (column.computedProperty) {
            return column.computedProperty(item);
        }
    }

    getLinkUrlTreeArray(item: any, column: ITableColumn): string {
        return column.cell.computedUrlTree(item);
    }

    getLinkText(item: any, column: ITableColumn): string {
        return column.cell.computedText(item);
    }
}
