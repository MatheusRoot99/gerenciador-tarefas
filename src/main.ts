
import './style.css';

// ============================================
// 1. ESTRUTURA HTML DA APLICAÇÃO
// ============================================

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <section id="center">
    <div>
      <h1>Meu Gerenciador de Tarefas</h1>
      <p>Organize suas atividades diárias</p>
    </div>

    <div>
      <input
        id="inputTarefa"
        type="text"
        placeholder="Digite uma tarefa..."
      />
      <button id="btnAdicionar">Adicionar tarefa</button>
    </div>

    <div>
      <button id="btnTodas">Todas</button>
      <button id="btnPendentes">Pendentes</button>
      <button id="btnConcluidas">Concluídas</button>

      <ul id="listaTarefas"></ul>
    </div>
  </section>
`;

// ============================================
// 2. CAPTURA DOS ELEMENTOS HTML (DOM)
// ============================================

// querySelector() procura elementos no HTML.
// O símbolo # indica uma busca pelo ID.
// O operador ?. evita acessar métodos de null.

const lista =
  document.querySelector<HTMLUListElement>('#listaTarefas');

const botao =
  document.querySelector<HTMLButtonElement>('#btnAdicionar');

const campo =
  document.querySelector<HTMLInputElement>('#inputTarefa');

const btnTodas =
  document.querySelector<HTMLButtonElement>('#btnTodas');

const btnPendentes =
  document.querySelector<HTMLButtonElement>('#btnPendentes');

const btnConcluidas =
  document.querySelector<HTMLButtonElement>('#btnConcluidas');

// ============================================
// 3. TIPOS E ESTADO DA APLICAÇÃO
// ============================================

// Interface: define a estrutura de uma tarefa.
interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

// Fonte única de dados da aplicação.
// Usamos let porque podemos substituir este array
// pelo resultado de filter() ou JSON.parse().

let tarefas: Tarefa[] = [
  { id: 1, titulo: 'Estudar TypeScript', concluida: false },
  { id: 2, titulo: 'Criar API .NET', concluida: true },
  { id: 3, titulo: 'Estudar React', concluida: false }
];

// Union Type: limita os valores permitidos.
// O filtro começa mostrando todas as tarefas.

let filtroAtual: 'todas' | 'pendentes' | 'concluidas' = 'todas';

// ============================================
// 4. RECUPERAR TAREFAS DO LOCALSTORAGE
// ============================================

// getItem() retorna uma string ou null.
// Precisamos recuperar os dados ANTES de renderizar.

const dadosSalvos = localStorage.getItem('tarefas');

if (dadosSalvos !== null) {
  try {

    // JSON.parse() transforma texto JSON em dados JS.
    const tarefasConvertidas = JSON.parse(dadosSalvos);

    // Verifica se o conteúdo recuperado é um array.
    // Futuramente validaremos cada objeto também.
    if (Array.isArray(tarefasConvertidas)) {

      // Substitui os dados iniciais pelos dados salvos.
      tarefas = tarefasConvertidas;

    } else {
      console.warn('Os dados salvos não são um array.');
    }

  } catch {

    // JSON inválido pode lançar uma exceção.
    // Neste caso, mantemos as tarefas iniciais.
    console.error('Erro ao recuperar tarefas!');

  }
}

// ============================================
// 5. FUNÇÃO PARA SALVAR TAREFAS
// ============================================

// Persistência: guardar os dados no navegador.
// stringify() converte o array em texto JSON.
// setItem() armazena o texto usando uma chave.

function salvarTarefas() {
  const tarefasJSON = JSON.stringify(tarefas);

  localStorage.setItem('tarefas', tarefasJSON);
}

// ============================================
// 6. FUNÇÃO PARA RENDERIZAR AS TAREFAS
// ============================================

// Renderizar = transformar os dados em HTML.
// O array tarefas continua sendo a fonte dos dados.

function renderizarTarefas() {

  // Early return: encerra se a lista não existir.
  if (!lista) return;

  // Limpa o HTML antigo para evitar duplicações.
  lista.innerHTML = '';

  // Começamos com todas as tarefas.
  let tarefasExibidas = tarefas;

  // ========================================
  // 6.1. APLICAR FILTROS
  // ========================================

  // filter() cria um novo array.
  // Não modifica o array original.

  if (filtroAtual === 'pendentes') {

    tarefasExibidas = tarefas.filter((tarefa) => {
      return tarefa.concluida === false;
    });

  } else if (filtroAtual === 'concluidas') {

    tarefasExibidas = tarefas.filter((tarefa) => {
      return tarefa.concluida === true;
    });

  }

  // ========================================
  // 6.2. CRIAR OS ELEMENTOS HTML
  // ========================================

  // for...of percorre as tarefas que serão exibidas.
  for (const tarefa of tarefasExibidas) {

    // Cria um item da lista.
    const item = document.createElement('li');

    // Cria um span para guardar somente o título.
    // Assim o botão Excluir não ficará riscado.
    const textoTarefa = document.createElement('span');

    textoTarefa.textContent = tarefa.titulo;

    // Aplica a classe CSS se a tarefa está concluída.
    if (tarefa.concluida) {
      textoTarefa.classList.add('concluida');
    }

    // Insere o texto dentro do li.
    item.appendChild(textoTarefa);

    // ========================================
    // 6.3. CONCLUIR OU REABRIR TAREFA
    // ========================================

    item.addEventListener('click', () => {

      // O operador ! inverte um booleano.
      // true vira false e false vira true.
      tarefa.concluida = !tarefa.concluida;

      // Primeiro atualizamos os dados.
      // Depois salvamos e renderizamos.
      salvarTarefas();
      renderizarTarefas();

    });

    // ========================================
    // 6.4. CRIAR BOTÃO EXCLUIR
    // ========================================

    const btnExcluir = document.createElement('button');

    btnExcluir.textContent = 'Excluir';

    // appendChild() adiciona o elemento filho.
    // Pai: item (li)
    // Filho: btnExcluir (button)
    item.appendChild(btnExcluir);

    // ========================================
    // 6.5. EXCLUIR TAREFA DO ARRAY
    // ========================================

    btnExcluir.addEventListener('click', (event) => {

      // Impede que o clique chegue ao li.
      event.stopPropagation();

      // Mantém todas as tarefas, menos a clicada.
      // Comparamos pelo identificador único.
      tarefas = tarefas.filter((tarefaDoArray) => {
        return tarefaDoArray.id !== tarefa.id;
      });

      // Persiste a exclusão.
      salvarTarefas();

      // Atualiza a lista visual.
      renderizarTarefas();

    });

    // Insere o li completo dentro da ul.
    lista.appendChild(item);
  }
}

// ============================================
// 7. EVENTO: ADICIONAR TAREFA
// ============================================

botao?.addEventListener('click', () => {

  // Verifica se o input existe.
  if (!campo) return;

  // trim() remove espaços no começo e no final.
  const texto = campo.value.trim();

  // Early return: impede cadastrar texto vazio.
  if (texto === '') {
    console.log('O campo está vazio!');
    return;
  }

  // push() adiciona um objeto ao array.
  // Date.now() fornece um ID numérico provisório.
  tarefas.push({
    id: Date.now(),
    titulo: texto,
    concluida: false
  });

  // Salva o array atualizado.
  salvarTarefas();

  // Atualiza a interface.
  renderizarTarefas();

  // Limpa o input.
  campo.value = '';
});

// ============================================
// 8. EVENTOS DOS BOTÕES DE FILTRO
// ============================================

// Cada botão altera o estado do filtro.
// Depois renderizamos novamente a lista.

btnTodas?.addEventListener('click', () => {
  filtroAtual = 'todas';

  renderizarTarefas();
});

btnPendentes?.addEventListener('click', () => {
  filtroAtual = 'pendentes';

  renderizarTarefas();
});

btnConcluidas?.addEventListener('click', () => {
  filtroAtual = 'concluidas';

  renderizarTarefas();
});

// ============================================
// 9. RENDERIZAÇÃO INICIAL
// ============================================

// O código anterior já recuperou os dados salvos.
// Agora podemos construir a lista no navegador.

renderizarTarefas();
