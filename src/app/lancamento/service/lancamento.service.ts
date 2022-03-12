import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError as observableThrowError } from 'rxjs';
import { Lancamento } from '../model/lancamento';
import { LancamentoFiltro } from '../model/lancamentoFiltro';
import { LancamentosResponse } from '../model/response/lancamentosResponse';
import { DatePipe } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class LancamentoService {
	baseUrl = 'http://localhost:8080/api/entries';

	constructor(protected http: HttpClient, private datePipe: DatePipe) { }

	public getLancamentos<T>(): Observable<LancamentosResponse> {
		return this.http.get<LancamentosResponse>(this.baseUrl);
	}

	public getLancamentosComFiltro<T>(filtro: LancamentoFiltro): Observable<any> {
		let params = new HttpParams();
		params = params.set('page', filtro.page);
		params = params.set('size', filtro.size);

		if (filtro.descricao) params = params.set('descricao', filtro.descricao);
		if (filtro.dataVencimentoInicio)
			params = params.set(
				'dataVencimentoDe',
				this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!
			);
		if (filtro.dataVencimentoFim)
			params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);

		return this.http.get<T>(`${this.baseUrl}/paginated/v1`, { params });
	}

	public getLancamento(id: number) {
		return this.http.get<Lancamento>(`${this.baseUrl}/entry/${id}`);
	}

	excluir<T>(id: number): Observable<T> {
		return this.http.delete<T>(`${this.baseUrl}/entry/${id}`);
	}

	salvar(lancamento: Lancamento) {
		return this.http.post<Lancamento>(this.baseUrl, lancamento);
	}

	atualizar(lancamento: Lancamento) {
		return this.http.put<Lancamento>(`${this.baseUrl}/entry/${lancamento.id}`, lancamento);
	}
}


