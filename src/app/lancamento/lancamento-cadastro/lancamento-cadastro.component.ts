import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.scss']
})
export class LancamentoCadastroComponent implements OnInit {

  categoriaSelecionada!: Categoria; 
  categorias!: Categoria[];
  
    tipos = [
      { label: 'Receita', value: 'RECEITA' },
      { label: 'Despesa', value: 'DESPESA' },
    ];
  
    categories = [
      { label: 'Alimentação', value: 1 },
      { label: 'Transporte', value: 2 },
    ];
  
    pessoas = [
      { label: 'João da Silva', value: 4 },
      { label: 'Sebastião Souza', value: 9 },
      { label: 'Maria Abadia da Silva Santos Cruz', value: 3 },
    ];
  
  constructor() {
        this.categorias = [ 
        {descricao: 'Estudo', codigo: 1, },
        {descricao: 'Cartao', codigo: 2, },
   ]   
  }
  
    ngOnInit(): void {
      this.categoriaSelecionada = this.categorias[0];
    }
  
    onSubmit(lancamentoCadastroForm : any) {
      console.log(' valide ', lancamentoCadastroForm.valid)
    }

}
