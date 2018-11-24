import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.authService.isAuthenticated()) {
            return true;
        }

        this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
