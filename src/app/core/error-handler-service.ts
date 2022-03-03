import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ErrorHanderService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    console.log(errorResponse)
    let statusCode = errorResponse.error?.status;
    switch (statusCode) {
      case 400:
        this.messageService.add({ severity: 'error', detail: 'Sem autorização' })
        break;
      case 401:
        this.messageService.add({ severity: 'error', detail: 'Sem autorização' })
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