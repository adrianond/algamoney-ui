import { Directive, ElementRef, HostListener, Inject, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[upperCaseNoCharacters]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UpperCaseNoCharactersDirective,
      multi: true,
    },
  ],
})
export class UpperCaseNoCharactersDirective {

  constructor(@Inject(Renderer2) private renderer: Renderer2, @Inject(ElementRef) private elementRef: ElementRef) { }

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

  writeValue(value: any) {
    if (value === undefined || value === null) {
      this.propagateChange(null);
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', '');
    } else {
      const valueChanged = this.upperCase(value);
      this.propagateChange(valueChanged);
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', valueChanged);
    }
  }
 
  propagateChange = (_: any) => {};
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
 
  public onTouched: any = () => {};
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event']) onInput($event: any) {
    $event.target.value = this.upperCase($event.target.value);
    this.propagateChange($event.target.value);
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

   @HostListener('blur') onBlur() {
    this.onTouched();
  } 
}

