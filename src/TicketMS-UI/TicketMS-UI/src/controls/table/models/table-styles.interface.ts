import { ITableRowClass } from "./table-row-class.interface";

export interface ITableStyles {
    isResponsive?: boolean;
    isHover?: boolean;
    isBordered?: boolean;
    size?: 'sm' | 'lg';
    rowClasses?: ITableRowClass[];
}