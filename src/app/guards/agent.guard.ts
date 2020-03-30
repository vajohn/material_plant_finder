import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../services/login.service";

@Injectable({
  providedIn: 'root'
})
export class AgentGuard implements CanActivate {

  constructor(private router: Router, private ls: LoginService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.ls.currentUserInfoValue;

    if (currentUser) {
      // check if route is restricted by role
      if (!currentUser.userInfo.roles[0].agent) {
        // role not authorised so redirect to home page
        this.router.navigate(['/dashboard']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
