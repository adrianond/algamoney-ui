import { Telefone } from './telefone';
import { Endereco } from "./endereco";

export class Pessoa {
    id!: number;
    nome!: string;
    ativo!: boolean;
    dataCadastro!: string;
    dataAtualizacao!: string;
    endereco!: Endereco
    telefones!: Telefone[];
}