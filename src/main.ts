
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

const lista =
  document.querySelector<HTMLUListElement>('#listaTarefas');

const btnAdicionar =
  document.querySelector<HTMLButtonElement>('#btnAdicionar');

const campo =
  document.querySelector<HTMLInputElement>('#inputTarefa');

const btnTodas =
  document.querySelector<HTMLButtonElement>('#btnTodas');

const btnPendentes =
  document.querySelector<HTMLButtonElement>('#btnPendentes');

const btnConcluidas =
  document.querySelector<HTMLButtonElement>('#btnConcluidas');

const contadorPendentes =
  document.querySelector<HTMLParagraphElement>('#contadorPendentes');

// ============================================
// 3. TIPOS E ESTADO
// ============================================

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

type Filtro = 'todas' | 'pendentes' | 'concluidas';

let tarefas: Tarefa[] = [
  { id: 1, titulo: 'Estudar TypeScript', concluida: false },
  { id: 2, titulo: 'Criar API .NET', concluida: true },
  { id: 3, titulo: 'Estudar React', concluida: false }
];

let filtroAtual: Filtro = 'todas';

// ============================================
// 4. RECUPERAR DADOS SALVOS
// ============================================

const dadosSalvos = localStorage.getItem('tarefas');

if (dadosSalvos !== null) {
  try {
    const tarefasConvertidas = JSON.parse(dadosSalvos);

    if (Array.isArray(tarefasConvertidas)) {
      tarefas = tarefasConvertidas;
    } else {
      console.warn('Os dados salvos não são um array.');
    }
  } catch {
    console.error('Erro ao recuperar tarefas!');
  }
}

// ============================================
// 5. SALVAR TAREFAS
// ============================================

function salvarTarefas() {
  const tarefasJSON = JSON.stringify(tarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

// ============================================
// 6. ATUALIZAR APARÊNCIA DOS FILTROS
// ============================================

function atualizarBotoesFiltro() {
  btnTodas?.classList.toggle(
    'ativo',
    filtroAtual === 'todas'
  );

  btnPendentes?.classList.toggle(
    'ativo',
    filtroAtual === 'pendentes'
  );

  btnConcluidas?.classList.toggle(
    'ativo',
    filtroAtual === 'concluidas'
  );
}

// ============================================
// nova função
// ============================================

function atualizarContadorPendentes() {

  // 1. Use tarefas.filter() para selecionar
  // apenas as tarefas não concluídas.
  const filtarTarefasPendentes = tarefas.filter((x) => x.concluida === false);

  // 2. Use .length para descobrir a quantidade.
  const quantidade = filtarTarefasPendentes.length;

  // 3. Mostre a quantidade no console.
  if (contadorPendentes) {
    const mensagem = `Você tem ${quantidade} tarefas pendentes`
    contadorPendentes.textContent = mensagem;
  };
}



// ============================================
// 7. RENDERIZAR TAREFAS
// ============================================

function renderizarTarefas() {
  if (!lista) return;

  // Limpa a lista antes de reconstruí-la.
  lista.innerHTML = '';
  atualizarContadorPendentes();
  let tarefasExibidas = tarefas;

  // Aplica o filtro selecionado.
  if (filtroAtual === 'pendentes') {
    tarefasExibidas = tarefas.filter((tarefa) => {
      return tarefa.concluida === false;
    });
  } else if (filtroAtual === 'concluidas') {
    tarefasExibidas = tarefas.filter((tarefa) => {
      return tarefa.concluida === true;
    });
  }

  if (tarefasExibidas.length === 0) {
    const mensagem = document.createElement('li');
    mensagem.textContent = 'Nenhuma tarefa encontrada!';
    mensagem.classList.add('mensagem-vazia');
    lista.appendChild(mensagem);
  };

  // Cria os elementos de cada tarefa.
  for (const tarefa of tarefasExibidas) {
    const item = document.createElement('li');
    const textoTarefa = document.createElement('span');
    const btnExcluir = document.createElement('button');

    textoTarefa.textContent = tarefa.titulo;

    if (tarefa.concluida) {
      textoTarefa.classList.add('concluida');
    }

    // Clicar no cartão conclui ou reabre a tarefa.
    item.addEventListener('click', () => {
      tarefa.concluida = !tarefa.concluida;

      salvarTarefas();
      renderizarTarefas();
    });

    // Configura o botão de exclusão.
    btnExcluir.textContent = 'Excluir';

    btnExcluir.addEventListener('click', (event) => {
      // Evita disparar o clique do cartão.
      event.stopPropagation();

      tarefas = tarefas.filter((tarefaDoArray) => {
        return tarefaDoArray.id !== tarefa.id;
      });

      salvarTarefas();
      renderizarTarefas();
    });

    // Monta o cartão.
    item.appendChild(textoTarefa);
    item.appendChild(btnExcluir);

    // Adiciona o cartão à lista.
    lista.appendChild(item);
  }
}

// ============================================
// 8. EVENTO: ADICIONAR TAREFA
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

  salvarTarefas();
  renderizarTarefas();

  campo.value = '';
};

btnAdicionar?.addEventListener('click', () => {
  adicionarTarefa();
});

campo?.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});
// ============================================
// 9. EVENTOS DOS FILTROS
// ============================================

btnTodas?.addEventListener('click', () => {
  filtroAtual = 'todas';

  atualizarBotoesFiltro();
  renderizarTarefas();
});

btnPendentes?.addEventListener('click', () => {
  filtroAtual = 'pendentes';

  atualizarBotoesFiltro();
  renderizarTarefas();
});

btnConcluidas?.addEventListener('click', () => {
  filtroAtual = 'concluidas';

  atualizarBotoesFiltro();
  renderizarTarefas();
});

// ============================================
// 10. INICIALIZAÇÃO
// ============================================

renderizarTarefas();
atualizarBotoesFiltro();
