import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class CategoriaService {
    baseUrl :string;

    constructor(protected http: HttpClient) {
        this.baseUrl = `${environment.apiUrl}/api/categories`;
    }

    consultarCategorias<T>(): Observable<any> {
		return this.http.get<T>(`${this.baseUrl}`);
	}
}