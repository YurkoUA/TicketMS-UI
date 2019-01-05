import { ITableColumn } from "./table-column.interface";
import { ITableStyles } from "./table-styles.interface";


export interface ITable<TItem> {
    items: TItem[];

    columns: ITableColumn[];
    styles: ITableStyles;
    headerText: string;
}