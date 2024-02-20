import { Pessoa } from './../model/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PessoaFiltro } from '../model/pessoaFiltro';
import { PessoasResponse } from '../model/response/pessoas-response';
import { environment } from 'src/environments/environment';




@Injectable({
	providedIn: 'root'
})
export class PessoaService {
	baseUrl : string;

	constructor(private http: HttpClient) {
		this.baseUrl = `${environment.apiUrl}/api/persons`;
	}

	getPessoasComPaginacao(pessoaFiltro: PessoaFiltro): Observable<any> {
		let params  = this.getParametrosPesquisa(pessoaFiltro);

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
	

	salvar<T>(pessoa: Pessoa) {
	  return this.http.post<T>(this.baseUrl, pessoa);
	}

	alterar<T>(pessoa: Pessoa) {
		return this.http.put<T>(`${this.baseUrl}/person/${pessoa.id}`, pessoa);
	}


	private getParametrosPesquisa(pessoaFiltro: PessoaFiltro): HttpParams {
		let params = new HttpParams();
        params = params.set('page', pessoaFiltro.page);
		params = params.set('size', pessoaFiltro.size);

		if (pessoaFiltro.nome) 
            params = params.set('nome', pessoaFiltro.nome);
		
		return params;	
	}
}

