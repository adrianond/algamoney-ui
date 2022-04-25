import { Router } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ErrorHanderService {

  constructor(private messageService: MessageService, private router: Router) { }

  handle(errorResponse: any) {
    let statusCode = errorResponse?.error?.httpStatusCode ? errorResponse.error.httpStatusCode : errorResponse?.status;

    switch (statusCode) {
      case 400:
        this.messageService.add({ severity: 'error', detail: 'Ocorreu um erro ao processar a solicitação.' })
        break;
      case 401:
        if (errorResponse?.error?.error_description && errorResponse?.error?.error_description.includes('Invalid refresh token')) {
          this.messageService.add({ severity: 'error', detail: 'Sessão expirada' })
          this.router.navigateByUrl('/')
          return;
        }
        this.messageService.add({ severity: 'error', detail: 'Usuário não autenticado' })
        break;
      case 403:
        this.messageService.add({ severity: 'error', detail: 'Sem autorização' })
        break;
      case 404:
        this.messageService.add({ severity: 'error', detail: 'Página não encontrada' })
        break;
      case 406:
        break;
      case 500:
        if (errorResponse.error.message === 'Usuário não autenticado') {
          this.messageService.add({ severity: 'error', detail: 'Usuário não autenticado.' })
        } else {
          this.messageService.add({ severity: 'error', detail: 'Falha na comunicação, verifique sua conexão.' })
        }
        break;
      case 502:
        this.messageService.add({ severity: 'error', detail: 'Falha na comunicação, verifique sua conexão.' })
        break;
      case 503:
        this.messageService.add({ severity: 'error', detail: 'Falha na comunicação, verifique sua conexão.' })
        break;
      default:
        this.messageService.add({ severity: 'error', detail: 'Falha na comunicação, verifique sua conexão.' })
        break;
    }
  }


}