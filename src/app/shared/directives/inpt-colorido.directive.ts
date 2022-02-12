import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appInputColorido]'
})
export class InputColoridoDirective {

  @HostBinding('style.backgroundColor') corDeFundo!: string;

  
  @HostListener('focus') aoGanharFoco() {
   this.corDeFundo = 'yellow';
  }

  @HostListener('blur') aoPerderFoco() {
    this.corDeFundo = 'transparent';
  }

}
