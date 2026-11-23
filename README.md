# Gerenciador de Tarefas

Aplicação web simples e direta para organizar o dia a dia: você cadastra tarefas, marca o que já foi feito e filtra o que ainda falta.

## Sobre o projeto

O Gerenciador de Tarefas é uma aplicação web que permite criar, concluir e excluir tarefas, além de filtrá-las por status (todas, pendentes ou concluídas). A lista já começa com algumas tarefas de exemplo, carregadas a partir de um array, para facilitar o teste da aplicação.

As tarefas são armazenadas no navegador por meio do `localStorage`, com os dados convertidos para o formato JSON. Por isso, ao recarregar a página, tudo continua exatamente como foi deixado.

Criei este projeto durante meus estudos de desenvolvimento fullstack para praticar lógica de programação, manipulação do DOM, tipagem com TypeScript e persistência de dados no navegador.

## Funcionalidades

- Adicionar novas tarefas
- Marcar tarefas como concluídas
- Excluir tarefas
- Filtrar por todas, pendentes ou concluídas
- Manter os dados salvos após recarregar a página

## Tecnologias utilizadas

- **TypeScript**: lógica da aplicação
- **HTML**: estrutura da interface
- **CSS**: estilização
- **Vite**: ambiente de desenvolvimento e build
- **localStorage**: persistência dos dados no navegador
- **JSON**: formato usado para serializar as tarefas

## Como executar o projeto

Pré-requisito: ter o [Node.js](https://nodejs.org/) instalado.

```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/gerenciador-tarefas.git

# Entre na pasta do projeto
cd gerenciador-tarefas

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Depois, abra no navegador o endereço exibido no terminal (normalmente `http://localhost:5173`).

## Aprendizados

- Organização de código em TypeScript
- Manipulação de elementos da página com JavaScript
- Uso de `localStorage` e conversão de dados com JSON
- Fluxo de trabalho com Git e GitHub
- Escrita de documentação para outras pessoas entenderem o projeto

## Próximos passos

- Editar o texto de uma tarefa existente
- Melhorar o layout para celulares
- Adicionar data limite às tarefas

## Autor

Desenvolvido por **Matheus**.