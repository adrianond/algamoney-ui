import { Pessoa } from './../../pessoa/model/pessoa';
import { PessoaService } from './../../pessoa/service/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHanderService } from 'src/app/core/error-handler-service';
import { Categoria } from '../model/categoria';
import { CategoriaService } from './../../shared/service/categoria.service';
import { LancamentoCadastro } from '../model/lancamento';
import { NgForm } from '@angular/forms';
import { ddMMyyyy } from 'src/app/shared/utils/date-utils';
import { LancamentoService } from '../service/lancamento.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.scss']
})
export class LancamentoCadastroComponent implements OnInit {

  categoriaSelecionada!: Categoria;
  categorias: Categoria[] = [];
  pessoas: Pessoa[] = [];
  lancamento: LancamentoCadastro = new LancamentoCadastro();

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];


  constructor(private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHanderService: ErrorHanderService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.consultarCategorias();
    this.consultarPessoas();
  }

  private consultarCategorias() {
    this.categoriaService.consultarCategorias().subscribe(response => {
      this.categorias = response.categorias.map((c: any) => ({ label: c.nome, value: c.id }));
    }, (err => {
      this.errorHanderService.handle(err);
    }));
  }

  private consultarPessoas() {
    this.pessoaService.consultarPessoas().subscribe(response => {
      this.pessoas = response.pessoas.map((p: any) => ({ label: p.nome, value: p.id }));
    }, (err => {
      this.errorHanderService.handle(err);
    }));
  }

  onSubmit(lancamentoCadastroForm: NgForm) {
    this.lancamento = lancamentoCadastroForm.value;
    this.lancamento.dataVencimento = ddMMyyyy(lancamentoCadastroForm.value.dataVencimento);
    this.lancamento.dataRecebimentoPagamento = ddMMyyyy(lancamentoCadastroForm.value.dataRecebimentoPagamento);
    this.lancamentoService.salvar(this.lancamento).subscribe(response => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento cadastrado com sucesso.' })
      lancamentoCadastroForm.resetForm();
    }, (err) => {
      this.errorHanderService.handle(err);
    })
  }

}
