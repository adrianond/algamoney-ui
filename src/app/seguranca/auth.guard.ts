import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
 
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      //se retornar true o processo de navegação continua
    if (this.authService.isAccessTokenInvalido()) {
      console.log('AuthGuard - token invalido')
      this.gerarAccessTokenComRefreshToken()
      return false;
    }
    else if (route.data.roles && route.data.roles.some((role: any) => this.authService.temPermissao(role))) {
      console.log('AuthGuard - token valido')
      return true;
    } else {
      this.router.navigate(['/nao-autorizado']);
      return false;
    }
  }

  private gerarAccessTokenComRefreshToken() {
    console.log('AuthGuard - gerarAccessTokenComRefreshToken')
    this.authService.gerarNovoAccessToken().subscribe(res => {
      console.log('AuthGuard - gerarAccessTokenComRefreshToken - res',  res['access_token'])
      localStorage.setItem('token', res['access_token']);
      if (this.authService.isAccessTokenInvalido()) {
        console.log('AuthGuard - token invalido - tela login')
        this.router.navigateByUrl('/')
      }   
    }, (err => {
      console.log('err', err.status)
    }))
  }

}
