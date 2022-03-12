import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHanderService } from 'src/app/core/error-handler-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  jwtPayload: any;

  constructor(
    private service: AuthService,
    private router: Router,
    private errorHanderService: ErrorHanderService,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
  }

  ngOnInit(): void {
  }

  login(usuario: string, senha: string) {
    this.service.login(usuario, senha).subscribe(response => {
      this.armazenarToken(response['access_token']);
      this.router.navigateByUrl('/lancamentos/consulta');
    }, (err => {
      this.errorHanderService.handle(err);
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
