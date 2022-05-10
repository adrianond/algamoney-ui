import { LancamentoRoutingModule } from './lancamento-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    DropdownModule,
    CurrencyMaskModule,
    CalendarModule,
    SelectButtonModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    MessageModule,
    SharedModule,
    TooltipModule,
    LancamentoRoutingModule
  ],
  exports: [
  ]
})
export class LancamentoModule { }
