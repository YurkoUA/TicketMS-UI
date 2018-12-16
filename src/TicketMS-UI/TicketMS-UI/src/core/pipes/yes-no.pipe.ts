import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {
    transform(value: any, ...args: any[]): string {
        let flag = value as boolean;
        
        if (flag == null)
            return '';

        return flag ? "Так" : "Ні";
    }
}