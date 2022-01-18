import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.scss']
})
export class LancamentosGridComponent implements OnInit {
  @Input() lancamentos: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
