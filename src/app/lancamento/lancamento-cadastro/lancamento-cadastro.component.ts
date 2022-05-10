import { Title } from '@angular/platform-browser';
import { PessoaService } from './../../pessoa/service/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHanderService } from 'src/app/core/error-handler-service';
import { Categoria } from '../model/categoria';
import { CategoriaService } from './../../shared/service/categoria.service';
import { Lancamento } from '../model/lancamento';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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
  lancamento = new Lancamento;
  state: any;
  formCadastro!: FormGroup;

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];


  constructor(private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHanderService: ErrorHanderService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private title: Title,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.state = this.router.getCurrentNavigation()?.extras?.state;
  }

  ngOnInit(): void {
    this.init();
    this.consultarCategorias();
    this.consultarPessoas();

    if (this.state?.atualizar) {
      this.title.setTitle('Alteração de lançamento');
      if (this.state?.lancamento)
          this.formCadastro.patchValue(this.state?.lancamento || {});
    } else {
      this.title.setTitle('Cadastro de lançamento');
    }
  }

  private init(): void {
    this.formCadastro = this.formBuilder.group({
      id: [],
      tipo: [this.tipos[0].value, Validators.required],
      dataVencimento: [null, Validators.required],
      dataRecebimentoPagamento: [null, Validators.required],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      observacao: []
    })
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

  onSubmit() {
    if (this.state?.atualizar)
      this.atualizar();
    else
      this.salvar();
  }

  atualizar() {
    this.lancamentoService.atualizar(this.buildLancamento(true)).subscribe(response => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso.' })
      this.router.navigateByUrl('/lancamentos/consulta');
    }, (err) => {
      this.errorHanderService.handle(err);
    })
  }

  salvar() {
    this.lancamentoService.salvar(this.buildLancamento(false)).subscribe(response => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento cadastrado com sucesso.' })
      this.router.navigateByUrl('/lancamentos/consulta');
    }, (err) => {
      this.errorHanderService.handle(err);
    })
  }

  private buildLancamento(atualizar: boolean) {
    Object.assign(this.lancamento, this.formCadastro.value)
    
    if (atualizar) {
      this.lancamento.dataVencimento = this.formCadastro.value.dataVencimento.replace(/[//]/g, '-')
      this.lancamento.dataRecebimentoPagamento = this.formCadastro.value.dataRecebimentoPagamento.replace(/[//"]/g, '-');
    } else {
      this.lancamento.dataVencimento = ddMMyyyy(this.formCadastro.value.dataVencimento);
      this.lancamento.dataRecebimentoPagamento = ddMMyyyy(this.formCadastro.value.dataRecebimentoPagamento);
    }
    this.lancamento.idCategoria = this.formCadastro.value.categoria.id;
    this.lancamento.idPessoa = this.formCadastro.value.pessoa.id;

    return this.lancamento;
  }

  novo() {
    this.formCadastro.reset();
    this.state.atualizar = false;
  }

  get tipo(): AbstractControl {
    return this.formCadastro.get('tipo')!;
  }

  get dataVencimento(): AbstractControl {
    return this.formCadastro.get('dataVencimento')!;
  }

  get dataRecebimentoPagamento(): AbstractControl {
    return this.formCadastro.get('dataRecebimentoPagamento')!;
  }

  get descricao(): AbstractControl {
    return this.formCadastro.get('descricao')!;
  }

  get valor(): AbstractControl {
    return this.formCadastro.get('valor')!;
  }

  get categoria(): AbstractControl {
    return this.formCadastro.get('categoria')!;
  }

  get pessoa(): AbstractControl {
    return this.formCadastro.get('pessoa')!;
  }

}
