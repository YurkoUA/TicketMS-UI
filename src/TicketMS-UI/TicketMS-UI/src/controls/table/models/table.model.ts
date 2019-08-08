import { TableColumn } from "./table-column.model";
import { TableStyles } from "./table-styles.model";

export class Table<Item> {
    items: Item[];

    itemsTotalCount?: number;
    columns: TableColumn[];
    styles: TableStyles;
    headerText?: string;
}