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



  constructor(private service: PessoaService,
      private errorHanderService: ErrorHanderService,
      private messageService: MessageService,
      private title: Title
    ) 
    { }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de pessoa');
  }

  onSubmit(pessoaCadastroForm: NgForm) {
    this.service.salvar(this.pessoa).subscribe(response => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa cadastrada com sucesso.' })
      pessoaCadastroForm.reset();
    }, (err => {
      this.errorHanderService.handle(err);
    }))

  }

}
