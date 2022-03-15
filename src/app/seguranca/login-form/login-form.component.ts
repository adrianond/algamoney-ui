import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { JwtHelperService } from '@auth0/angular-jwt';
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
  ) {}

  ngOnInit(): void {
  }

  login(usuario: string, senha: string) {
    this.service.login(usuario, senha) 
  }
}
