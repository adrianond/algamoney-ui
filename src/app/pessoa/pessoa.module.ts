import { InputNumberModule } from 'primeng/inputnumber';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PessoasGridComponent } from '../pessoa/pessoas-grid/pessoas-grid.component';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { PessoasPesquisaComponent } from '../pessoa/pessoas-pesquisa/pessoas-pesquisa.component';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { PessoaRoutingModule } from './pessoa-routing.module';


@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    PessoasGridComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    SharedModule,
    InputNumberModule,
    PessoaRoutingModule,
    NgxMaskModule.forRoot()
  ],

  exports: [
  ]
})
export class PessoaModule { }
