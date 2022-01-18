import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.scss']
})
export class PesquisaPessoasComponent {
  
  pessoas = [
    { nome: 'CARLOS', cidade: 'São Paulo', uf: 'SP', status: true },
    { nome: 'PEDRO', cidade: 'São Paulo', uf: 'SP', status: false },
    { nome: 'CARLA', cidade: 'São Paulo', uf: 'SP', status: false },
    { nome: 'RICK', cidade: 'São Paulo', uf: 'SP', status: true },
    { nome: 'ANA LUCIA', cidade: 'São Paulo', uf: 'SP', status: true },
    { nome: 'MARIA DA SILVA', cidade: 'São Paulo', uf: 'SP', status: true },
    { nome: 'CARLOS ANDRE', cidade: 'São Paulo', uf: 'SP', status: false },
    { nome: 'ITALO FERREIRA', cidade: 'São Paulo', uf: 'SP', status: true },
  ];
}


