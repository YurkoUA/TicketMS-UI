import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { Observable } from "rxjs";

@Injectable()
export class LogoutGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (confirm('Ви впевнені?')) {
            this.authService.resetAuthentication();
            this.router.navigate(['/']);
        }

        return false;
    }
}
