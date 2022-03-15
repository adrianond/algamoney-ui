import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHanderService } from '../core/error-handler-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private errorHanderService: ErrorHanderService,
    private router: Router
  ) {
    //this.carregarToken();
  }

  login<T>(usuario: string, senha: string) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      //username e password em base 64
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    //withCredentials: true -> para requisição croos-site(protocolo, dominio ou porta diferente da origen) que deve enviar credenciais como os cookies
    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .subscribe(response => {
        this.armazenarToken(response['access_token']);
        this.router.navigateByUrl('/lancamentos/consulta');
      }, (err => {
        this.errorHanderService.handle(err);
      }))
  }

  gerarNovoAccessToken<T>() {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      //username e password em base 64
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

      const body = 'grant_type=refresh_token';
    //withCredentials: true -> para requisição croos-site(protocolo, dominio ou porta diferente da origen) que deve enviar credenciais como os cookies
    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .subscribe(response => {
       console.log('Novo access toke gerado', response['access_token'])
       this.armazenarToken(response['access_token']);
      }, (err => {
        console.log('Eroo ao gerar access token!')
      }))
  }

  public armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    console.log(this.jwtPayload);

    localStorage.setItem('token', token);
  }

  public carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

}
