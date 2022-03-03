import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';


const routes: Routes = [
	{
		path: '',
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
	{ path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
