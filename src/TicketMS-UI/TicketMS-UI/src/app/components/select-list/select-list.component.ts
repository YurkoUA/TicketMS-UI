import { Component, OnInit, Input, EventEmitter, Output, Injector, forwardRef } from '@angular/core';
import { NameValueModel } from '../../../models/name-value.model';
import { INameValuesService } from '../../../services/interfaces/name-values-service-interface';
import { SelectListType } from '../../../models/enums/select-list-type.enum';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Component({
    selector: 'app-select-list',
    templateUrl: './select-list.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectListComponent),
        multi: true
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => SelectListComponent),
        multi: true
    }],
    host: { '(blur)': 'onTouched($event)' }
})
export class SelectListComponent implements OnInit, ControlValueAccessor, Validator {
    @Input() disabled = false;    
    @Input() type: SelectListType;
    @Input() nullItem: boolean = false;
    @Input() nullItemText: string;

    modelIdValue: number = null;

    get modelId(): number {
        return this.modelIdValue;
    }

    set modelId(id: number) {
        this.modelIdValue = id;
        this.onChange(this.modelId);
    }

    items: NameValueModel<any>[] = [];
    service: INameValuesService<any>;

    onChange = (modelId: number) => {};
    onTouched = () => {};

    constructor(private injector: Injector) {
    }

    ngOnInit(): void {
        let serviceName = this.resolveServiceName();
        this.service = this.injector.get(serviceName);

        if (this.service) {
            this.loadItems();
        }
    }

    loadItems(): void {
        this.service.getItems()
            .subscribe(items => this.items = items);
    }

    resolveServiceName(): string {
        switch (this.type) {
            case SelectListType.Serial:
                return 'SerialService';

            case SelectListType.Color:
                return 'ColorService';

            case SelectListType.Nominal:
                return 'NominalService';

            default:
                return null;
        }
    }

    writeValue(obj: any): void {
        this.modelId = obj;
        this.onChange(this.modelId);
        this.onTouched();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    
    validate(control: AbstractControl): { [key: string]: any; } {
        if (!this.modelId || isNaN(this.modelId)) {
            return {
                selected: false
            };
        }

        return null;
    }
}
