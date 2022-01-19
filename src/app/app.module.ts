import { LancamentoModule } from './lancamento/lancamento.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button'; */
import { NavbarComponent } from './navbar/navbar.component';
import { LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
/* import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask'; */
/* import { MessageModule } from 'primeng/message'; */
/* import { CurrencyMaskModule } from 'ng2-currency-mask'; */
/* import { NgxMaskModule, IConfig } from 'ngx-mask'; */
import { PessoaModule } from './pessoa/pessoa.module';

registerLocaleData(ptBr);

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
],
	imports: [
		BrowserModule,
		AppRoutingModule,
	/* 	InputTextModule,
		InputNumberModule,
		ButtonModule,
		TableModule,
		TooltipModule,
		DropdownModule,
		InputTextareaModule,
		CalendarModule,
		SelectButtonModule,
		BrowserAnimationsModule,
		FormsModule,
		InputMaskModule, */
		/* MessageModule, */
		/* CurrencyMaskModule, */
		PessoaModule,
		LancamentoModule,
		/* NgxMaskModule.forRoot() */
	],
	providers: [ { provide: LOCALE_ID, useValue: 'pt' } ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
