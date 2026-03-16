import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardService } from './dashboard.service';
import { LancamentoPorCategoria } from './model/lancamentoPorCategoria';
import { Categoria } from './model/categoria';
import { lancamentoEstatisticaPorDiaDTO } from './model/lancamentoEstatisticaPorDiaDTO';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public chartBar: any;
  public chartLine: any;
  lancamentosPorCategoria!: LancamentoPorCategoria[]
  lancamentosPorDiaDTO!: lancamentoEstatisticaPorDiaDTO[]
  errorHanderService: any;
  nome!: string;
  labels: Array<string> = [];
  total: Array<number> = [];

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.createChartBar();
    this.createChartLine();
  }


  consultarLancamentosPorData(): void {
		console.log('pesquisar')
		this.service.getLancamentosPorData().subscribe(
			(response) => {
        console.log('response data', response)
				//this.lancamentos = response.lancamentos;
			},
			(err) => {
				this.errorHanderService.handle(err);
			}
		);
	}


  createChartBar() {
    this.service.getLancamentosPorCategoria().subscribe(
			(response) => {
        this.lancamentosPorCategoria = response.lancamentosDTO
        this.lancamentosPorCategoria.forEach(categoria => {
          this.labels.push(categoria.categoriaDTO.nome)
          this.total.push(categoria.total)
        })

        this.chartBar = new Chart("chartBar", {
          type: 'bar', 
          data: {
            labels: this.labels, 
             datasets: [
              {
                label: "Categorias",
                data: this.total,
                backgroundColor: 'blue'
              }
            ]
          },
          options: {
            aspectRatio:2.5
          }
        })   
			},
			(err) => {
				this.errorHanderService.handle(err);
			}
		);   
  }


  createChartLine(){
    this.service.getLancamentosPorData().subscribe(
			(response) => {
        console.log('response data', response)
        this.lancamentosPorDiaDTO = response.lancamentosPorDiaDTO;
				console.log('response data2', this.lancamentosPorDiaDTO)
			},
			(err) => {
				this.errorHanderService.handle(err);
			}
		);
  
    this.chartLine = new Chart("chartLine", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'], 
	       datasets: [
          {
            label: "Receitas",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Despesas",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

}
