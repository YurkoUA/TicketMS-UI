import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive, forwardRef } from "@angular/core";

@Directive({
    selector: '[serialNumber]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => TicketNumberValidator), multi: true }
    ]
})
export class TicketNumberValidator implements Validator {
    validate(control: AbstractControl): { [key: string]: any; } {
        let ticketNumber: string = control.value;

        if (ticketNumber == undefined || ticketNumber.length == 0) {
            return {
                empty: true
            }
        }

        if (ticketNumber.length != 6) {
            return {
                invalidLength: true
            }
        }

        let number = ticketNumber.toInteger();

        if (isNaN(number)) {
            return {
                isNaN: true
            }
        }

        if (number < 1 || number > 999999) {
            return {
                outOfRange: true
            }
        }

        return null;
    }
}