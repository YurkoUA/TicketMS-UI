import { Directive, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[serialName]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => SerialNameValidator), multi: true }
    ]
})
export class SerialNameValidator implements Validator {
    validate(control: AbstractControl): { [key: string]: any; } {
        let serialName: string = control.value;

        if (serialName == undefined || serialName.length == 0) {
            return {
                empty: true
            }
        }

        let regex = /[А-Я]{4}/;

        if (!serialName.match(regex)) {
            return {
                match: false
            }
        }

        return null;
    }
}
