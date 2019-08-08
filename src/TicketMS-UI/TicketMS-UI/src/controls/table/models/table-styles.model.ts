import { TableRowClass } from "./table-row-class.model";

export class TableStyles {
    withoutCard?: boolean;
    isResponsive?: boolean;
    isHover?: boolean;
    isBordered?: boolean;
    size?: 'sm' | 'lg';
    rowClasses?: TableRowClass[];
}