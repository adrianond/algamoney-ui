import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

     /*  
       Utilizamos o método "pipe" do Observable que irá nos ajudar a encadear outras operações neste mesmo Observable.
       Dentro do método "pipe", usamos um outro operador chamadao "mergeMap", ele fará a "junção" 
       dos dois Observable, o primeiro é o método "obterNovoAccessToken" 
       e o segundo será o nosso retorno, que vem de "handle.next(req)"  
    */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
        if (!req.url.includes('/oauth/token')) {
            if (this.auth.isAccessTokenInvalido()) {
                return this.auth.gerarNovoAccessToken()  
                 .pipe(map((res) => {
                        localStorage.setItem('token', res.access_token);
                    }),
                        mergeMap(() => {
                            req = this.addTokenHeader(req)
                            return next.handle(req);
                        })
                    );
            } else {
                req = this.addTokenHeader(req)
            }
        }
        return next.handle(req);
    }


    private addTokenHeader(request: HttpRequest<any>) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return request;
    }
}