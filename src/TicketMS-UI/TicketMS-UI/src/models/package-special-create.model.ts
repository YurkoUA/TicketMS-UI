import { Identifier } from "./identifier.model";

export class PackageSpecialCreateModel extends Identifier {
    Name: string;
    ColorId?: number;
    SerialId?: number;
    NominalId: number;
    Note: string;
}