import { AuthGuard } from './../seguranca/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

const routes: Routes = [
  { path: '', redirectTo: 'consulta', pathMatch: 'full' }, // pathMatch: 'full' para usar o path completo, ou seja, nada apenas a '/'
  {
    path: 'consulta',
    component: LancamentosPesquisaComponent,
    canActivate: [AuthGuard], //add guarda de rotas
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] } // add roles q podem acessar a rota
  },
  {
    path: 'novo', component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] } 
  },
  {
    path: 'editar', component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] } 
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentoRoutingModule { }
