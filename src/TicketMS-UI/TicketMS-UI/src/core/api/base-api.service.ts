import { HttpResponse, HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs';

export class BaseApiService {
    constructor(protected http: HttpClient) {

    }

    protected get baseUrl() {
        return '';
    }

    protected extractData<T>(resp: HttpResponse<T>): any {
        return resp.body;
    }

    protected handleError<T>(resp: HttpResponse<T> | any): any {
        let message: string = ``;
        let errors = resp.error as string[];

        if (errors != undefined && errors.length > 0) {
            message = errors.join('\n');
        }

        return new Observable();
    }
}
