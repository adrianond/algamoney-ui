import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule,  DatePipe, registerLocaleData } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import localePt from '@angular/common/locales/pt';
import { LancamentoModule } from '../lancamento/lancamento.module';
import { PessoaModule } from '../pessoa/pessoa.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ErrorHanderService } from './error-handler-service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../seguranca/auth.service';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    LancamentoModule,
    PessoaModule,
    ToastModule,
		ConfirmDialogModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    ToastModule,
		ConfirmDialogModule
  ],
  providers: [
    DatePipe,
    ErrorHanderService,
    Title,
    AuthService
    //{provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
