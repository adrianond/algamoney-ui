export class Lancamento {
    id!: number;
    descricao!: string;
    observacao?: string;
    dataRecebimentoPagamento!: string;
    dataVencimento!: string;
    tipo!: string;
    valor!: number;
    idCategoria!: number;
    idPessoa!: number;
}
