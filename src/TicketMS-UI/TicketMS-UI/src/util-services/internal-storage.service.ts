import { Injectable } from '@angular/core';

@Injectable()
export class InternalStorageService {
    getItem(key: string): string {
        return sessionStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }

    setItemObject<T>(key: string, value: T): void {
        this.setItem(key, JSON.stringify(value));
    }

    deleteItem(key: string): void {
        sessionStorage.removeItem(key);
    }
}
