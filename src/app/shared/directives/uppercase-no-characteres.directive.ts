import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[upperCaseNoCharacters]',
})
export class UpperCaseNoCharactersDirective {

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2) { }

  protected upperCase(val: any): string {
    const valueChanged = this.upper(val);
    return valueChanged 
      .replace(new RegExp(/[ÁÂÀÄÃ]/, 'g'), 'A')
      .replace(new RegExp(/[ÉÊÈË]/, 'g'), 'E')
      .replace(new RegExp(/[ÍÎÌÏ]/, 'g'), 'I')
      .replace(new RegExp(/[ÓÔÒÖÕ]/, 'g'), 'O')
      .replace(new RegExp(/[ÚÛÙÜ]/, 'g'), 'U')
      .replace(new RegExp(/[Ç]/, 'g'), 'C')
      .replace(new RegExp(/[Ñ]/, 'g'), 'N')
      .replace(new RegExp(/[^A-Z0-9 ]/, 'g'), '');
  }

  public onTouched: any = () => { };
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

   @HostListener('input', ['$event']) onInput($event: any) {
    const value = this.upperCase($event.target.value);
    if (value === undefined || value === null) {
      this.propagateChange(null);
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', '');
    } else {
      this.propagateChange(value);
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
    }
  } 


  protected upper(val: any): string {
    if (isNaN(val)) {
      return val
        .toUpperCase()
        .trimLeft()
        .replace('  ', ' ');
    }
    return val || '';
  }

  propagateChange = (_: any) => { };
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

   @HostListener('blur') onBlur() {
    this.onTouched();
  } 
}

