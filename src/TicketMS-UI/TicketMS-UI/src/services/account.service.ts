import { Injectable } from '@angular/core';
import { BaseRestApiService } from '../core/api/base-rest-api.service';
import { SignInRequest } from '../models/signin-request.model';
import { Observable } from 'rxjs';
import { SignInResponse } from '../models/signin-response.model';
import { User } from '../models/domain/user';

@Injectable()
export class AccountService extends BaseRestApiService {
    private entityUrl: string = '/api/Account/';

    signIn(model: SignInRequest): Observable<SignInResponse> {
        return this.post(this.entityUrl + 'SignIn', model);
    }

    getAccount(): Observable<User> {
        return this.get(this.entityUrl);
    }
}
