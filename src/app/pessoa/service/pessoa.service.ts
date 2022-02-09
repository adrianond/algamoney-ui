import { Pessoa } from './../model/pessoa';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PessoaFiltro } from '../model/pessoaFiltro';
import { PessoasResponse } from '../model/response/PessoasResponse';


@Injectable({
	providedIn: 'root'
})
export class PessoaService {
	baseUrl = 'http://localhost:8080/api/persons';

	constructor(private http: HttpClient) {}

	getPessoasComPaginacao(pessoaFiltro: PessoaFiltro): Observable<any> {
		let params = new HttpParams();
        params = params.set('page', pessoaFiltro.page);
		params = params.set('size', pessoaFiltro.size);

		if (pessoaFiltro.nome) 
            params = params.set('nome', pessoaFiltro.nome);

		return this.http.get<PessoasResponse>(`${this.baseUrl}/paginated`, { params });
	}

	excluir<T>(id: number): Observable<T> {
		return this.http.delete<T>(`${this.baseUrl}/person/${id}`);
	}

	alterarStatus<T>(pessoa: Pessoa) {
	   return this.http.put<T>(`${this.baseUrl}/person/${pessoa.id}/ativo`, !pessoa.ativo);
	}

	consultarPessoas<T>(): Observable<any> {
		return this.http.get<T>(`${this.baseUrl}`);
	}
}

