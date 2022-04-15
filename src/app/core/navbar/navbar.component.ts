import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  exibindoMenu: boolean = false;
  usuarioLogado: string = '';
  jwtPayload: any;


  constructor(private jwtHelper: JwtHelperService, private authService: AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    this.jwtPayload = this.jwtHelper.decodeToken(token!);
    this.usuarioLogado = this.jwtPayload.nome;
  }

  public temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

}
