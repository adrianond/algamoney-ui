import { PessoaService } from './../../pessoa/service/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHanderService } from 'src/app/core/error-handler-service';
import { Categoria } from '../model/categoria';
import { CategoriaService } from './../../shared/service/categoria.service';
import { Lancamento } from '../model/lancamento';
import { NgForm } from '@angular/forms';
import { ddMMyyyy } from 'src/app/shared/utils/date-utils';
import { LancamentoService } from '../service/lancamento.service';
import { MessageService } from 'primeng/api';
import { Pessoa } from 'src/app/pessoa/model/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.scss']
})
export class LancamentoCadastroComponent implements OnInit {

  categoriaSelecionada!: Categoria;
  categorias: Categoria[] = [];
  pessoas: Pessoa[] = [];
  lancamento: Lancamento = new Lancamento();
  state: any;

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];


  constructor(private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHanderService: ErrorHanderService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.state = this.router.getCurrentNavigation()?.extras?.state;
  }

  ngOnInit(): void {
    this.consultarCategorias();
    this.consultarPessoas();
    this.lancamento.tipo = this.tipos[0].value;
    if (this.state?.lancamento) {
      this.lancamento = this.state?.lancamento;
      this.lancamento.idCategoria = this.state?.lancamento?.categoria.id;
      this.lancamento.idPessoa = this.state?.lancamento?.pessoa.id;
    }
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
    if (this.state?.atualizar)
      this.atualizar(lancamentoCadastroForm);
    else
      this.salvar(lancamentoCadastroForm);
  }

  atualizar(lancamentoCadastroForm: NgForm) {
    this.lancamento.dataVencimento = this.lancamento.dataVencimento.replace(/[//]/g, '-')
    this.lancamento.dataRecebimentoPagamento = this.lancamento.dataRecebimentoPagamento.replace(/[//"]/g, '-');

    this.lancamentoService.atualizar(this.lancamento).subscribe(response => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso.' })
      lancamentoCadastroForm.resetForm();
    }, (err) => {
      this.errorHanderService.handle(err);
    })
  }

  salvar(lancamentoCadastroForm: NgForm) {
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
