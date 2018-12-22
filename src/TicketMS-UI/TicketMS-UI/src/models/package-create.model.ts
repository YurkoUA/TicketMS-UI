import { Identifier } from "./identifier.model";

export class PackageCreateModel extends Identifier {
    ColorId: number;
    SerialId: number;
    NominalId: number;
    FirstDigit?: number;
    Note: string;
}