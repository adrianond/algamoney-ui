import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appInputColorido]',
  exportAs: 'inputColorido',
})
export class InputColoridoDirective {
  
  @Input() cor = 'gray';

  
  @HostBinding('style.backgroundColor') corDeFundo!: string;

  
  @HostListener('focus') colorir() {
   this.corDeFundo = this.cor;
  }

  @HostListener('blur') descolorir() {
    this.corDeFundo = 'transparent';
  }

}
