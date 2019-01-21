import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AuthService} from './auth-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private authService: AuthService,
               private router: Router) {}

  canActivate (route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {

    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            console.log('authenticated');
            return true;
          } else {
            console.log('not authenticated');
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
  }


  // Call authenticated and navigate route
}
