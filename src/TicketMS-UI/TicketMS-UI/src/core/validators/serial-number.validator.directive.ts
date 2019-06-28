import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive, forwardRef } from "@angular/core";

@Directive({
    selector: '[serialNumber]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => SerialNumberValidator), multi: true }
    ]
})
export class SerialNumberValidator implements Validator {
    validate(control: AbstractControl): { [key: string]: any; } {
        let serialNumber: string = control.value;

        if (serialNumber == undefined || serialNumber.length == 0) {
            return {
                empty: true
            }
        }

        if (serialNumber.length != 2) {
            return {
                invalidLength: true
            }
        }

        let number = serialNumber.toInteger();

        if (isNaN(number)) {
            return {
                isNaN: true
            }
        }

        if (number < 1 || number > 50) {
            return {
                outOfRange: true
            }
        }

        return null;
    }
}