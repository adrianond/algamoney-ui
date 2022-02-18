import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PessoaService } from './../service/pessoa.service';
import { NgForm } from '@angular/forms';
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
  pessoa: Pessoa = new Pessoa();
  state: any;


  constructor(private service: PessoaService,
      private errorHanderService: ErrorHanderService,
      private messageService: MessageService,
      private title: Title,
      private router: Router
    ) 
    { 
      this.state = this.router.getCurrentNavigation()?.extras?.state;
    }

  ngOnInit(): void {
    if (this.state?.atualizar)
      this.title.setTitle('Alteração de pessoa');
    else   
      this.title.setTitle('Cadastro de pessoa');

    if (this.state?.pessoa) 
        this.pessoa = this.state?.pessoa;
  }

  onSubmit(pessoaCadastroForm: NgForm) {
    if (this.state?.atualizar)
        this.atualizar();
     else
        this.salvar();
    }

  salvar() {
    this.service.salvar(this.pessoa).subscribe(response => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa cadastrada com sucesso.' })
      this.router.navigateByUrl('/pessoas/consulta');
    }, (err => {
      this.errorHanderService.handle(err);
    }))
  }

  atualizar() {
    this.service.alterar(this.pessoa).subscribe(response => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso.' })
      this.router.navigateByUrl('/pessoas/consulta');
    }, (err => {
      this.errorHanderService.handle(err);
    }))
  }
}
