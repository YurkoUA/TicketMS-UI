import { NameValueModel } from "../../models/name-value.model";
import { Observable } from "rxjs";

export interface INameValuesService<TValue> {
    getItems(): Observable<NameValueModel<TValue>[]>;
}