import './style.css';

// ============================================
// 1. ESTRUTURA HTML
// ============================================

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <section id="center">
    <div>
      <h1>Meu Gerenciador de Tarefas</h1>
      <p>Organize suas atividades diárias</p>
    </div>

    <div class="form-tarefa">
      <input
        id="inputTarefa"
        type="text"
        placeholder="Digite uma tarefa..."
      />
      <button id="btnAdicionar">Adicionar tarefa</button>
    </div>

    <div>
      <div class="filtros">
        <button id="btnTodas">Todas</button>
        <button id="btnPendentes">Pendentes</button>
        <button id="btnConcluidas">Concluídas</button>
      </div>
      <p id="contadorPendentes"></p>
      <ul id="listaTarefas"></ul>
    </div>
  </section>
`;

// ============================================
// 2. ELEMENTOS DO DOM
// ============================================

const lista = document.querySelector<HTMLUListElement>('#listaTarefas');
const campo = document.querySelector<HTMLInputElement>('#inputTarefa');
const btnAdicionar = document.querySelector<HTMLButtonElement>('#btnAdicionar');

const btnTodas = document.querySelector<HTMLButtonElement>('#btnTodas');
const btnPendentes = document.querySelector<HTMLButtonElement>('#btnPendentes');
const btnConcluidas = document.querySelector<HTMLButtonElement>('#btnConcluidas');

const contadorPendentes =
  document.querySelector<HTMLParagraphElement>('#contadorPendentes');

// ============================================
// 3. TIPOS
// ============================================

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

type Filtro = 'todas' | 'pendentes' | 'concluidas';

// ============================================
// 4. PERSISTÊNCIA (localStorage)
// ============================================

const CHAVE_STORAGE = 'tarefas';

// Tarefas iniciais, usadas apenas na primeira visita.
const tarefasIniciais: Tarefa[] = [
  { id: 1, titulo: 'Estudar TypeScript', concluida: false },
  { id: 2, titulo: 'Criar API .NET', concluida: true },
  { id: 3, titulo: 'Estudar React', concluida: false }
];

// Lê as tarefas salvas. Se não houver nada (ou der erro), usa as iniciais.
function carregarTarefas(): Tarefa[] {
  const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);

  if (dadosSalvos === null) return tarefasIniciais;

  try {
    const tarefasConvertidas = JSON.parse(dadosSalvos);

    if (Array.isArray(tarefasConvertidas)) {
      return tarefasConvertidas;
    }

    console.warn('Os dados salvos não são um array.');
  } catch {
    console.error('Erro ao recuperar tarefas!');
  }

  return tarefasIniciais;
}

// Grava o array atual de tarefas no localStorage.
function salvarTarefas() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas));
}

// ============================================
// 5. ESTADO DA APLICAÇÃO
// ============================================

let tarefas: Tarefa[] = carregarTarefas();
let filtroAtual: Filtro = 'todas';

// ============================================
// 6. LÓGICA (sem mexer no DOM)
// ============================================

// Retorna só as tarefas que devem aparecer, conforme o filtro.
function obterTarefasFiltradas(): Tarefa[] {
  if (filtroAtual === 'pendentes') {
    return tarefas.filter((tarefa) => !tarefa.concluida);
  }

  if (filtroAtual === 'concluidas') {
    return tarefas.filter((tarefa) => tarefa.concluida);
  }

  return tarefas;
}

// Salva e redesenha a tela. Usada após qualquer alteração.
function atualizarTudo() {
  salvarTarefas();
  renderizarTarefas();
}

// ============================================
// 7. AÇÕES (alteram o estado)
// ============================================

function adicionarTarefa() {
  if (!campo) return;

  const texto = campo.value.trim();

  if (texto === '') {
    console.log('O campo está vazio!');
    return;
  }

  tarefas.push({
    id: Date.now(),
    titulo: texto,
    concluida: false
  });

  atualizarTudo();
  campo.value = '';
}

// Conclui ou reabre uma tarefa.
function alternarConclusao(tarefa: Tarefa) {
  tarefa.concluida = !tarefa.concluida;
  atualizarTudo();
}

function excluirTarefa(id: number) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  atualizarTudo();
}

function editarTarefa(tarefa: Tarefa) {
  const novoTitulo = prompt('Digite o novo título:', tarefa.titulo);

  // Usuário cancelou o prompt.
  if (novoTitulo === null) return;

  const tituloLimpo = novoTitulo.trim();

  if (tituloLimpo === '') {
    console.log('O campo está vazio!');
    return;
  }

  tarefa.titulo = tituloLimpo;
  atualizarTudo();
}

// ============================================
// 8. INTERFACE (atualizam o DOM)
// ============================================

// Destaca o botão do filtro ativo.
function atualizarBotoesFiltro() {
  btnTodas?.classList.toggle('ativo', filtroAtual === 'todas');
  btnPendentes?.classList.toggle('ativo', filtroAtual === 'pendentes');
  btnConcluidas?.classList.toggle('ativo', filtroAtual === 'concluidas');
}

// Mostra quantas tarefas ainda estão pendentes.
function atualizarContadorPendentes() {
  if (!contadorPendentes) return;

  const quantidade = tarefas.filter((tarefa) => !tarefa.concluida).length;
  const palavra = quantidade === 1 ? 'tarefa pendente' : 'tarefas pendentes';

  contadorPendentes.textContent = `Você tem ${quantidade} ${palavra}`;
}

// Cria o <li> de uma tarefa, com texto e botões.
function criarItemTarefa(tarefa: Tarefa): HTMLLIElement {
  const item = document.createElement('li');
  const textoTarefa = document.createElement('span');
  const btnEditar = document.createElement('button');
  const btnExcluir = document.createElement('button');
  const acoesTarefa = document.createElement('div');

  // Texto (riscado se estiver concluída).
  textoTarefa.textContent = tarefa.titulo;
  if (tarefa.concluida) {
    textoTarefa.classList.add('concluida');
  }

  // Botões agrupados numa div.
  btnEditar.textContent = 'Editar';
  btnExcluir.textContent = 'Excluir';
  acoesTarefa.classList.add('acoes-tarefa');
  acoesTarefa.appendChild(btnEditar);
  acoesTarefa.appendChild(btnExcluir);

  // Clicar no cartão conclui ou reabre a tarefa.
  item.addEventListener('click', () => alternarConclusao(tarefa));

  // stopPropagation evita disparar o clique do cartão.
  btnEditar.addEventListener('click', (event) => {
    event.stopPropagation();
    editarTarefa(tarefa);
  });

  btnExcluir.addEventListener('click', (event) => {
    event.stopPropagation();
    excluirTarefa(tarefa.id);
  });

  item.appendChild(textoTarefa);
  item.appendChild(acoesTarefa);

  return item;
}

// Redesenha a lista inteira.
function renderizarTarefas() {
  if (!lista) return;

  lista.innerHTML = '';
  atualizarContadorPendentes();

  const tarefasExibidas = obterTarefasFiltradas();

  // Lista vazia: mostra uma mensagem.
  if (tarefasExibidas.length === 0) {
    const mensagem = document.createElement('li');
    mensagem.textContent = 'Nenhuma tarefa encontrada!';
    mensagem.classList.add('mensagem-vazia');
    lista.appendChild(mensagem);
    return;
  }

  for (const tarefa of tarefasExibidas) {
    lista.appendChild(criarItemTarefa(tarefa));
  }
}

// Troca o filtro e atualiza a tela.
function definirFiltro(filtro: Filtro) {
  filtroAtual = filtro;
  atualizarBotoesFiltro();
  renderizarTarefas();
}

// ============================================
// 9. EVENTOS
// ============================================

btnAdicionar?.addEventListener('click', adicionarTarefa);

campo?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    adicionarTarefa();
  }
});

btnTodas?.addEventListener('click', () => definirFiltro('todas'));
btnPendentes?.addEventListener('click', () => definirFiltro('pendentes'));
btnConcluidas?.addEventListener('click', () => definirFiltro('concluidas'));

// ============================================
// 10. INICIALIZAÇÃO
// ============================================

renderizarTarefas();
atualizarBotoesFiltro();