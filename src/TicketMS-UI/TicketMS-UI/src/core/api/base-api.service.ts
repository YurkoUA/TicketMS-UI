import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './../../app/app.config';

export class BaseApiService {
    constructor(protected http: HttpClient) {

    }

    protected get baseUrl() {
        return baseUrl;
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

        alert(message);

        return new Observable();
    }
}
