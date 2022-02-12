import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMessageComponent } from './app-message/app-message.component';
import { InputColoridoDirective } from './directives/inpt-colorido.directive';
import { UpperCaseNoCharactersDirective } from './directives/uppercase-no-characteres.directive';




@NgModule({
  declarations: [
    AppMessageComponent,
    InputColoridoDirective,
    UpperCaseNoCharactersDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppMessageComponent,
    InputColoridoDirective,
    UpperCaseNoCharactersDirective
  ]
})
export class SharedModule { }
