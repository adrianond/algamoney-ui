import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  exibindoMenu: boolean = false;
  usuarioLogado: string = '';


  constructor(private auth: AuthService) {}
  
  ngOnInit(): void {
    this.usuarioLogado = this.auth?.jwtPayload.nome;
  }

  public temPermissao(permissao: string) {
    return this.auth.jwtPayload && this.auth.jwtPayload.authorities.includes(permissao);
}

gerarNovoAccesToken() {
  this.auth.gerarNovoAccessToken();
}
  
}
