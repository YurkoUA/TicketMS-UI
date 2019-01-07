import { TableColumnType } from "./table-column-type.enum";

export interface ITableColumn {
    title: string;
    property?: string;
    computedProperty?: Function;
    isHidden?: boolean;
    type?: TableColumnType;
    cell?: any;
}