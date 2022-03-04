import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHanderService } from 'src/app/core/error-handler-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private service: AuthService,
    private router: Router,
    private errorHanderService: ErrorHanderService
  ) { }

  ngOnInit(): void {
  }

  login(usuario: string, senha: string) {
    this.service.login(usuario, senha).subscribe(response => {
      console.log('retorno', response)
      this.router.navigateByUrl('/lancamentos/consulta');
    }, (err => {
      this.errorHanderService.handle(err);
    }))
  }

}
