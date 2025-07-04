-- Resumo da Solução --

Decidí fazer tudo em uma única tela porque achei mais simples e direto pro usuário. A busca e os resultados aparecem no mesmo lugar, então a pessoa não precisa ficar mudando de tela pra ver o que encontrou.

Usei as tecnologias principais do desafio:

React com hooks e componentes bem separados,

TypeScript com tipagem clara e segura,

Styled Components pra estilizar tudo de forma organizada,

React Hook Form com Zod pra validar os campos dinamicamente (incluindo máscaras que mudam conforme o tipo de busca),

PrimeReact, usando o InputMask e InputText como pedido.

Também criei um mock de dados com CPFs, CNPJs e e-mails que retornam resultados parciais (como foi pedido no enunciado), e salvei o histórico de buscas no localStorage, limitado aos últimos 10.

  Obs: Só ficou um detalhe que não consegui resolver 100%. O campo de "dado buscado" às vezes não atualiza direito quando o tipo de busca muda muito rápido. A busca funciona normalmente, mas o valor exibido pode ficar atrasado

Componentes principais

FormBlock: Contém o seletor de tipo de busca (CPF, CNPJ, etc), campo dinâmico com máscara e validação, e botão de pesquisa.

Resultados: Renderiza a tabela de resultados com filtro de tipo (Pessoa/Empresa), botão para ver detalhes e controle do histórico local.

Modal de Detalhes: Abre ao clicar em "Ver detalhes" e exibe os dados completos da entidade.

Como rodar o projeto localmente

# Clone o repositório
git clone <repo-url>
cd nome-do-projeto

# Instale as dependências
npm install

# Rode em ambiente de desenvolvimento
npm run dev

O projeto roda por padrão em http://localhost:5173

 Dados disponíveis para teste de busca

-- BUSCAS PARCIAIS --
CPF: retorna resultados que contenham ao menos 3 dígitos consecutivos do CPF buscado, para encontrar CPFs semelhantes.

E-mail: retorna resultados com correspondência parcial no nome de usuário ou domínio do e-mail.

Para os demais campos (CNPJ, telefone, endereço, nome), a busca é exata ou baseada em texto contido.

Dados disponíveis para teste
Pessoas:

Juliana Silva — CPF: 555.456.789-01

Gabriel Rodrigues — CPF: 444.555.456-77

Lucas Almeida — CPF: 123.555.456-00

Julia Souza — CPF: 888.145.255-25

Lucas Pereira — CPF: 987.654.321-99

Empresas:

Tech Soluções Digitais LTDA — CNPJ: 12.345.678/0001-99

Comércio Oliveira ME — CNPJ: 98.765.432/0001-10

Inova Sistemas LTDA — CNPJ: 33.222.111/0001-55

Construtora Alfa S/A — CNPJ: 44.111.222/0001-88

Mundo Verde Comércio Ltda — CNPJ: 55.333.222/0001-77

Outros dados pesquisáveis:

Telefones: (11) 98765-4321, (41) 99876-5432, (21) 99888-1122, etc.

E-mails: juliana@gmail.com, gabriel.rodrigues@email.com, lucas.almeida@gmail.com, etc.

Endereços: Rua das Acácias, 123 - São Paulo/SP; Rua dos Pinheiros, 456 - Curitiba/PR; Av. Paulista, 1000 - São Paulo/SP, etc.

Nomes: pode buscar por nomes completos ou parciais."# leme-test" 
