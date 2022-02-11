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
    codigo?: number;
    nome?: string;
    endereco = new Endereco();
    ativo = true;
  }
  
  
  export class Telefone {
	telefoneId = new  TelefoneId();
	numero?: string;
	ramal?: string;
}

export class TelefoneId {
	pessoa?: number;
	sequencia?: number;
}
  
 