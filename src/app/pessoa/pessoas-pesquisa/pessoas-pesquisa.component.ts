import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../service/pessoa.service';
import { PessoaFiltro } from '../model/pessoaFiltro';
import { ErrorHanderService } from 'src/app/core/error-handler-service';

@Component({
	selector: 'app-pessoas-pesquisa',
	templateUrl: './pessoas-pesquisa.component.html',
	styleUrls: [ './pessoas-pesquisa.component.scss' ]
})
export class PessoasPesquisaComponent implements OnInit {
	pessoaFiltro = new PessoaFiltro();
	resultado!: any;

	constructor(
		private pessoaService: PessoaService,
		private errorHanderService: ErrorHanderService,
		private title: Title
		) {}

	ngOnInit(): void {
		this.title.setTitle('Pesquisa de pessoas');
	}

	pesquisar(pagina: number = this.pessoaFiltro.page) {
		this.pessoaFiltro.page = pagina;
		this.pessoaService.getPessoasComPaginacao(this.pessoaFiltro).subscribe(
			(response) => {
				this.resultado = {
					pessoas: response.pessoas.content,
					totalRegistros: response.pessoas.totalElements
				}
			},
			(err) => {
				this.errorHanderService.handle(err)
			}
		);
	}

	aoMudarPagina(pagina: number) {
		this.pesquisar(pagina);
	}
}
