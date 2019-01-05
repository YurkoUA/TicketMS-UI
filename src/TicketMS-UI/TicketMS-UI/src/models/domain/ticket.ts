import { Package } from "./package";
import { Nominal } from "./nominal";
import { Color } from "./color";
import { Serial } from "./serial";

export class Ticket {
    Id: number;
    Number: string;

    Package: Package;
    Nominal: Nominal;
    Color: Color;

    Serial: Serial;
    SerialNumber: string;

    Date: string;
    Note: string;
    CreatedDate: Date;

    IsHappy?: boolean;
    DuplicatesCount?: number;
}