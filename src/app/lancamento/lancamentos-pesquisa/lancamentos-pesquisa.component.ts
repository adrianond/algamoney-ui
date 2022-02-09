import { Lancamento } from './../model/lancamento';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoService } from '../service/lancamento.service';
import { finalize } from 'rxjs/operators';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { LancamentoFiltro } from '../model/lancamentoFiltro';
import { Table } from 'primeng/table';
import { ErrorHanderService } from 'src/app/core/error-handler-service';

@Component({
	selector: 'app-lancamentos-pesquisa',
	templateUrl: './lancamentos-pesquisa.component.html',
	styleUrls: ['./lancamentos-pesquisa.component.scss']
})
export class LancamentosPesquisaComponent implements OnInit {
	lancamentos: Lancamento[] = [];
	filtro = new LancamentoFiltro();
	totalRegistros: number = 0
	@ViewChild('tabela') grid!: Table;

	constructor(
		private service: LancamentoService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private errorHanderService: ErrorHanderService
	) { }

	ngOnInit(): void {
		//this.pesquisar();
	}

	pesquisarComPaginacao(pagina: number = this.filtro.page): void {
		this.filtro.page = pagina;
		this.service.getLancamentosComFiltro(this.filtro).subscribe(
			(response) => {
				this.lancamentos = response.lancamentos.content;
				this.totalRegistros = response.lancamentos.totalElements;
			},
			(err) => {
				this.errorHanderService.handle(err);
			}
		);
	}

	aoMudarPagina(event: LazyLoadEvent) {
		/* event!.first - numero inicial do elemento da pagina atual por exemplo:
		pagina 1 - começa no elemento 0
		pagina 2 - começa no elemento 5
		pagina 3 -começa no elemento 10 */
		const pagina = event!.first! / event!.rows!;
		this.pesquisarComPaginacao(pagina);
	}

	confirmarExclusao(lancamento: Lancamento): void {
		this.confirmationService.confirm({
			message: 'Tem certeza que deseja excluir?',
			accept: () => {
				this.excluir(lancamento);
			}
		});
	}

	excluir(lancamento: Lancamento) {
		this.service.excluir(lancamento.id).subscribe(() => {
			this.grid.reset();
			this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' })
		},
			(err) => {
				this.errorHanderService.handle(err);
			});
	}

	pesquisar(): void {
		this.service.getLancamentos().subscribe(
			(response) => {
				this.lancamentos = response.lancamentos;
			},
			(err) => {
				this.errorHanderService.handle(err);
			}
		);
	}
}
