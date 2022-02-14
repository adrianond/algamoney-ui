import { LancamentoCadastroComponent } from './lancamento/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasPesquisaComponent } from './pessoa/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa/pessoa-cadastro/pessoa-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamento/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { Routes, RouterModule } from '@angular/router';

registerLocaleData(ptBr);

const routes: Routes = [
	{ path: '', component: LancamentosPesquisaComponent },
	{ path: 'lancamentos', component: LancamentosPesquisaComponent },
	{ path: 'lancamentos/novo', component: LancamentoCadastroComponent },
	{ path: 'pessoas', component: PessoasPesquisaComponent },
	{ path: 'pessoas/nova', component: PessoaCadastroComponent }
];

@NgModule({
	declarations: [
		AppComponent
],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		HttpClientModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(routes)
	],
	providers: [ 
		MessageService,
		ConfirmationService,
		{ provide: LOCALE_ID, useValue: 'pt' } 
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
