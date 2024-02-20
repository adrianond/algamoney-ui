import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaoAutorizadoComponent } from './core/nao-autorizado-componente';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';


const routes: Routes = [
	{
		path: '',
		// lazy loading -> carregamento tardio dos módulos
		loadChildren: () => import('./seguranca/seguranca.module').then((m) => m.SegurancaModule),
	},
	{
		path: 'lancamentos',
		loadChildren: () => import('./lancamento/lancamento.module').then((m) => m.LancamentoModule),
	},
	{
		path: 'pessoas',
		loadChildren: () => import('./pessoa/pessoa.module').then((m) => m.PessoaModule),
	},
	{ path: 'nao-autorizado', component: NaoAutorizadoComponent },
	{ path: '**', component: PaginaNaoEncontradaComponent } // senão encontrar nenhuma rota defina acima 
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes), //forRoot, pois trata -se do modulo raiz (app-module)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
