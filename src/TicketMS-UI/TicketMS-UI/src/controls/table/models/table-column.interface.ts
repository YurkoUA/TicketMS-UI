import { TableColumnType } from "./table-column-type.enum";

export interface ITableColumn {
    title: string;
    property?: string;
    computed?: Function;
    isHidden?: boolean;
    type?: TableColumnType;
    cell?: any;
}