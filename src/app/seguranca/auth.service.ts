import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
  }

  login<T>(usuario: string, senha: string) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      //username e password em base 64
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    //withCredentials: true -> para requisição croos-site(protocolo, dominio ou porta diferente da origen) que deve enviar credenciais como os cookies
    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true });
  }

  gerarNovoAccessToken<T>() {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      //username e password em base 64
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';
    //withCredentials: true -> para requisição croos-site(protocolo, dominio ou porta diferente da origen) que deve enviar credenciais como os cookies
    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
  }

  public logout() {
    return this.http.delete('http://localhost:8080/api/token/revoke');
  }

  public temPermissao(permissao: string) {
    const token = this.getToken();
    this.jwtPayload = this.jwtHelper.decodeToken(token!);

    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  isAccessTokenInvalido() {
    const token = this.getToken();
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

}
