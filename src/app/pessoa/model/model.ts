export class Endereco {
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cep?: string;
    cidade?: string;
    estado?: string;
  }
  
  export class Pessoa {
    id!: number;
    nome?: string;
    endereco = Endereco;
    ativo = true;
  }
  
  
  export class Telefone {
	telefoneId = TelefoneId;
	numero?: string;
	ramal?: string;
}

export class TelefoneId {
	pessoa?: number;
	sequencia?: number;
}
  
 