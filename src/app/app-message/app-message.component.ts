import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
   <div *ngIf="temErro()" 
     class="p-message p-message-error">
     {{ text }}
   </div>
  `,
  styles: [`
  .p-message-error {
    margin: 0;
    margin-top: 4px;
    padding: 3px;
  }
`]
})
export class AppMessageComponent implements OnInit {

  @Input() control: any;
  @Input() error: string ='';
  @Input() text: string ='';

  constructor() { }

  ngOnInit(): void {
  }

  temErro(): boolean {
   /*  console.log(this.error)
    console.log(this.control)
    console.log(this.control.hasError(this.error) && this.control.touched) */
   return this.control.hasError(this.error) && this.control.touched;
  }

}
