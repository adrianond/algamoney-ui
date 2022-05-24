import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PessoaService } from './../service/pessoa.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/model';
import { ErrorHanderService } from 'src/app/core/error-handler-service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.scss']
})
export class PessoaCadastroComponent implements OnInit {
  pessoa = new Pessoa;
  state: any;
  formCadPessoa!: FormGroup;
  submitted: boolean = false;

  constructor(private service: PessoaService,
    private errorHanderService: ErrorHanderService,
    private messageService: MessageService,
    private title: Title,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.state = this.router.getCurrentNavigation()?.extras?.state;
  }

  ngOnInit(): void {
    this.init();

    if (this.state?.atualizar)
      this.title.setTitle('Alteração de pessoa');
    else
      this.title.setTitle('Cadastro de pessoa');

    if (this.state?.pessoa)
      this.pessoa = this.state?.pessoa;
  }

  private init() {
    this.formCadPessoa = this.formBuilder.group({
      id: [],
      nome: [null, [Validators.required, Validators.minLength(5)]],
      endereco: this.formBuilder.group({
        logradouro: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [],
        bairro: [null, Validators.required],
        cep: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.state?.atualizar)
      this.atualizar();
    else
      this.salvar();
  }

  salvar() {
    if (this.formCadPessoa.valid) {
      Object.assign(this.pessoa, this.formCadPessoa);
      this.service.salvar(this.pessoa).subscribe(response => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa cadastrada com sucesso.' })
        this.router.navigateByUrl('/pessoas/consulta');
      }, (err => {
        this.errorHanderService.handle(err);
      }))
    } else {
      this.messageService.add({ severity: 'error', detail: 'Informe os campos obrigatórios.' })
    }
  }

  atualizar() {
    if (this.formCadPessoa.valid) {
      Object.assign(this.pessoa, this.formCadPessoa);
      this.service.alterar(this.pessoa).subscribe(response => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso.' })
        this.router.navigateByUrl('/pessoas/consulta');
      }, (err => {
        this.errorHanderService.handle(err);
      }))
    }
  }

  get nome(): AbstractControl {
    return this.formCadPessoa.get('nome')!;
  }

  get endereco(): AbstractControl {
    return this.formCadPessoa.get('endereco')!;
  }

  get logradouro(): AbstractControl {
    return this.endereco.get('logradouro')!;
  }
  
  get numero(): AbstractControl {
    return this.endereco.get('numero')!;
  }

  get bairro(): AbstractControl {
    return this.endereco.get('bairro')!;
  }

  get cep(): AbstractControl {
    return this.endereco.get('cep')!;
  }

  get cidade(): AbstractControl {
    return this.endereco.get('cidade')!;
  }

  get estado(): AbstractControl {
    return this.endereco.get('estado')!;
  }
}
