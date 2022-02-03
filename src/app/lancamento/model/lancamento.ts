import { Categoria } from "./categoria";
import { Pessoa } from "../../pessoa/model/pessoa";

export class Lancamento {
    id!: number;
    descricao!: string;
    observacao!: string;
    dataPagamento!: string;
    dataVencimento!: string;
    tipoLancamento!: string;
    valor!: number
    categoria!: Categoria;
    pessoa!: Pessoa;
}