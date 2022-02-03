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

registerLocaleData(ptBr);

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
	],
	providers: [ 
		MessageService,
		ConfirmationService,
		{ provide: LOCALE_ID, useValue: 'pt' } 
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
