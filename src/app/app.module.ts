import { LancamentoModule } from './lancamento/lancamento.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { PessoaModule } from './pessoa/pessoa.module';
import { CoreModule } from './core/core.module';

registerLocaleData(ptBr);

@NgModule({
	declarations: [
		AppComponent
],
	imports: [
		BrowserModule,
		AppRoutingModule,
		PessoaModule,
		LancamentoModule,
		CoreModule
	],
	providers: [ { provide: LOCALE_ID, useValue: 'pt' } ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
