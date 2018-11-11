import { User } from "./domain/user";
import { AccessToken } from "./access-token.model";

export class SignInResponse {
    Token: AccessToken = new AccessToken();
    User: User = new User();
}
