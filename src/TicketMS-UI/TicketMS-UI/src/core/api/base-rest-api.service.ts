import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HeadersManagerService } from '../../util-services/headers-manager.service';

export class BaseRestApiService extends BaseApiService {
    constructor(protected entityUrl: string, http: HttpClient, private headersService: HeadersManagerService) {
        super(http);
    }

    get<T>(url: string, params?: any): Observable<T> {
        return this.http.get(this.baseUrl + this.entityUrl + url, { params: params, observe: 'response', headers: this.headersService.getHeaders() })
            .pipe(map(resp => this.extractData(resp)), catchError(err => this.handleError(err)));
    }

    post<TData, TResult>(url: string, data: TData, params?: any): Observable<TResult> {
        return this.http.post(this.baseUrl + this.entityUrl + url, data, { params: params, observe: 'response', headers: this.headersService.getHeaders() })
            .pipe(map(resp => this.extractData(resp)), catchError(err => this.handleError(err)));
    }

    put<T>(url: string, data: T, params?: any): Observable<boolean> {
        return this.http.put(this.baseUrl + this.entityUrl + url, data, { params: params, observe: 'response', headers: this.headersService.getHeaders() })
            .pipe(map(resp => this.extractData(resp)), catchError(err => this.handleError(err)));
    }

    delete(url: string, params?: any): Observable<boolean> {
        return this.http.delete(this.baseUrl + this.entityUrl + url, { params: params, observe: 'response', headers: this.headersService.getHeaders() })
            .pipe(map(resp => this.extractData(resp)), catchError(err => this.handleError(err)));
    }
}
