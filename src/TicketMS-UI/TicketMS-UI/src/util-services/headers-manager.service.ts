import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeadersManagerService {
    private headers: HttpHeaders = new HttpHeaders();

    getHeaders(): HttpHeaders {
        return this.headers;
    }

    addHeader(name: string, value: string): void {
        this.headers = this.headers.set(name, value);
    }

    deleteHeader(name: string): void {
        this.headers = this.headers.delete(name);
    }

    clearHeaders(): void {
        this.headers = null;
    }
}
