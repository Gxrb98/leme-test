// Tipo base para atributos em comum
export type EntidadeBase = {
  id: string;
  tipo: 'pessoa' | 'empresa';
  nome: string;
  telefones: string[];
  emails: string[];
  enderecos: string[];
};

// Pessoa Física
export type Pessoa = EntidadeBase & {
  tipo: 'pessoa';
  cpf: string;
  sexo: 'Masculino' | 'Feminino' | 'Outro';
  dataNascimento: string; 
  nomeMae: string;
};

// Pessoa Jurídica (Empresa)
export type Empresa = EntidadeBase & {
  tipo: 'empresa';
  cnpj: string;
  capitalSocial: string;
  dataInicio: string;
  situacaoCadastral: string;
  cnae: string;
  socios: string[];
};


export type Entidade = Pessoa | Empresa;

