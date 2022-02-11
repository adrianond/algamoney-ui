import { Pessoa } from "src/app/pessoa/model/model";
import { Categoria } from "./categoria";

export class Lancamento {
    id!: number;
    descricao!: string;
    observacao!: string;
    dataPagamento!: string;
    dataVencimento!: string;
    tipoLancamento!: string;
    valor!: number;
}


export class LancamentoCadastro {
    descricao!: string;
    observacao!: string;
    dataRecebimentoPagamento!: string;
    dataVencimento!: string;
    tipo!: string;
    valor!: number;
    idCategoria!: number;
    idPessoa!: number;
}

export class LancamentoPesquisa {
    id!: number;
    descricao!: string;
    observacao!: string;
    dataPagamento!: string;
    dataVencimento!: string;
    tipoLancamento!: string;
    valor!: number;
    categoria!: Categoria;
    pessoa!: Pessoa;
}