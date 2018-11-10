import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { map, catchError } from 'rxjs/operators';

export class BaseRestApiService extends BaseApiService {
    get<T>(url: string, params?: any): Observable<T> {
        return this.http.get(this.baseUrl + url, { params: params, observe: 'response' })
            .pipe(map(resp => this.extractData(resp)), catchError(err => this.handleError(err)));
    }

    post<TData, TResult>(url: string, data: TData, params?: any): Observable<TResult> {
        return this.http.post(this.baseUrl + url, data, { params: params, observe: 'response' })
            .pipe(map(resp => this.extractData(resp)), catchError(err => this.handleError(err)));
    }

    put<T>(url: string, data: T, params?: any): Observable<boolean> {
        return this.http.put(this.baseUrl + url, data, { params: params, observe: 'response' })
            .pipe(map(resp => this.extractData(resp)), catchError(err => this.handleError(err)));
    }

    delete(url: string, params?: any): Observable<boolean> {
        return this.http.delete(this.baseUrl + url, { params: params, observe: 'response' })
            .pipe(map(resp => this.extractData(resp)), catchError(err => this.handleError(err)));
    }
}
