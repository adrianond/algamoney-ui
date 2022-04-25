import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.auth.isAccessTokenInvalido()) {
      this.gerarAccessTokenComRefreshToken()
      if (this.auth.isAccessTokenInvalido()) {
        this.router.navigateByUrl('/')
      }
      return false;
    }
    else if (route.data.roles && route.data.roles.some((role: any) => this.auth.temPermissao(role))) {
      return true;
    } else {
      this.router.navigate(['/nao-autorizado']);
      return false;
    }
  }

  private gerarAccessTokenComRefreshToken() {
    this.auth.gerarNovoAccessToken().subscribe(res => {
      localStorage.setItem('token', res.access_token);
    }, (err => {
      console.log('err', err.status)
    }))
  }

}
