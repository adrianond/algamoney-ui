import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl : string;
  jwtPayload: any;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) {
      this.baseUrl = `${environment.apiUrl}`;
  }

  login<T>(usuario: string, senha: string) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      //username e password em base 64
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    //withCredentials: true -> para requisição croos-site(protocolo, dominio ou porta diferente da origen) que deve enviar credenciais como os cookies
    return this.http.post<any>(`${this.baseUrl}/oauth/token`, body, { headers, withCredentials: true });
  }

  gerarNovoAccessToken<T>() {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      //username e password em base 64
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';
    //withCredentials: true -> para requisição croos-site(protocolo, dominio ou porta diferente da origen) que deve enviar credenciais como os cookies
    return this.http.post<any>(`${this.baseUrl}/oauth/token`, body, { headers, withCredentials: true })
  }

  public logout() {
    return this.http.delete(`${this.baseUrl}/api/token/revoke`);
  }

  public temPermissao(permissao: string) {
    const token = this.getToken();
    this.jwtPayload = this.jwtHelper.decodeToken(token!);

    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  isAccessTokenInvalido() {
    const token = this.getToken();
    console.log('getToken()', token)
    console.log('token invalido?',  !token || this.jwtHelper.isTokenExpired(token))
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
