import { TableColumnType } from "./table-column-type.enum";

export class TableColumn {
    title: string;
    property?: string;
    computedProperty?: Function;
    isHidden?: boolean;
    type?: TableColumnType;
    cell?: any;
}