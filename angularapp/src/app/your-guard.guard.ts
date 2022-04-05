import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { MsqlServiceService } from './service/msql-service.service';

@Injectable({
  providedIn: 'root',
})
export class YourGuardGuard implements CanActivate {
  constructor(private restrict: MsqlServiceService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    // | Observable<boolean | UrlTree>
    // | Promise<boolean | UrlTree>
    // |
     boolean
    // | UrlTree 
    {
    //   return this.restrict
    //     .isLoggedIn()
    //     .pipe(map((isLoggedIn) => isLoggedIn || this.router.createUrlTree([''])));

    if (!this.restrict.isAuthenticated()) {
      console.log(this.restrict.isAuthenticated());
      
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
