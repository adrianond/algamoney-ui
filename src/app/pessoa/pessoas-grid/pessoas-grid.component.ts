import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHanderService } from 'src/app/core/error-handler-service';
import { Pessoa } from '../model/model';
import { PessoaFiltro } from '../model/pessoaFiltro';
import { PessoaService } from '../service/pessoa.service';

@Component({
	selector: 'app-pessoas-grid',
	templateUrl: './pessoas-grid.component.html',
	styleUrls: ['./pessoas-grid.component.scss']
})
export class PessoasGridComponent implements OnInit {
	filtro = new PessoaFiltro();
	@Input() resultado: any;
	@Output() paginaEventEmitter = new EventEmitter();
	@ViewChild('tabela') grid!: Table;

	constructor(
		private confirmationService: ConfirmationService,
		private service: PessoaService,
		private messageService: MessageService,
		private errorHanderService: ErrorHanderService,
		private router: Router
	) { }

	ngOnInit(): void {
	}


	aoMudarPagina(event: LazyLoadEvent) {
		/* event!.first - numero inicial do elemento da pagina atual por exemplo:
		pagina 1 - começa no elemento 0
		pagina 2 - começa no elemento 5
		pagina 3 -começa no elemento 10 */
		const pagina = event!.first! / event!.rows!;
		this.paginaEventEmitter.emit(pagina);
	}

	excluir(pessoa: Pessoa) {
		this.service.excluir(pessoa.id).subscribe(() => {
			this.grid.reset();
			this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' })
		},
			(err) => {
				this.errorHanderService.handle(err)
			});
	}

	confirmarExclusao(pessoa: Pessoa): void {
		this.confirmationService.confirm({
			message: 'Tem certeza que deseja excluir?',
			accept: () => {
				this.excluir(pessoa);
			}
		});
	}

	alterarStatus(pessoa: Pessoa) {
		this.service.alterarStatus(pessoa).subscribe(() => {
			this.grid.reset();
			const statusPessoa = pessoa.ativo ? 'desativada' : 'ativada';
			this.messageService.add({ severity: 'success', detail: 'Pessoa ' + statusPessoa  + ' com sucesso!' })
		},
			(err) => {
				this.errorHanderService.handle(err)
			}
		)
	}

	editar(pessoa: Pessoa) {
		this.router.navigateByUrl('/pessoas/nova', {
			state : {
				pessoa: pessoa,
				atualizar: true
			}
		  });
	}
}
