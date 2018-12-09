import { Nominal } from "./nominal";
import { Color } from "./color";
import { Serial } from "./serial";

export class Package {
    Id: number;
    Name: string;
    FirstDigit?: number;

    Nominal: Nominal = new Nominal();
    Color: Color = new Color();
    Serial: Serial = new Serial();

    IsOpened: boolean;
    IsSpecial: boolean;

    Note: string;
    CreatedDate: Date;

    TicketsCount?: number;
    UnallocatedToMoveCount?: number;
}
