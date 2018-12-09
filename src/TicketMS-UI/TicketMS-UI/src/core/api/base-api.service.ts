import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './../../app/app.config';
import { ToastrService } from 'ngx-toastr';

export class BaseApiService {
    constructor(protected http: HttpClient, protected toastr: ToastrService) {

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

        if (message.length > 0) {
            this.toastr.error(message);
        }

        return new Observable();
    }
}
