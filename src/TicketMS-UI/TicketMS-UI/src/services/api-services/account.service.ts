import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestApiService } from '../../core/api/base-rest-api.service';
import { SignInResponse } from '../../models/signin-response.model';
import { SignInRequest } from '../../models/signin-request.model';
import { User } from '../../models/domain/user';
import { HttpClient } from '@angular/common/http';
import { HeadersManagerService } from '../../util-services/headers-manager.service';

@Injectable()
export class AccountService extends BaseRestApiService {
    constructor(http: HttpClient, headersService: HeadersManagerService) {
        super('/api/Account/', http, headersService);
    }

    signIn(model: SignInRequest): Observable<SignInResponse> {
        return this.post('SignIn', model);
    }

    getAccount(): Observable<User> {
        return this.get('');
    }
}
