import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LancamentoEstatisticaPorCategoriaResponse } from './model/response/lancamentoEstatisticaPorCategoriaResponse';
import { Observable } from 'rxjs';
import { LancamentoEstatisticaPorDataResponse } from './model/response/lancamentoEstatisticaPorDataResponse';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl : string;

  constructor(protected http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/api/entries`;
   }

  
   public getLancamentosPorCategoria<T>(): Observable<LancamentoEstatisticaPorCategoriaResponse> {
		return this.http.get<LancamentoEstatisticaPorCategoriaResponse>(`${this.baseUrl}/estatistica/por-categoria`);
	}

  public getLancamentosPorData<T>(): Observable<LancamentoEstatisticaPorDataResponse> {
		return this.http.get<LancamentoEstatisticaPorDataResponse>(`${this.baseUrl}/estatistica/por-dia`);
	}
}
