import { AuthService } from './../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { Lancamento } from './../model/lancamento';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoService } from '../service/lancamento.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { LancamentoFiltro } from '../model/lancamentoFiltro';
import { Table } from 'primeng/table';
import { ErrorHanderService } from 'src/app/core/error-handler-service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-lancamentos-pesquisa',
	templateUrl: './lancamentos-pesquisa.component.html',
	styleUrls: ['./lancamentos-pesquisa.component.scss']
})
export class LancamentosPesquisaComponent implements OnInit {
	lancamentos: any[] = [];
	filtro = new LancamentoFiltro();
	totalRegistros: number = 0
	@ViewChild('tabela') grid!: Table; // mapeado no template (#tabela) para atualizar a grid

	constructor(
		private service: LancamentoService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private errorHanderService: ErrorHanderService,
		private authService: AuthService,
		private title: Title,
		private router: Router,
	) { }

	ngOnInit(): void {
		this.title.setTitle('Pesquisa de lançamentos')
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
		console.log('event.first', event.first)
		console.log('event.rows', event.rows)
		/* event!.first - numero inicial do elemento da pagina atual, por exemplo:
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
		console.log('pesquisar')
		this.service.getLancamentos().subscribe(
			(response) => {
				this.lancamentos = response.lancamentos;
			},
			(err) => {
				this.errorHanderService.handle(err);
			}
		);
	}

	editar(lancamento: any) {
		this.router.navigateByUrl('/lancamentos/editar', {
          state : {
			  lancamento: lancamento,
			  atualizar: true
		  }
		});
	}

	public temPermissao(permissao: string): boolean {
      return this.authService.temPermissao(permissao);
	}

}
