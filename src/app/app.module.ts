import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { SegurancaModule } from './seguranca/seguranca.module';
//import { JwtModule } from '@auth0/angular-jwt';
import { MoneyHttpInterceptor } from './seguranca/money-http-interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

registerLocaleData(ptBr);

/* export function tokenGetter(): string {
	return localStorage.getItem('token')!;
} */
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
		AppRoutingModule,
		SegurancaModule,
		//JwtModule.forRoot({
			//config: {
			//	tokenGetter,
				//Para que funcione a interceptação das requisições, e para que seja adicionado o token 
				//nos Headers, precisamos informar quais URLs devemos interceptar, e quais devemos ignorar.
			//	allowedDomains: ['localhost:8080'],
			//	disallowedRoutes: ['http://localhost:8080/oauth/token']
			//}
		//}),
	],
	
	providers: [
		MessageService,
		ConfirmationService,
		JwtHelperService,
		{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, 
		{provide: LOCALE_ID, useValue: 'pt'},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: MoneyHttpInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
