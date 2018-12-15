import { PipeTransform, Pipe } from "@angular/core";
import { Package } from "../../models/domain/package";

@Pipe({
    name: 'packageStatus'
})
export class PackageStatusPipe implements PipeTransform {
    transform(value: any, ...args: any[]): string {
        let pack = value as Package;

        if (pack == null)
            return '';

        let status = `${this.getOpenedState(pack.IsOpened)} / ${this.getSpecialState(pack.IsSpecial)}`;
        return status;
    }

    private getOpenedState(isOpened: boolean): string {
        return isOpened ? "Відкрита" : "Закрита";
    }

    private getSpecialState(isSpecial: boolean): string {
        return isSpecial ? "Спеціальна" : "Звичайна";
    }
}