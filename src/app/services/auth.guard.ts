import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, Router, CanActivateChildFn } from '@angular/router';

//import auth service
import { AuthService } from './auth.service';
import { Observable, catchError, map } from 'rxjs';

@Injectable()
export class AuthGuard {
  
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.hasToken();
    if (currentUser) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}