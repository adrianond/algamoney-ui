import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class CategoriaService {
    baseUrl = 'http://localhost:8080/api/categories';

    constructor(protected http: HttpClient) 
    {}

    consultarCategorias<T>(): Observable<any> {
		return this.http.get<T>(`${this.baseUrl}`);
	}
}