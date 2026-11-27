# Gerenciador de Tarefas

Aplicação web para organizar atividades do dia a dia. Permite cadastrar, editar, concluir e excluir tarefas, além de filtrá-las por status. Desenvolvida com **TypeScript, HTML, CSS e Vite** durante meus estudos de desenvolvimento Full Stack.

## Demonstração

**[Acessar o Gerenciador de Tarefas](https://gerenciador-tarefas-phi-lac.vercel.app/)**

Aplicação publicada na Vercel.

## Sobre o projeto

O Gerenciador de Tarefas é uma aplicação de lista de tarefas que permite acompanhar atividades pendentes e concluídas. Na primeira visita, a lista apresenta algumas tarefas de exemplo para facilitar os testes.

As tarefas são armazenadas no **`localStorage`** do navegador em formato JSON. Assim, alterações feitas na lista permanecem após recarregar a página, desde que os dados do navegador não sejam apagados.

O projeto foi criado para praticar lógica de programação, TypeScript, manipulação do DOM, eventos, validações, responsividade, acessibilidade, Git e GitHub.

## Funcionalidades

- Adicionar tarefas pelo botão ou pressionando **Enter**.
- Editar o título de uma tarefa existente.
- Marcar e desmarcar tarefas como concluídas por meio de **checkboxes**.
- Excluir tarefas.
- Filtrar por **Todas**, **Pendentes** e **Concluídas**.
- Exibir o contador de tarefas pendentes.
- Exibir uma mensagem quando o filtro não tiver tarefas.
- Impedir o cadastro de tarefas vazias ou contendo apenas espaços.
- Preservar as tarefas após atualizar a página usando `localStorage`.
- Adaptar a interface para computadores e celulares.
- Associar rótulos aos campos e checkboxes, permitindo interação por teclado.

## Tecnologias utilizadas

- **TypeScript:** lógica, tipagem e manipulação do DOM.
- **HTML:** estrutura e elementos semânticos da interface.
- **CSS:** aparência, Flexbox e responsividade.
- **Vite:** ambiente de desenvolvimento e build.
- **localStorage:** persistência local dos dados.
- **JSON:** serialização e recuperação das tarefas.
- **Git e GitHub:** versionamento e hospedagem do código.
- **Vercel:** publicação da aplicação.

## Como executar o projeto localmente

**Pré-requisito:** ter o [Node.js](https://nodejs.org/) instalado.

## 🌐 Demonstração

Acesse o Gerenciador de Tarefas online:

[Ver aplicação]([LINK_DA_VERCEL](https://gerenciador-tarefas-phi-lac.vercel.app/))

```bash
# Clone o repositório
git clone https://github.com/MatheusRoot99/gerenciador-tarefas.git

# Entre na pasta do projeto
cd gerenciador-tarefas

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra no navegador o endereço informado pelo terminal (geralmente `http://localhost:5173`).

Para gerar a versão de produção, execute:

```bash
npm run build
```

Os arquivos gerados ficarão na pasta `dist`.

## Como usar

1. Digite uma atividade no campo **Nova tarefa** e clique em **Adicionar tarefa** ou pressione **Enter**.
2. Marque o checkbox para concluir uma tarefa; desmarque para reabri-la.
3. Use os botões de filtro para visualizar as tarefas por status.
4. Clique em **Editar** para alterar o título ou em **Excluir** para remover a tarefa.
5. Atualize a página para conferir que os dados foram mantidos no navegador.

## Aprendizados

- Organização de funções e tipos em TypeScript.
- Manipulação de elementos e eventos do DOM.
- Métodos de arrays, como `filter()`, e atualização da interface a partir do estado.
- Persistência com `localStorage`, `JSON.stringify()` e `JSON.parse()`.
- Validação de entradas e apresentação de mensagens ao usuário.
- Flexbox, media queries e melhorias de acessibilidade.
- Fluxo de trabalho com Git, GitHub e deploy.

## Limitações atuais

- Os dados ficam armazenados **somente no navegador e dispositivo utilizados**; não existe sincronização entre dispositivos nem banco de dados remoto.
- A edição do título utiliza a janela `prompt()` do navegador.
- Ainda não há autenticação ou contas de usuário.

## Próximos passos

- Adicionar datas de vencimento e ordenação de tarefas.
- Melhorar a experiência de edição diretamente na interface.
- Ampliar as validações e o tratamento de erros.
- Criar testes automatizados.

## Autor

Desenvolvido por **Matheus** como parte dos estudos em desenvolvimento Full Stack.

[Repositório no GitHub](https://github.com/MatheusRoot99/gerenciador-tarefas)
