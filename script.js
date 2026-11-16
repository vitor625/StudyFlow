// ==========================================
// STUDYFLOW — PLATAFORMA INTELIGENTE DE ESTUDOS
// SCRIPT PRINCIPAL — SISTEMA INTEGRADO
// ==========================================

// ==========================================
// PROTEÇÃO DE ACESSO / LOGIN
// ==========================================
const usuarioLogado = localStorage.getItem("studyflow_logado");
if (usuarioLogado !== "true") {
    window.location.href = "login.html";
}

// Carregar nome do usuário logado
function carregarNomeUsuario() {
    const dadosUsuario = localStorage.getItem("studyflow_usuario_logado");
    if (!dadosUsuario) return;

    try {
        const usuario = JSON.parse(dadosUsuario);
        const elementoNome = document.getElementById("nome-usuario");
        const nomeDashboard = document.getElementById("nome-dashboard");

        if (elementoNome && usuario.nome) {
            elementoNome.textContent = usuario.nome;
        }
        if (nomeDashboard && usuario.nome) {
            nomeDashboard.textContent = usuario.nome;
        }
    } catch (e) {
        console.error("Erro ao carregar dados do usuário:", e);
    }
}

// ==========================================
// DADOS & LOCAL STORAGE (PRESERVAÇÃO COMPLETA)
// ==========================================
let materias = JSON.parse(localStorage.getItem("studyflow_materias")) || [
    "Matemática",
    "Português",
    "Física",
    "Química",
    "Biologia"
];

let tarefas = JSON.parse(localStorage.getItem("studyflow_tarefas")) || [];
let aulas = JSON.parse(localStorage.getItem("studyflow_aulas")) || [];
let exercicios = JSON.parse(localStorage.getItem("studyflow_exercicios")) || [];
let questoesCustom = JSON.parse(localStorage.getItem("studyflow_questoes_custom")) || [];
let sessoesFoco = JSON.parse(localStorage.getItem("studyflow_sessoes")) || [];
let metaSemanal = Number(localStorage.getItem("studyflow_meta")) || 5;

// ==========================================
// BANCO DE QUESTÕES PADRÃO & PERSONALIZADAS
// ==========================================
const bancoQuestoesPadrao = [
    {
        id: 1,
        materia: "Matemática",
        topico: "Porcentagem",
        pergunta: "Uma camiseta custa R$ 80,00 e recebeu um desconto de 25%. Qual será o novo preço a ser pago?",
        alternativas: [
            "R$ 55,00",
            "R$ 60,00",
            "R$ 65,00",
            "R$ 70,00",
            "R$ 75,00"
        ],
        resposta: 1,
        explicacao: "25% de 80 é calculado como (25/100) * 80 = 20. Subtraindo o desconto do valor original: 80 - 20 = R$ 60,00."
    },
    {
        id: 2,
        materia: "Matemática",
        topico: "Regra de Três",
        pergunta: "Se 3 cadernos custam R$ 24,00, quanto custarão 5 cadernos mantendo o mesmo preço unitário?",
        alternativas: [
            "R$ 30,00",
            "R$ 36,00",
            "R$ 40,00",
            "R$ 42,00",
            "R$ 45,00"
        ],
        resposta: 2,
        explicacao: "O valor unitário de 1 caderno é 24 / 3 = R$ 8,00. Logo, 5 cadernos custarão 5 * 8 = R$ 40,00."
    },
    {
        id: 3,
        materia: "Linguagens",
        topico: "Interpretação Textual",
        pergunta: "Em um texto dissertativo-argumentativo, a ideia central corresponde:",
        alternativas: [
            "Ao detalhe periférico menos relevante.",
            "À tese principal e informação central sustentada pelos argumentos.",
            "Somente ao título isolado da obra.",
            "Exclusivamente à última frase da conclusão.",
            "A um exemplo ilustrativo secundário."
        ],
        resposta: 1,
        explicacao: "A ideia central (ou tese) é a mensagem e posicionamento principal em torno do qual todo o texto é construído e fundamentado."
    },
    {
        id: 4,
        materia: "Linguagens",
        topico: "Gêneros Textuais",
        pergunta: "A finalidade comunicativa primordial de uma campanha publicitária é:",
        alternativas: [
            "Informar, conscientizar ou persuadir o público-alvo sobre uma ideia ou produto.",
            "Demonstrar teoremas matemáticos rigorosos.",
            "Narrar uma crônica fictícia em versos.",
            "Apresentar dados exclusivamente metalinguísticos sem intenção de convencimento.",
            "Listar palavras em ordem alfabética."
        ],
        resposta: 0,
        explicacao: "Campanhas publicitárias têm função conativa ou apelativa, visando convencer, conscientizar ou incentivar ações do leitor/espectador."
    },
    {
        id: 5,
        materia: "Natureza",
        topico: "Citologia",
        pergunta: "Qual organela celular é responsável pela respiração celular e produção de energia na forma de ATP?",
        alternativas: [
            "Complexo Golgiense",
            "Ribossomo",
            "Mitocôndria",
            "Lisossomo",
            "Retículo Endoplasmático Liso"
        ],
        resposta: 2,
        explicacao: "As mitocôndrias são as usinas de energia da célula eucarionte, realizando a respiração celular que gera moléculas de ATP."
    },
    {
        id: 6,
        materia: "Natureza",
        topico: "Mecânica",
        pergunta: "No Sistema Internacional de Unidades (SI), qual é a unidade oficial utilizada para medir Força?",
        alternativas: [
            "Joule (J)",
            "Watt (W)",
            "Pascal (Pa)",
            "Newton (N)",
            "Volt (V)"
        ],
        resposta: 3,
        explicacao: "A unidade de força no SI é o Newton (N), definida como a força que confere a uma massa de 1 kg uma aceleração de 1 m/s²."
    },
    {
        id: 7,
        materia: "Humanas",
        topico: "História Geral",
        pergunta: "A Primeira Revolução Industrial, iniciada no século XVIII na Inglaterra, teve como marco principal:",
        alternativas: [
            "A mecanização da produção com a máquina a vapor e a transformação das relações de trabalho.",
            "A criação imediata da energia nuclear para transporte.",
            "O surgimento da internet e a automação digital da manufatura.",
            "A predominância exclusiva da agricultura de subsistência.",
            "A abolição total das fábricas em favor do artesanato manual."
        ],
        resposta: 0,
        explicacao: "A Revolução Industrial substituiu o trabalho manual pela maquinofatura, impulsionada pelo tear mecânico e pelo motor a vapor movido a carvão mineral."
    },
    {
        id: 8,
        materia: "Humanas",
        topico: "Geografia Urbana",
        pergunta: "O processo de urbanização acelerada está diretamente vinculado:",
        alternativas: [
            "Ao crescimento das cidades e migração campo-cidade (êxodo rural).",
            "Ao abandono das cidades e despovoamento dos centros urbanos.",
            "À preservação intocada de florestas nativas em áreas metropolitanas.",
            "À redução da dependência tecnológica no meio produtivo.",
            "Ao fim da expansão demográfica mundial."
        ],
        resposta: 0,
        explicacao: "A urbanização ocorre quando o crescimento da população urbana supera o da população rural, geralmente impulsionado por industrialização e atração econômica."
    }
];

function obterTodasQuestoes() {
    return [...bancoQuestoesPadrao, ...questoesCustom];
}

// ==========================================
// ESTADOS DA APLICAÇÃO
// ==========================================
let paginaAtual = "dashboard";
let filtroStatus = "todos";
let filtroMateriaAtual = "todos";
let filtroAulasMateria = "todos";
let filtroExercicios = "todos";

// Modo foco
let duracaoFocoAtual = 25 * 60; // segundos
let tempoRestante = 25 * 60;
let timerInterval = null;
let timerRodando = false;

// Exercício atual em resolução
let questaoAtualResolucao = null;
let alternativaSelecionadaIndex = null;

// Calendário
let calendarioMes = new Date().getMonth();
let calendarioAno = new Date().getFullYear();
let diaSelecionado = new Date().toISOString().split("T")[0];

// ==========================================
// SALVAR NO LOCALSTORAGE
// ==========================================
function salvarDados() {
    localStorage.setItem("studyflow_materias", JSON.stringify(materias));
    localStorage.setItem("studyflow_tarefas", JSON.stringify(tarefas));
    localStorage.setItem("studyflow_aulas", JSON.stringify(aulas));
    localStorage.setItem("studyflow_exercicios", JSON.stringify(exercicios));
    localStorage.setItem("studyflow_questoes_custom", JSON.stringify(questoesCustom));
    localStorage.setItem("studyflow_sessoes", JSON.stringify(sessoesFoco));
    localStorage.setItem("studyflow_meta", String(metaSemanal));
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    inicializarStudyFlow();
});

function inicializarStudyFlow() {
    carregarNomeUsuario();
    atualizarData();
    configurarNavegacao();
    configurarModais();
    configurarPesquisa();
    configurarTarefas();
    configurarMaterias();
    configurarAulas();
    configurarExercicios();
    configurarFoco();
    configurarCalendario();
    configurarNotificacoes();
    configurarConfiguracoes();

    renderizarTudo();
    mostrarPagina("dashboard");
}

function renderizarTudo() {
    atualizarSelectMaterias();
    renderizarDashboard();
    renderizarMateriasPagina();
    renderizarAulas();
    renderizarExercicios();
    renderizarPlanejamento();
    renderizarDesempenho();
    renderizarMetas();
    atualizarMetaSidebar();
}

// ==========================================
// NAVEGAÇÃO ENTRE PÁGINAS
// ==========================================
function configurarNavegacao() {
    document.querySelectorAll("[data-page]").forEach((botao) => {
        botao.addEventListener("click", () => {
            const pagina = botao.dataset.page;
            if (pagina) {
                mostrarPagina(pagina);
            }
        });
    });

    // Botões Nova Tarefa
    document.querySelectorAll('[data-action="new-task"]').forEach((botao) => {
        botao.addEventListener("click", () => {
            abrirModalNovaTarefa();
        });
    });

    // Botão Ver Todas as Tarefas
    document.querySelectorAll('[data-action="view-tasks"]').forEach((botao) => {
        botao.addEventListener("click", () => {
            mostrarPagina("planejamento");
        });
    });

    // Menu Mobile
    const menuMobile = document.getElementById("mobile-menu-btn");
    if (menuMobile) {
        menuMobile.addEventListener("click", () => {
            document.querySelector(".sidebar")?.classList.toggle("mobile-open");
        });
    }
}

function mostrarPagina(pagina) {
    paginaAtual = pagina;

    document.querySelectorAll(".page").forEach((secao) => {
        secao.classList.remove("active");
    });

    const paginaElemento = document.getElementById("page-" + pagina);
    if (paginaElemento) {
        paginaElemento.classList.add("active");
    }

    document.querySelectorAll(".nav-item[data-page]").forEach((item) => {
        item.classList.toggle("active", item.dataset.page === pagina);
    });

    atualizarCabecalho(pagina);

    // Renderizações específicas de cada página
    if (pagina === "dashboard") {
        renderizarDashboard();
    } else if (pagina === "aulas") {
        renderizarAulas();
    } else if (pagina === "exercicios") {
        renderizarExercicios();
    } else if (pagina === "planejamento") {
        renderizarPlanejamento();
    } else if (pagina === "desempenho") {
        renderizarDesempenho();
    } else if (pagina === "materias") {
        renderizarMateriasPagina();
    } else if (pagina === "metas") {
        renderizarMetas();
    } else if (pagina === "configuracoes") {
        atualizarSelectMaterias();
    }

    document.querySelector(".sidebar")?.classList.remove("mobile-open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
window.mostrarPagina = mostrarPagina;

function atualizarCabecalho(pagina) {
    const dadosUsuario = localStorage.getItem("studyflow_usuario_logado");
    const nomeUsuario = dadosUsuario ? JSON.parse(dadosUsuario).nome : "Estudante";

    const titulos = {
        dashboard: `Olá, <span id="nome-dashboard">${escaparHTML(nomeUsuario)}</span>! 👋`,
        aulas: "Minhas Aulas",
        exercicios: "Exercícios",
        planejamento: "Planejamento",
        foco: "Modo Foco",
        desempenho: "Meu Desempenho",
        materias: "Minhas Matérias",
        metas: "Minhas Metas",
        configuracoes: "Configurações"
    };

    const breadcrumbs = {
        dashboard: "Dashboard",
        aulas: "Biblioteca",
        exercicios: "Prática",
        planejamento: "Organização",
        foco: "Concentração",
        desempenho: "Evolução",
        materias: "Organização",
        metas: "Objetivos",
        configuracoes: "Configurações"
    };

    const tituloElemento = document.getElementById("page-title");
    if (tituloElemento) {
        tituloElemento.innerHTML = titulos[pagina] || "StudyFlow";
    }

    definirTexto("page-breadcrumb", breadcrumbs[pagina] || "StudyFlow");
}

function atualizarData() {
    const elemento = document.getElementById("data-atual-txt");
    if (elemento) {
        elemento.textContent = new Date().toLocaleDateString("pt-BR");
    }
}

// ==========================================
// MODAIS (ABRIR, FECHAR E LIMPAR)
// ==========================================
function configurarModais() {
    document.querySelectorAll("[data-close-modal]").forEach((botao) => {
        botao.addEventListener("click", () => {
            fecharModal(botao.dataset.closeModal);
        });
    });

    document.querySelectorAll(".modal-overlay").forEach((modal) => {
        modal.addEventListener("click", (evento) => {
            if (evento.target === modal) {
                fecharModal(modal.id);
            }
        });
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            document.querySelectorAll(".modal-overlay").forEach((modal) => {
                fecharModal(modal.id);
            });
            fecharPainelBusca();
        }
    });
}

function abrirModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.add("open");
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
}
window.abrirModal = abrirModal;

function fecharModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.remove("open");
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");

    // Parar reprodução de vídeo se for o modal-video
    if (id === "modal-video") {
        const iframe = document.getElementById("video-iframe");
        if (iframe) {
            iframe.src = "";
        }
    }
}
window.fecharModal = fecharModal;

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function mostrarToast(mensagem, tipo = "normal") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    if (tipo === "success") toast.classList.add("success");
    if (tipo === "error") toast.classList.add("error");

    toast.innerHTML = `
        <i class="fa-solid ${
            tipo === "error"
                ? "fa-circle-exclamation"
                : tipo === "success"
                ? "fa-circle-check"
                : "fa-circle-info"
        }"></i>
        <span>${escaparHTML(mensagem)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}
window.mostrarToast = mostrarToast;

// ==========================================
// PESQUISA GLOBAL COMPLETA
// ==========================================
function configurarPesquisa() {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const closeBtn = document.getElementById("close-search-results");

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const termo = searchInput.value.trim();
            if (termo.length > 0) {
                executarPesquisa(termo);
            } else {
                fecharPainelBusca();
            }
        });

        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const termo = searchInput.value.trim();
                if (termo) executarPesquisa(termo);
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            const termo = searchInput?.value.trim() || "";
            if (termo) {
                executarPesquisa(termo);
            } else if (searchInput) {
                searchInput.focus();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            fecharPainelBusca();
        });
    }

    // Fechar ao clicar fora
    document.addEventListener("click", (evento) => {
        const wrapper = document.querySelector(".search-bar-wrapper");
        if (wrapper && !wrapper.contains(evento.target)) {
            fecharPainelBusca();
        }
    });
}

function fecharPainelBusca() {
    const panel = document.getElementById("search-results-panel");
    if (panel) {
        panel.style.display = "none";
    }
}

function executarPesquisa(termoOriginal) {
    const termo = termoOriginal.toLowerCase().trim();
    const painel = document.getElementById("search-results-panel");
    const container = document.getElementById("search-results-content");

    if (!painel || !container) return;

    // Buscar em Tarefas
    const tarefasEncontradas = tarefas.filter((t) => {
        return (
            (t.titulo && t.titulo.toLowerCase().includes(termo)) ||
            (t.descricao && t.descricao.toLowerCase().includes(termo)) ||
            (t.materia && t.materia.toLowerCase().includes(termo))
        );
    });

    // Buscar em Aulas
    const aulasEncontradas = aulas.filter((a) => {
        return (
            (a.titulo && a.titulo.toLowerCase().includes(termo)) ||
            (a.topico && a.topico.toLowerCase().includes(termo)) ||
            (a.descricao && a.descricao.toLowerCase().includes(termo)) ||
            (a.materia && a.materia.toLowerCase().includes(termo)) ||
            (a.professor && a.professor.toLowerCase().includes(termo))
        );
    });

    // Buscar em Matérias
    const materiasEncontradas = materias.filter((m) => {
        return m.toLowerCase().includes(termo);
    });

    // Buscar em Questões
    const questoesEncontradas = obterTodasQuestoes().filter((q) => {
        return (
            (q.pergunta && q.pergunta.toLowerCase().includes(termo)) ||
            (q.materia && q.materia.toLowerCase().includes(termo)) ||
            (q.topico && q.topico.toLowerCase().includes(termo))
        );
    });

    const totalEncontrado =
        tarefasEncontradas.length +
        aulasEncontradas.length +
        materiasEncontradas.length +
        questoesEncontradas.length;

    container.innerHTML = "";

    if (totalEncontrado === 0) {
        container.innerHTML = `
            <div class="search-empty">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 20px; color: var(--text-muted); margin-bottom: 8px; display: block;"></i>
                <p>Nenhum resultado encontrado para "<strong>${escaparHTML(termoOriginal)}</strong>".</p>
                <small style="color: var(--text-muted);">Tente buscar por tarefas, aulas, matérias ou tópicos.</small>
            </div>
        `;
        painel.style.display = "block";
        return;
    }

    // Grupo de Tarefas
    if (tarefasEncontradas.length > 0) {
        const grupo = document.createElement("div");
        grupo.className = "search-group";
        grupo.innerHTML = `
            <div class="search-group-title">
                <i class="fa-solid fa-list-check"></i>
                Tarefas (${tarefasEncontradas.length})
            </div>
        `;
        tarefasEncontradas.slice(0, 5).forEach((t) => {
            const item = document.createElement("div");
            item.className = "search-item";
            item.innerHTML = `
                <div class="search-item-info">
                    <strong>${escaparHTML(t.titulo)}</strong>
                    <span>${escaparHTML(t.materia)} • ${formatarData(t.data)}</span>
                </div>
                <span class="search-item-badge">${t.concluida ? "Concluída" : "Pendente"}</span>
            `;
            item.addEventListener("click", () => {
                fecharPainelBusca();
                diaSelecionado = t.data;
                mostrarPagina("planejamento");
            });
            grupo.appendChild(item);
        });
        container.appendChild(grupo);
    }

    // Grupo de Aulas
    if (aulasEncontradas.length > 0) {
        const grupo = document.createElement("div");
        grupo.className = "search-group";
        grupo.innerHTML = `
            <div class="search-group-title">
                <i class="fa-solid fa-video"></i>
                Videoaulas (${aulasEncontradas.length})
            </div>
        `;
        aulasEncontradas.slice(0, 5).forEach((a) => {
            const item = document.createElement("div");
            item.className = "search-item";
            item.innerHTML = `
                <div class="search-item-info">
                    <strong>${escaparHTML(a.titulo)}</strong>
                    <span>${escaparHTML(a.materia)}${a.topico ? ` • ${escaparHTML(a.topico)}` : ""}</span>
                </div>
                <span class="search-item-badge">${a.duracao ? `${a.duracao} min` : "Aula"}</span>
            `;
            item.addEventListener("click", () => {
                fecharPainelBusca();
                mostrarPagina("aulas");
                if (extrairYouTubeId(a.link)) {
                    abrirModalVideo(a.id);
                }
            });
            grupo.appendChild(item);
        });
        container.appendChild(grupo);
    }

    // Grupo de Matérias
    if (materiasEncontradas.length > 0) {
        const grupo = document.createElement("div");
        grupo.className = "search-group";
        grupo.innerHTML = `
            <div class="search-group-title">
                <i class="fa-solid fa-book"></i>
                Matérias (${materiasEncontradas.length})
            </div>
        `;
        materiasEncontradas.slice(0, 5).forEach((m) => {
            const item = document.createElement("div");
            item.className = "search-item";
            item.innerHTML = `
                <div class="search-item-info">
                    <strong>${escaparHTML(m)}</strong>
                    <span>Matéria cadastrada</span>
                </div>
                <span class="search-item-badge"><i class="fa-solid fa-arrow-right"></i></span>
            `;
            item.addEventListener("click", () => {
                fecharPainelBusca();
                mostrarPagina("materias");
            });
            grupo.appendChild(item);
        });
        container.appendChild(grupo);
    }

    // Grupo de Questões
    if (questoesEncontradas.length > 0) {
        const grupo = document.createElement("div");
        grupo.className = "search-group";
        grupo.innerHTML = `
            <div class="search-group-title">
                <i class="fa-solid fa-pen-to-square"></i>
                Questões (${questoesEncontradas.length})
            </div>
        `;
        questoesEncontradas.slice(0, 5).forEach((q) => {
            const item = document.createElement("div");
            item.className = "search-item";
            item.innerHTML = `
                <div class="search-item-info">
                    <strong>${escaparHTML(q.pergunta)}</strong>
                    <span>${escaparHTML(q.materia)}${q.topico ? ` • ${escaparHTML(q.topico)}` : ""}</span>
                </div>
                <span class="search-item-badge">Praticar</span>
            `;
            item.addEventListener("click", () => {
                fecharPainelBusca();
                mostrarPagina("exercicios");
                iniciarExercicioEspecifico(q);
            });
            grupo.appendChild(item);
        });
        container.appendChild(grupo);
    }

    painel.style.display = "block";
}

// ==========================================
// TAREFAS (CRIAÇÃO, EDIÇÃO E EXCLUSÃO)
// ==========================================
function configurarTarefas() {
    const form = document.getElementById("form-tarefa");
    if (form) {
        form.addEventListener("submit", salvarTarefa);
    }
}

function abrirModalNovaTarefa(dataInicial = null) {
    const form = document.getElementById("form-tarefa");
    if (form) form.reset();

    const idInput = document.getElementById("tarefa-id");
    if (idInput) idInput.value = "";

    const tituloModal = document.getElementById("modal-tarefa-titulo");
    if (tituloModal) tituloModal.textContent = "Adicionar nova tarefa";

    const btnSalvar = document.getElementById("btn-salvar-tarefa");
    if (btnSalvar) {
        btnSalvar.innerHTML = `<i class="fa-solid fa-check"></i> <span>Criar tarefa</span>`;
    }

    const dataInput = document.getElementById("tarefa-data");
    if (dataInput) {
        dataInput.value = dataInicial || diaSelecionado || dataHoje();
    }

    atualizarSelectMaterias();
    abrirModal("modal-tarefa");
}
window.abrirModalNovaTarefa = abrirModalNovaTarefa;

function editarTarefa(id) {
    const tarefa = tarefas.find((t) => t.id === id);
    if (!tarefa) return;

    const idInput = document.getElementById("tarefa-id");
    const tituloInput = document.getElementById("tarefa-titulo");
    const descInput = document.getElementById("tarefa-descricao");
    const materiaSelect = document.getElementById("tarefa-materia");
    const prioridadeSelect = document.getElementById("tarefa-prioridade");
    const dataInput = document.getElementById("tarefa-data");

    if (idInput) idInput.value = String(tarefa.id);
    if (tituloInput) tituloInput.value = tarefa.titulo || "";
    if (descInput) descInput.value = tarefa.descricao || "";
    if (prioridadeSelect) prioridadeSelect.value = tarefa.prioridade || "media";
    if (dataInput) dataInput.value = tarefa.data || "";

    atualizarSelectMaterias();
    if (materiaSelect) materiaSelect.value = tarefa.materia;

    const tituloModal = document.getElementById("modal-tarefa-titulo");
    if (tituloModal) tituloModal.textContent = "Editar tarefa";

    const btnSalvar = document.getElementById("btn-salvar-tarefa");
    if (btnSalvar) {
        btnSalvar.innerHTML = `<i class="fa-solid fa-check"></i> <span>Salvar alterações</span>`;
    }

    abrirModal("modal-tarefa");
}
window.editarTarefa = editarTarefa;

function salvarTarefa(evento) {
    evento.preventDefault();

    const id = document.getElementById("tarefa-id")?.value;
    const titulo = document.getElementById("tarefa-titulo")?.value.trim();
    const descricao = document.getElementById("tarefa-descricao")?.value.trim() || "";
    const materia = document.getElementById("tarefa-materia")?.value;
    const prioridade = document.getElementById("tarefa-prioridade")?.value || "media";
    const data = document.getElementById("tarefa-data")?.value;

    if (!titulo || !materia || !data) {
        mostrarToast("Preencha título, matéria e data da tarefa.", "error");
        return;
    }

    if (id) {
        // Atualizar tarefa existente
        const tarefa = tarefas.find((t) => t.id === Number(id));
        if (tarefa) {
            tarefa.titulo = titulo;
            tarefa.descricao = descricao;
            tarefa.materia = materia;
            tarefa.prioridade = prioridade;
            tarefa.data = data;
            mostrarToast("Tarefa atualizada com sucesso!", "success");
        }
    } else {
        // Criar nova tarefa
        tarefas.push({
            id: Date.now(),
            titulo: titulo,
            descricao: descricao,
            materia: materia,
            prioridade: prioridade,
            data: data,
            concluida: false,
            criadaEm: new Date().toISOString()
        });
        mostrarToast("Tarefa criada com sucesso!", "success");
    }

    salvarDados();
    evento.target.reset();
    fecharModal("modal-tarefa");

    renderizarDashboard();
    renderizarPlanejamento();
    renderizarMetas();
    renderizarDesempenho();
}

function concluirTarefa(id) {
    const tarefa = tarefas.find((item) => item.id === id);
    if (!tarefa) return;

    tarefa.concluida = !tarefa.concluida;
    salvarDados();

    renderizarDashboard();
    renderizarPlanejamento();
    renderizarMetas();
    renderizarDesempenho();

    mostrarToast(
        tarefa.concluida ? "Tarefa concluída! Parabéns!" : "Tarefa reaberta.",
        "success"
    );
}
window.concluirTarefa = concluirTarefa;

function excluirTarefa(id) {
    if (!confirm("Deseja realmente excluir esta tarefa?")) return;

    tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    salvarDados();

    renderizarDashboard();
    renderizarPlanejamento();
    renderizarMetas();
    renderizarDesempenho();

    mostrarToast("Tarefa excluída.");
}
window.excluirTarefa = excluirTarefa;

function criarCardTarefa(tarefa) {
    const card = document.createElement("div");
    card.className = `task-card prioridade-${tarefa.prioridade}`;
    if (tarefa.concluida) {
        card.classList.add("completed");
    }

    card.innerHTML = `
        <div class="task-top-row">
            <span class="task-tag"><i class="fa-solid fa-book"></i> ${escaparHTML(tarefa.materia)}</span>
            <span class="prioridade-badge badge-${escaparHTML(tarefa.prioridade)}">${formatarPrioridade(tarefa.prioridade)}</span>
        </div>
        <div class="task-main">
            <button
                type="button"
                class="task-check-btn ${tarefa.concluida ? "checked" : ""}"
                onclick="concluirTarefa(${tarefa.id})"
                title="${tarefa.concluida ? "Reabrir tarefa" : "Marcar como concluída"}"
            >
                <i class="fa-solid fa-check"></i>
            </button>
            <div class="task-details">
                <h4 class="task-title">${escaparHTML(tarefa.titulo)}</h4>
                ${
                    tarefa.descricao
                        ? `<p class="task-desc">${escaparHTML(tarefa.descricao)}</p>`
                        : ""
                }
                <div class="task-meta-info">
                    <span><i class="fa-regular fa-calendar"></i> Entrega: ${formatarData(tarefa.data)}</span>
                </div>
            </div>
        </div>
        <div class="task-bottom-actions">
            <small style="color: var(--text-muted); font-size: 10px;">
                ${tarefa.concluida ? "Status: Concluída" : "Status: Pendente"}
            </small>
            <div class="task-action-btns">
                <button
                    type="button"
                    class="btn-icon-action"
                    onclick="editarTarefa(${tarefa.id})"
                    title="Editar tarefa"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button
                    type="button"
                    class="btn-icon-action delete"
                    onclick="excluirTarefa(${tarefa.id})"
                    title="Excluir tarefa"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    `;

    return card;
}

// ==========================================
// DASHBOARD
// ==========================================
function renderizarDashboard() {
    const total = tarefas.length;
    const concluidas = tarefas.filter((t) => t.concluida).length;
    const porcentagem = total > 0 ? Math.round((concluidas / total) * 100) : 0;

    definirTexto("total-tarefas", total);
    definirTexto("concluidas-tarefas", concluidas);
    definirTexto("porcentagem-progresso", porcentagem + "%");

    const horas = calcularHorasEstudadas();
    definirTexto("horas-estudadas", formatarHorasMinutos(horas * 60));
    definirTexto("sequencia-estudos", calcularSequencia());

    // Resumo de estudos
    const aulasFeitas = aulas.filter((a) => a.concluida).length;
    definirTexto("resumo-aulas", aulasFeitas);
    definirTexto("resumo-questoes", exercicios.length);

    const acertos = exercicios.filter((e) => e.acertou).length;
    const taxaAcerto = exercicios.length > 0 ? Math.round((acertos / exercicios.length) * 100) : 0;
    definirTexto("resumo-acerto", taxaAcerto + "%");

    const barra = document.getElementById("barra-progresso-geral");
    if (barra) {
        barra.style.width = porcentagem + "%";
    }

    renderizarTarefasDashboard();
}

function renderizarTarefasDashboard() {
    const container = document.getElementById("dashboard-tarefas");
    if (!container) return;

    const pendentes = tarefas
        .filter((t) => !t.concluida)
        .sort((a, b) => new Date(a.data) - new Date(b.data))
        .slice(0, 5);

    container.innerHTML = "";

    if (pendentes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-circle-check"></i>
                <h4>Tudo em dia!</h4>
                <p>Você não possui nenhuma tarefa pendente no momento.</p>
            </div>
        `;
        return;
    }

    pendentes.forEach((tarefa) => {
        const item = document.createElement("div");
        item.className = "dashboard-task-item";
        item.innerHTML = `
            <div class="dashboard-task-check">
                <i class="fa-solid fa-clock"></i>
            </div>
            <div class="dashboard-task-info">
                <strong>${escaparHTML(tarefa.titulo)}</strong>
                <span>${escaparHTML(tarefa.materia)} • Para: ${formatarData(tarefa.data)}</span>
            </div>
            <button
                class="btn-icon-action"
                onclick="concluirTarefa(${tarefa.id})"
                title="Concluir tarefa"
            >
                <i class="fa-solid fa-check"></i>
            </button>
        `;
        container.appendChild(item);
    });
}

function atualizarMetaSidebar() {
    const concluidas = tarefas.filter((t) => t.concluida).length;
    definirTexto("meta-atual", concluidas);
    definirTexto("meta-objetivo", metaSemanal);

    const porcentagem = Math.min(100, Math.round((concluidas / metaSemanal) * 100));
    const barra = document.getElementById("meta-barra-progresso");
    if (barra) {
        barra.style.width = porcentagem + "%";
    }
}

// ==========================================
// MINHAS AULAS & INTEGRAÇÃO COM YOUTUBE
// ==========================================
function extrairYouTubeId(url) {
    if (!url) return null;
    try {
        const regex = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    } catch (e) {
        return null;
    }
}

function configurarAulas() {
    const btnNovaAula = document.getElementById("btn-nova-aula");
    if (btnNovaAula) {
        btnNovaAula.addEventListener("click", () => {
            abrirModalNovaAula();
        });
    }

    const form = document.getElementById("form-aula");
    if (form) {
        form.addEventListener("submit", salvarAula);
    }
}

function abrirModalNovaAula() {
    const form = document.getElementById("form-aula");
    if (form) form.reset();

    const idInput = document.getElementById("aula-id");
    if (idInput) idInput.value = "";

    const tituloModal = document.getElementById("modal-aula-titulo");
    if (tituloModal) tituloModal.textContent = "Adicionar nova videoaula";

    const btnSalvar = document.getElementById("btn-salvar-aula");
    if (btnSalvar) {
        btnSalvar.innerHTML = `<i class="fa-solid fa-plus"></i> <span>Adicionar aula</span>`;
    }

    const dataInput = document.getElementById("aula-data");
    if (dataInput) dataInput.value = dataHoje();

    atualizarSelectMaterias();
    abrirModal("modal-aula");
}
window.abrirModalNovaAula = abrirModalNovaAula;

function editarAula(id) {
    const aula = aulas.find((a) => a.id === id);
    if (!aula) return;

    const idInput = document.getElementById("aula-id");
    const tituloInput = document.getElementById("aula-titulo");
    const materiaSelect = document.getElementById("aula-materia");
    const topicoInput = document.getElementById("aula-topico");
    const profInput = document.getElementById("aula-professor");
    const duracaoInput = document.getElementById("aula-duracao");
    const linkInput = document.getElementById("aula-link");
    const dataInput = document.getElementById("aula-data");
    const descInput = document.getElementById("aula-descricao");

    if (idInput) idInput.value = String(aula.id);
    if (tituloInput) tituloInput.value = aula.titulo || "";
    if (topicoInput) topicoInput.value = aula.topico || "";
    if (profInput) profInput.value = aula.professor || "";
    if (duracaoInput) duracaoInput.value = aula.duracao || "";
    if (linkInput) linkInput.value = aula.link || "";
    if (dataInput) dataInput.value = aula.data || "";
    if (descInput) descInput.value = aula.descricao || "";

    atualizarSelectMaterias();
    if (materiaSelect) materiaSelect.value = aula.materia;

    const tituloModal = document.getElementById("modal-aula-titulo");
    if (tituloModal) tituloModal.textContent = "Editar videoaula";

    const btnSalvar = document.getElementById("btn-salvar-aula");
    if (btnSalvar) {
        btnSalvar.innerHTML = `<i class="fa-solid fa-check"></i> <span>Salvar alterações</span>`;
    }

    abrirModal("modal-aula");
}
window.editarAula = editarAula;

function salvarAula(evento) {
    evento.preventDefault();

    const id = document.getElementById("aula-id")?.value;
    const titulo = document.getElementById("aula-titulo")?.value.trim();
    const materia = document.getElementById("aula-materia")?.value;
    const topico = document.getElementById("aula-topico")?.value.trim() || "";
    const professor = document.getElementById("aula-professor")?.value.trim() || "";
    const duracao = Number(document.getElementById("aula-duracao")?.value) || 0;
    const link = document.getElementById("aula-link")?.value.trim() || "";
    const data = document.getElementById("aula-data")?.value || dataHoje();
    const descricao = document.getElementById("aula-descricao")?.value.trim() || "";

    if (!titulo || !materia || !link) {
        mostrarToast("Preencha o título, matéria e o link da videoaula.", "error");
        return;
    }

    if (id) {
        const aula = aulas.find((a) => a.id === Number(id));
        if (aula) {
            aula.titulo = titulo;
            aula.materia = materia;
            aula.topico = topico;
            aula.professor = professor;
            aula.duracao = duracao;
            aula.link = link;
            aula.data = data;
            aula.descricao = descricao;
            mostrarToast("Videoaula atualizada com sucesso!", "success");
        }
    } else {
        aulas.push({
            id: Date.now(),
            titulo: titulo,
            materia: materia,
            topico: topico,
            professor: professor,
            duracao: duracao,
            link: link,
            data: data,
            descricao: descricao,
            concluida: false,
            criadaEm: new Date().toISOString()
        });
        mostrarToast("Videoaula adicionada à sua biblioteca!", "success");
    }

    salvarDados();
    evento.target.reset();
    fecharModal("modal-aula");

    renderizarAulas();
    renderizarDashboard();
    renderizarDesempenho();
}

function concluirAula(id) {
    const aula = aulas.find((item) => item.id === id);
    if (!aula) return;

    aula.concluida = !aula.concluida;
    salvarDados();

    renderizarAulas();
    renderizarDashboard();
    renderizarDesempenho();

    mostrarToast(
        aula.concluida ? "Aula marcada como concluída! 🎓" : "Aula marcada como pendente.",
        "success"
    );
}
window.concluirAula = concluirAula;

function excluirAula(id) {
    if (!confirm("Deseja realmente excluir esta videoaula?")) return;

    aulas = aulas.filter((aula) => aula.id !== id);
    salvarDados();

    renderizarAulas();
    renderizarDashboard();
    renderizarDesempenho();

    mostrarToast("Aula removida da sua biblioteca.");
}
window.excluirAula = excluirAula;

function abrirModalVideo(id) {
    const aula = aulas.find((a) => a.id === id);
    if (!aula) return;

    const ytId = extrairYouTubeId(aula.link);
    if (!ytId) {
        // Se não for do YouTube, abre diretamente no navegador
        window.open(aula.link, "_blank", "noopener,noreferrer");
        return;
    }

    const iframe = document.getElementById("video-iframe");
    const titulo = document.getElementById("video-titulo");
    const materiaBadge = document.getElementById("video-materia");
    const topicoBadge = document.getElementById("video-topico");
    const canalSpan = document.getElementById("video-canal");
    const tempoSpan = document.getElementById("video-tempo");
    const linkExterno = document.getElementById("video-link-externo");

    if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&enablejsapi=1`;
    }
    if (titulo) titulo.textContent = aula.titulo;
    if (materiaBadge) materiaBadge.textContent = aula.materia.toUpperCase();
    if (topicoBadge) topicoBadge.textContent = aula.topico ? `• ${aula.topico}` : "";

    if (canalSpan) {
        canalSpan.innerHTML = `<i class="fa-solid fa-chalkboard-user"></i> ${escaparHTML(aula.professor || "Canal")}`;
    }
    if (tempoSpan) {
        tempoSpan.innerHTML = `<i class="fa-regular fa-clock"></i> ${aula.duracao || 0} min`;
    }
    if (linkExterno) {
        linkExterno.href = aula.link;
    }

    abrirModal("modal-video");
}
window.abrirModalVideo = abrirModalVideo;

function renderizarAulas() {
    definirTexto("total-aulas", aulas.length);
    const concluidas = aulas.filter((a) => a.concluida).length;
    definirTexto("aulas-concluidas", concluidas);

    const progresso = aulas.length ? Math.round((concluidas / aulas.length) * 100) : 0;
    definirTexto("progresso-aulas", progresso + "%");

    renderizarFiltrosAulas();

    const container = document.getElementById("lista-aulas");
    if (!container) return;

    let lista = aulas.slice().reverse();

    if (filtroAulasMateria !== "todos") {
        lista = lista.filter((a) => a.materia === filtroAulasMateria);
    }

    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; padding: 40px 20px;">
                <i class="fa-solid fa-video" style="font-size: 36px; margin-bottom: 12px;"></i>
                <h4>${aulas.length === 0 ? "Sua biblioteca de videoaulas está vazia" : "Nenhuma aula nesta matéria"}</h4>
                <p>${aulas.length === 0 ? "Clique em 'Nova aula' para adicionar suas videoaulas do YouTube e organizar seus estudos." : "Adicione aulas para esta matéria ou troque o filtro para ver todas."}</p>
            </div>
        `;
        return;
    }

    lista.forEach((aula) => {
        const ytId = extrairYouTubeId(aula.link);
        const card = document.createElement("div");
        card.className = `lesson-card ${aula.concluida ? "completed" : ""}`;

        let thumbHtml = "";
        if (ytId) {
            thumbHtml = `
                <div class="lesson-thumbnail-wrap" onclick="abrirModalVideo(${aula.id})" title="Clique para assistir">
                    <img
                        src="https://img.youtube.com/vi/${ytId}/hqdefault.jpg"
                        alt="${escaparHTML(aula.titulo)}"
                        class="lesson-thumbnail-img"
                        loading="lazy"
                    >
                    <div class="lesson-play-badge">
                        <i class="fa-solid fa-play"></i>
                    </div>
                    ${aula.duracao ? `<span class="lesson-duration-tag">${aula.duracao} min</span>` : ""}
                </div>
            `;
        } else {
            thumbHtml = `
                <div class="lesson-thumbnail-wrap" onclick="window.open('${escaparURL(aula.link)}', '_blank')" title="Abrir link externo">
                    <div class="lesson-thumbnail-placeholder">
                        <i class="fa-solid fa-video"></i>
                        <span>Aula Externa</span>
                    </div>
                    ${aula.duracao ? `<span class="lesson-duration-tag">${aula.duracao} min</span>` : ""}
                </div>
            `;
        }

        card.innerHTML = `
            ${thumbHtml}
            <div class="lesson-content">
                <div class="lesson-badges-row">
                    <span class="lesson-subject-badge">${escaparHTML(aula.materia)}</span>
                    ${aula.topico ? `<span class="lesson-topic-badge">${escaparHTML(aula.topico)}</span>` : ""}
                </div>
                <h3 class="lesson-title">${escaparHTML(aula.titulo)}</h3>
                <div class="lesson-meta-bar">
                    ${aula.professor ? `<span><i class="fa-solid fa-chalkboard-user"></i> ${escaparHTML(aula.professor)}</span>` : ""}
                    ${aula.data ? `<span><i class="fa-regular fa-calendar"></i> ${formatarData(aula.data)}</span>` : ""}
                </div>
                ${aula.descricao ? `<p class="lesson-description-text">${escaparHTML(aula.descricao)}</p>` : ""}
                <div class="lesson-actions-bar">
                    <div class="lesson-left-btns">
                        ${
                            ytId
                                ? `
                                <button type="button" class="btn-primary" style="padding: 7px 12px; font-size: 11px;" onclick="abrirModalVideo(${aula.id})">
                                    <i class="fa-solid fa-play"></i> Assistir
                                </button>
                                <a href="${escaparURL(aula.link)}" target="_blank" rel="noopener noreferrer" class="btn-icon-action" title="Abrir no YouTube">
                                    <i class="fa-brands fa-youtube" style="color: var(--danger);"></i>
                                </a>
                                `
                                : `
                                <a href="${escaparURL(aula.link)}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="padding: 7px 12px; font-size: 11px;">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Acessar
                                </a>
                                `
                        }
                    </div>
                    <div class="task-action-btns">
                        <button
                            type="button"
                            class="btn-icon-action ${aula.concluida ? "btn-check" : ""}"
                            onclick="concluirAula(${aula.id})"
                            title="${aula.concluida ? "Marcar como não concluída" : "Concluir aula"}"
                        >
                            <i class="fa-solid ${aula.concluida ? "fa-rotate-left" : "fa-check"}"></i>
                        </button>
                        <button
                            type="button"
                            class="btn-icon-action"
                            onclick="editarAula(${aula.id})"
                            title="Editar aula"
                        >
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button
                            type="button"
                            class="btn-icon-action delete"
                            onclick="excluirAula(${aula.id})"
                            title="Excluir aula"
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function renderizarFiltrosAulas() {
    const container = document.getElementById("aulas-categorias");
    if (!container) return;

    container.innerHTML = "";

    const btnTodos = document.createElement("button");
    btnTodos.className = `exercise-category ${filtroAulasMateria === "todos" ? "active" : ""}`;
    btnTodos.innerHTML = `<i class="fa-solid fa-layer-group"></i> <span>Todas as Matérias</span>`;
    btnTodos.addEventListener("click", () => {
        filtroAulasMateria = "todos";
        renderizarAulas();
    });
    container.appendChild(btnTodos);

    materias.forEach((materia) => {
        const btn = document.createElement("button");
        btn.className = `exercise-category ${filtroAulasMateria === materia ? "active" : ""}`;
        btn.innerHTML = `<i class="fa-solid fa-book"></i> <span>${escaparHTML(materia)}</span>`;
        btn.addEventListener("click", () => {
            filtroAulasMateria = materia;
            renderizarAulas();
        });
        container.appendChild(btn);
    });
}

// ==========================================
// EXERCÍCIOS & PERSONALIZAÇÃO COMPLETA
// ==========================================
function configurarExercicios() {
    const btnComecar = document.getElementById("btn-iniciar-exercicio");
    if (btnComecar) {
        btnComecar.addEventListener("click", () => {
            iniciarExercicioAleatorio();
        });
    }

    const btnNovaQuestao = document.getElementById("btn-nova-questao");
    if (btnNovaQuestao) {
        btnNovaQuestao.addEventListener("click", () => {
            abrirModalNovaQuestao();
        });
    }

    const btnGerenciar = document.getElementById("btn-gerenciar-questoes");
    if (btnGerenciar) {
        btnGerenciar.addEventListener("click", () => {
            alternarAreaGerenciamento();
        });
    }

    const btnFecharGerenciamento = document.getElementById("btn-fechar-gerenciamento");
    if (btnFecharGerenciamento) {
        btnFecharGerenciamento.addEventListener("click", () => {
            const area = document.getElementById("area-gerenciamento-questoes");
            if (area) area.style.display = "none";
        });
    }

    const btnFecharSolver = document.getElementById("btn-fechar-solver");
    if (btnFecharSolver) {
        btnFecharSolver.addEventListener("click", () => {
            const solver = document.getElementById("area-resolucao-exercicio");
            if (solver) solver.style.display = "none";
            questaoAtualResolucao = null;
        });
    }

    const btnConfirmar = document.getElementById("btn-solver-confirmar");
    if (btnConfirmar) {
        btnConfirmar.addEventListener("click", () => {
            confirmarRespostaExercicio();
        });
    }

    const btnProximo = document.getElementById("btn-solver-proximo");
    if (btnProximo) {
        btnProximo.addEventListener("click", () => {
            iniciarExercicioAleatorio();
        });
    }

    const formQuestao = document.getElementById("form-questao");
    if (formQuestao) {
        formQuestao.addEventListener("submit", salvarQuestaoPersonalizada);
    }
}

function alternarAreaGerenciamento() {
    const area = document.getElementById("area-gerenciamento-questoes");
    if (!area) return;

    if (area.style.display === "none" || area.style.display === "") {
        area.style.display = "block";
        renderizarQuestoesCustomizadas();
        area.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        area.style.display = "none";
    }
}

function abrirModalNovaQuestao() {
    const form = document.getElementById("form-questao");
    if (form) form.reset();

    const idInput = document.getElementById("questao-id");
    if (idInput) idInput.value = "";

    const titulo = document.getElementById("modal-questao-titulo");
    if (titulo) titulo.textContent = "Cadastrar Nova Questão";

    atualizarSelectMaterias();
    abrirModal("modal-questao");
}
window.abrirModalNovaQuestao = abrirModalNovaQuestao;

function editarQuestaoPersonalizada(id) {
    const q = questoesCustom.find((item) => item.id === id);
    if (!q) return;

    const idInput = document.getElementById("questao-id");
    const materiaSelect = document.getElementById("questao-materia");
    const materiaNovaInput = document.getElementById("questao-materia-nova");
    const topicoInput = document.getElementById("questao-topico");
    const perguntaInput = document.getElementById("questao-pergunta");
    const alt0 = document.getElementById("questao-alt-0");
    const alt1 = document.getElementById("questao-alt-1");
    const alt2 = document.getElementById("questao-alt-2");
    const alt3 = document.getElementById("questao-alt-3");
    const alt4 = document.getElementById("questao-alt-4");
    const corretaSelect = document.getElementById("questao-correta");
    const explicacaoInput = document.getElementById("questao-explicacao");

    if (idInput) idInput.value = String(q.id);
    if (topicoInput) topicoInput.value = q.topico || "";
    if (perguntaInput) perguntaInput.value = q.pergunta || "";

    if (alt0) alt0.value = q.alternativas[0] || "";
    if (alt1) alt1.value = q.alternativas[1] || "";
    if (alt2) alt2.value = q.alternativas[2] || "";
    if (alt3) alt3.value = q.alternativas[3] || "";
    if (alt4) alt4.value = q.alternativas[4] || "";

    if (corretaSelect) corretaSelect.value = String(q.resposta);
    if (explicacaoInput) explicacaoInput.value = q.explicacao || "";

    atualizarSelectMaterias();
    if (materiaSelect) materiaSelect.value = q.materia;
    if (materiaNovaInput) materiaNovaInput.value = "";

    const titulo = document.getElementById("modal-questao-titulo");
    if (titulo) titulo.textContent = "Editar Questão";

    abrirModal("modal-questao");
}
window.editarQuestaoPersonalizada = editarQuestaoPersonalizada;

function salvarQuestaoPersonalizada(evento) {
    evento.preventDefault();

    const id = document.getElementById("questao-id")?.value;
    const materiaSelect = document.getElementById("questao-materia")?.value;
    const materiaNova = document.getElementById("questao-materia-nova")?.value.trim();
    const materiaFinal = materiaNova || materiaSelect;

    const topico = document.getElementById("questao-topico")?.value.trim() || "";
    const pergunta = document.getElementById("questao-pergunta")?.value.trim();

    const alt0 = document.getElementById("questao-alt-0")?.value.trim();
    const alt1 = document.getElementById("questao-alt-1")?.value.trim();
    const alt2 = document.getElementById("questao-alt-2")?.value.trim();
    const alt3 = document.getElementById("questao-alt-3")?.value.trim();
    const alt4 = document.getElementById("questao-alt-4")?.value.trim();

    const respostaCorreta = Number(document.getElementById("questao-correta")?.value) || 0;
    const explicacao = document.getElementById("questao-explicacao")?.value.trim() || "";

    if (!materiaFinal || !pergunta || !alt0 || !alt1 || !alt2 || !alt3) {
        mostrarToast("Preencha matéria, enunciado e pelo menos as alternativas A a D.", "error");
        return;
    }

    // Se for uma matéria nova, adicionar à lista geral de matérias
    if (materiaNova && !materias.some((m) => m.toLowerCase() === materiaNova.toLowerCase())) {
        materias.push(materiaNova);
    }

    const alternativas = [alt0, alt1, alt2, alt3];
    if (alt4) alternativas.push(alt4);

    if (respostaCorreta >= alternativas.length) {
        mostrarToast("A alternativa correta selecionada não foi preenchida.", "error");
        return;
    }

    if (id) {
        const questao = questoesCustom.find((q) => q.id === Number(id));
        if (questao) {
            questao.materia = materiaFinal;
            questao.topico = topico;
            questao.pergunta = pergunta;
            questao.alternativas = alternativas;
            questao.resposta = respostaCorreta;
            questao.explicacao = explicacao;
            mostrarToast("Questão personalizada atualizada!", "success");
        }
    } else {
        questoesCustom.push({
            id: Date.now(),
            materia: materiaFinal,
            topico: topico,
            pergunta: pergunta,
            alternativas: alternativas,
            resposta: respostaCorreta,
            explicacao: explicacao,
            personalizada: true
        });
        mostrarToast("Questão adicionada ao seu banco!", "success");
    }

    salvarDados();
    evento.target.reset();
    fecharModal("modal-questao");

    renderizarExercicios();
    renderizarQuestoesCustomizadas();
    atualizarSelectMaterias();
}

function excluirQuestaoPersonalizada(id) {
    if (!confirm("Deseja realmente excluir esta questão do seu banco?")) return;

    questoesCustom = questoesCustom.filter((q) => q.id !== id);
    salvarDados();

    renderizarExercicios();
    renderizarQuestoesCustomizadas();
    mostrarToast("Questão excluída com sucesso.");
}
window.excluirQuestaoPersonalizada = excluirQuestaoPersonalizada;

function renderizarQuestoesCustomizadas() {
    const container = document.getElementById("lista-questoes-custom");
    if (!container) return;

    container.innerHTML = "";

    if (questoesCustom.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 25px;">
                <i class="fa-solid fa-pen-ruler"></i>
                <h4>Nenhuma questão personalizada ainda</h4>
                <p>Clique no botão 'Nova questão' acima para cadastrar matérias, assuntos e questões próprias.</p>
            </div>
        `;
        return;
    }

    const grid = document.createElement("div");
    grid.className = "custom-questions-grid";

    questoesCustom.forEach((q) => {
        const card = document.createElement("div");
        card.className = "custom-question-card";
        const letraCorreta = String.fromCharCode(65 + q.resposta);

        card.innerHTML = `
            <div class="custom-question-header">
                <span class="solver-badge-materia">${escaparHTML(q.materia)}</span>
                ${q.topico ? `<span class="solver-badge-topico">${escaparHTML(q.topico)}</span>` : ""}
            </div>
            <p class="custom-question-text">${escaparHTML(q.pergunta)}</p>
            <div class="custom-question-answer-info">
                <i class="fa-solid fa-circle-check"></i> Gabarito: Alternativa ${letraCorreta}
            </div>
            <div class="custom-question-actions">
                <button
                    type="button"
                    class="btn-secondary"
                    style="font-size: 11px; padding: 5px 10px;"
                    onclick="iniciarExercicioEspecificoPorId(${q.id})"
                >
                    <i class="fa-solid fa-play"></i> Responder
                </button>
                <button
                    type="button"
                    class="btn-icon-action"
                    onclick="editarQuestaoPersonalizada(${q.id})"
                    title="Editar questão"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button
                    type="button"
                    class="btn-icon-action delete"
                    onclick="excluirQuestaoPersonalizada(${q.id})"
                    title="Excluir questão"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

function iniciarExercicioAleatorio() {
    const todas = obterTodasQuestoes();
    let disponiveis = todas;

    if (filtroExercicios !== "todos") {
        disponiveis = todas.filter((q) => {
            const materiaNome = q.materia.toLowerCase();
            const categoriaNome = filtroExercicios.toLowerCase();
            return (
                materiaNome.includes(categoriaNome) ||
                categoriaNome.includes(materiaNome) ||
                (q.categoria && q.categoria === filtroExercicios)
            );
        });
    }

    if (disponiveis.length === 0) {
        mostrarToast("Nenhuma questão cadastrada para esta categoria. Adicione uma nova questão!", "error");
        return;
    }

    const questao = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    iniciarExercicioEspecifico(questao);
}

function iniciarExercicioEspecificoPorId(id) {
    const questao = obterTodasQuestoes().find((q) => q.id === id);
    if (questao) {
        iniciarExercicioEspecifico(questao);
    }
}
window.iniciarExercicioEspecificoPorId = iniciarExercicioEspecificoPorId;

function iniciarExercicioEspecifico(questao) {
    questaoAtualResolucao = questao;
    alternativaSelecionadaIndex = null;

    const area = document.getElementById("area-resolucao-exercicio");
    const materiaBadge = document.getElementById("solver-materia");
    const topicoBadge = document.getElementById("solver-topico");
    const perguntaTexto = document.getElementById("solver-pergunta");
    const alternativasContainer = document.getElementById("solver-alternativas");
    const feedbackArea = document.getElementById("solver-feedback");
    const btnConfirmar = document.getElementById("btn-solver-confirmar");
    const btnProximo = document.getElementById("btn-solver-proximo");

    if (!area) return;

    if (materiaBadge) materiaBadge.textContent = questao.materia;
    if (topicoBadge) topicoBadge.textContent = questao.topico || "Geral";
    if (perguntaTexto) perguntaTexto.textContent = questao.pergunta;

    if (feedbackArea) feedbackArea.style.display = "none";
    if (btnProximo) btnProximo.style.display = "none";

    if (btnConfirmar) {
        btnConfirmar.style.display = "inline-flex";
        btnConfirmar.disabled = true;
    }

    if (alternativasContainer) {
        alternativasContainer.innerHTML = "";
        questao.alternativas.forEach((alt, index) => {
            const letra = String.fromCharCode(65 + index);
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "solver-alt-btn";
            btn.innerHTML = `
                <span class="solver-alt-letter">${letra}</span>
                <span class="solver-alt-text">${escaparHTML(alt)}</span>
            `;

            btn.addEventListener("click", () => {
                // Se já confirmou, não permite trocar
                if (btnConfirmar && btnConfirmar.style.display === "none") return;

                document.querySelectorAll(".solver-alt-btn").forEach((b) => b.classList.remove("selected"));
                btn.classList.add("selected");
                alternativaSelecionadaIndex = index;

                if (btnConfirmar) {
                    btnConfirmar.disabled = false;
                }
            });

            alternativasContainer.appendChild(btn);
        });
    }

    area.style.display = "block";
    area.scrollIntoView({ behavior: "smooth", block: "start" });
}

function confirmarRespostaExercicio() {
    if (!questaoAtualResolucao || alternativaSelecionadaIndex === null) return;

    const acertou = alternativaSelecionadaIndex === questaoAtualResolucao.resposta;

    // Registrar no histórico de exercícios
    exercicios.push({
        id: Date.now(),
        materia: questaoAtualResolucao.materia,
        topico: questaoAtualResolucao.topico || "",
        pergunta: questaoAtualResolucao.pergunta,
        acertou: acertou,
        respostaDada: alternativaSelecionadaIndex,
        respostaCorreta: questaoAtualResolucao.resposta,
        data: new Date().toISOString()
    });
    salvarDados();

    // Atualizar visual das alternativas
    const botoes = document.querySelectorAll(".solver-alt-btn");
    botoes.forEach((btn, index) => {
        btn.disabled = true;
        if (index === questaoAtualResolucao.resposta) {
            btn.classList.add("correct");
        } else if (index === alternativaSelecionadaIndex) {
            btn.classList.add("wrong");
        }
    });

    // Exibir feedback e explicação
    const feedbackArea = document.getElementById("solver-feedback");
    const banner = document.getElementById("solver-feedback-banner");
    const explicacaoTexto = document.getElementById("solver-explicacao-texto");
    const btnConfirmar = document.getElementById("btn-solver-confirmar");
    const btnProximo = document.getElementById("btn-solver-proximo");

    if (banner) {
        banner.className = `solver-feedback-banner ${acertou ? "correct" : "wrong"}`;
        banner.innerHTML = acertou
            ? `<i class="fa-solid fa-circle-check"></i> Parabéns! Você acertou a questão.`
            : `<i class="fa-solid fa-circle-xmark"></i> Resposta incorreta. A alternativa correta era a ${String.fromCharCode(65 + questaoAtualResolucao.resposta)}.`;
    }

    if (explicacaoTexto) {
        explicacaoTexto.textContent =
            questaoAtualResolucao.explicacao ||
            "Revise este tópico e continue praticando para consolidar o conhecimento.";
    }

    if (feedbackArea) feedbackArea.style.display = "flex";
    if (btnConfirmar) btnConfirmar.style.display = "none";
    if (btnProximo) btnProximo.style.display = "inline-flex";

    renderizarExercicios();
    renderizarDashboard();
    renderizarDesempenho();

    mostrarToast(
        acertou ? "Resposta correta! 🎉" : "Resposta incorreta. Continue praticando!",
        acertou ? "success" : "error"
    );
}

function renderizarExercicios() {
    const totalResolvidas = exercicios.length;
    const acertos = exercicios.filter((e) => e.acertou).length;
    const erros = totalResolvidas - acertos;
    const taxa = totalResolvidas > 0 ? Math.round((acertos / totalResolvidas) * 100) : 0;

    definirTexto("questoes-resolvidas", totalResolvidas);
    definirTexto("questoes-acertos", acertos);
    definirTexto("questoes-erros", erros);
    definirTexto("questoes-porcentagem", taxa + "%");

    renderizarCategoriasExercicios();
    renderizarHistoricoExercicios();
}

function renderizarCategoriasExercicios() {
    const container = document.getElementById("categorias-exercicios");
    if (!container) return;

    // Coletar matérias existentes em matérias e nas questões
    const todasMaterias = new Set(["todos"]);
    bancoQuestoesPadrao.forEach((q) => todasMaterias.add(q.materia));
    questoesCustom.forEach((q) => todasMaterias.add(q.materia));
    materias.forEach((m) => todasMaterias.add(m));

    container.innerHTML = "";

    todasMaterias.forEach((cat) => {
        const btn = document.createElement("button");
        const isActive = filtroExercicios.toLowerCase() === cat.toLowerCase();
        btn.className = `exercise-category ${isActive ? "active" : ""}`;
        btn.dataset.category = cat.toLowerCase();

        let icone = "fa-layer-group";
        if (cat.toLowerCase().includes("matem")) icone = "fa-calculator";
        else if (cat.toLowerCase().includes("lingua") || cat.toLowerCase().includes("port")) icone = "fa-language";
        else if (cat.toLowerCase().includes("natur") || cat.toLowerCase().includes("fís") || cat.toLowerCase().includes("quím") || cat.toLowerCase().includes("bio")) icone = "fa-flask";
        else if (cat.toLowerCase().includes("human") || cat.toLowerCase().includes("hist") || cat.toLowerCase().includes("geog")) icone = "fa-earth-americas";
        else if (cat.toLowerCase().includes("prog") || cat.toLowerCase().includes("web") || cat.toLowerCase().includes("banco") || cat.toLowerCase().includes("dados")) icone = "fa-code";

        btn.innerHTML = `<i class="fa-solid ${icone}"></i> <span>${cat === "todos" ? "Todas" : escaparHTML(cat)}</span>`;

        btn.addEventListener("click", () => {
            filtroExercicios = cat.toLowerCase();
            renderizarCategoriasExercicios();
        });

        container.appendChild(btn);
    });
}

function renderizarHistoricoExercicios() {
    const container = document.getElementById("historico-exercicios");
    if (!container) return;

    container.innerHTML = "";

    if (exercicios.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-pen-to-square"></i>
                <h4>Nenhum exercício resolvido ainda</h4>
                <p>Comece a responder questões para acompanhar seus acertos e criar seu histórico.</p>
            </div>
        `;
        return;
    }

    const lista = exercicios.slice().reverse().slice(0, 8);

    lista.forEach((item) => {
        const div = document.createElement("div");
        div.className = "exercise-history-item";
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.justifyContent = "space-between";
        div.style.padding = "10px 12px";
        div.style.background = "rgba(255, 255, 255, 0.02)";
        div.style.borderRadius = "8px";
        div.style.marginBottom = "8px";

        div.innerHTML = `
            <div style="min-width: 0; padding-right: 12px;">
                <strong style="font-size: 12px; color: var(--text-primary); display: block; margin-bottom: 2px;">
                    ${escaparHTML(item.materia)}${item.topico ? ` • ${escaparHTML(item.topico)}` : ""}
                </strong>
                <p style="font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 380px;">
                    ${escaparHTML(item.pergunta)}
                </p>
                <small style="color: var(--text-muted); font-size: 9px;">${formatarData(item.data)}</small>
            </div>
            <span class="${item.acertou ? "badge-baixa" : "badge-alta"}" style="padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 10px; white-space: nowrap;">
                ${item.acertou ? '<i class="fa-solid fa-check"></i> Acertou' : '<i class="fa-solid fa-xmark"></i> Errou'}
            </span>
        `;
        container.appendChild(div);
    });
}

// ==========================================
// PLANEJAMENTO & CALENDÁRIO MODERNO
// ==========================================
function configurarCalendario() {
    const anterior = document.getElementById("calendar-prev");
    const proximo = document.getElementById("calendar-next");

    if (anterior) {
        anterior.addEventListener("click", () => {
            calendarioMes--;
            if (calendarioMes < 0) {
                calendarioMes = 11;
                calendarioAno--;
            }
            renderizarCalendarioCompleto();
        });
    }

    if (proximo) {
        proximo.addEventListener("click", () => {
            calendarioMes++;
            if (calendarioMes > 11) {
                calendarioMes = 0;
                calendarioAno++;
            }
            renderizarCalendarioCompleto();
        });
    }
}

function renderizarPlanejamento() {
    renderizarCalendarioCompleto();
    renderizarTarefasDoDia();
}

function renderizarCalendarioCompleto() {
    const grid = document.getElementById("full-calendar-grid");
    if (!grid) return;

    const titulo = document.getElementById("calendar-month-title");
    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    if (titulo) {
        titulo.textContent = `${nomesMeses[calendarioMes]} ${calendarioAno}`;
    }

    grid.innerHTML = "";

    const primeiroDiaSemana = new Date(calendarioAno, calendarioMes, 1).getDay();
    const quantidadeDias = new Date(calendarioAno, calendarioMes + 1, 0).getDate();

    // Espaços vazios antes do dia 1
    for (let i = 0; i < primeiroDiaSemana; i++) {
        const vazio = document.createElement("div");
        vazio.className = "calendar-empty";
        grid.appendChild(vazio);
    }

    const hojeStr = dataHoje();

    // Renderizar dias do mês como botões estilizados no tema escuro
    for (let dia = 1; dia <= quantidadeDias; dia++) {
        const dataStr = criarDataString(calendarioAno, calendarioMes, dia);
        const tarefasDia = tarefas.filter((t) => t.data === dataStr);

        const btnDia = document.createElement("button");
        btnDia.type = "button";
        btnDia.className = "calendar-day";

        if (dataStr === diaSelecionado) {
            btnDia.classList.add("selected");
        }
        if (dataStr === hojeStr) {
            btnDia.classList.add("today");
        }

        let tagsHtml = "";
        if (tarefasDia.length > 0) {
            const preview = tarefasDia.slice(0, 2);
            tagsHtml = `
                <div class="calendar-day-tasks">
                    ${preview
                        .map(
                            (t) => `
                        <span class="calendar-task-tag ${t.prioridade}">
                            ${escaparHTML(t.titulo)}
                        </span>
                    `
                        )
                        .join("")}
                </div>
            `;
        }

        btnDia.innerHTML = `
            <div class="calendar-day-header">
                <span class="calendar-day-num">${dia}</span>
                ${
                    tarefasDia.length > 0
                        ? `<span class="calendar-day-badge">${tarefasDia.length}</span>`
                        : ""
                }
            </div>
            ${tagsHtml}
        `;

        btnDia.addEventListener("click", () => {
            diaSelecionado = dataStr;
            renderizarCalendarioCompleto();
            renderizarTarefasDoDia();
        });

        grid.appendChild(btnDia);
    }
}

function renderizarTarefasDoDia() {
    const container = document.getElementById("day-tasks-list");
    if (!container) return;

    const lista = tarefas
        .filter((t) => t.data === diaSelecionado)
        .sort((a, b) => prioridadeNumero(b.prioridade) - prioridadeNumero(a.prioridade));

    container.innerHTML = "";

    const cabecalhoDia = document.createElement("div");
    cabecalhoDia.style.marginBottom = "14px";
    cabecalhoDia.style.display = "flex";
    cabecalhoDia.style.alignItems = "center";
    cabecalhoDia.style.justifyContent = "space-between";
    cabecalhoDia.innerHTML = `
        <span style="font-size: 12px; color: var(--cyan); font-weight: 700;">
            <i class="fa-regular fa-calendar-check"></i> ${formatarData(diaSelecionado)}
        </span>
        <button
            class="text-button"
            onclick="abrirModalNovaTarefa('${diaSelecionado}')"
            title="Adicionar tarefa para este dia"
        >
            <i class="fa-solid fa-plus"></i> Adicionar
        </button>
    `;
    container.appendChild(cabecalhoDia);

    if (lista.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.innerHTML = `
            <i class="fa-regular fa-calendar-xmark"></i>
            <h4>Nenhuma tarefa para este dia</h4>
            <p>Clique em "+ Adicionar" acima para planejar seus estudos nesta data.</p>
        `;
        container.appendChild(empty);
        return;
    }

    lista.forEach((tarefa) => {
        container.appendChild(criarCardTarefa(tarefa));
    });
}

// ==========================================
// MODO FOCO (DURAÇÃO PERSONALIZADA & HISTÓRICO)
// ==========================================
function configurarFoco() {
    // Presets 25, 50, 90
    document.querySelectorAll("[data-minutes]").forEach((botao) => {
        botao.addEventListener("click", () => {
            const minutos = Number(botao.dataset.minutes);
            duracaoFocoAtual = minutos * 60;
            tempoRestante = duracaoFocoAtual;

            pararTimer();
            atualizarTimerDisplay();

            document.querySelectorAll("[data-minutes]").forEach((b) => b.classList.remove("active"));
            botao.classList.add("active");

            const customInput = document.getElementById("focus-custom-min");
            if (customInput) customInput.value = "";
        });
    });

    // Duração Personalizada
    const btnAplicarCustom = document.getElementById("btn-aplicar-foco-custom");
    const inputCustom = document.getElementById("focus-custom-min");

    if (btnAplicarCustom && inputCustom) {
        btnAplicarCustom.addEventListener("click", () => {
            const minutos = parseInt(inputCustom.value, 10);
            if (isNaN(minutos) || minutos <= 0 || minutos > 300) {
                mostrarToast("Informe uma duração válida entre 1 e 300 minutos.", "error");
                return;
            }

            duracaoFocoAtual = minutos * 60;
            tempoRestante = duracaoFocoAtual;

            pararTimer();
            atualizarTimerDisplay();

            document.querySelectorAll("[data-minutes]").forEach((b) => b.classList.remove("active"));
            mostrarToast(`Duração definida para ${minutos} minutos!`, "success");
        });
    }

    // Iniciar / Pausar
    const btnIniciar = document.getElementById("focus-start");
    if (btnIniciar) {
        btnIniciar.addEventListener("click", () => {
            if (timerRodando) {
                pararTimer();
            } else {
                iniciarTimer();
            }
        });
    }

    // Reiniciar (Respeita a duração selecionada pelo usuário!)
    const btnReset = document.getElementById("focus-reset");
    if (btnReset) {
        btnReset.addEventListener("click", () => {
            pararTimer();
            tempoRestante = duracaoFocoAtual;
            atualizarTimerDisplay();
            mostrarToast("Temporizador reiniciado.");
        });
    }

    atualizarTimerDisplay();
}

function iniciarTimer() {
    if (timerRodando) return;
    timerRodando = true;
    atualizarStatusFoco();

    timerInterval = setInterval(() => {
        tempoRestante--;
        atualizarTimerDisplay();

        if (tempoRestante <= 0) {
            finalizarSessaoFoco();
        }
    }, 1000);
}

function pararTimer() {
    timerRodando = false;
    clearInterval(timerInterval);
    timerInterval = null;
    atualizarStatusFoco();
}

function finalizarSessaoFoco() {
    pararTimer();

    // Duração real em minutos estudada
    const minutosReais = Math.max(1, Math.round(duracaoFocoAtual / 60));

    sessoesFoco.push({
        id: Date.now(),
        minutos: minutosReais,
        data: new Date().toISOString()
    });
    salvarDados();

    tempoRestante = duracaoFocoAtual;
    atualizarTimerDisplay();

    renderizarDashboard();
    renderizarDesempenho();

    mostrarToast(`Sessão de foco de ${minutosReais} minutos concluída com sucesso! 🎯`, "success");
}

function atualizarTimerDisplay() {
    const timerElem = document.getElementById("focus-timer");
    if (!timerElem) return;

    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;

    timerElem.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    atualizarStatusFoco();
}

function atualizarStatusFoco() {
    const status = document.getElementById("focus-status");
    const botao = document.getElementById("focus-start");

    if (status) {
        status.textContent = timerRodando ? "Modo foco ativo! Concentração total..." : "Pronto para começar?";
    }

    if (botao) {
        botao.innerHTML = timerRodando
            ? '<i class="fa-solid fa-pause"></i> Pausar'
            : '<i class="fa-solid fa-play"></i> Começar';
    }
}

// ==========================================
// DESEMPENHO (INDICADORES REAIS & EVOLUÇÃO)
// ==========================================
function renderizarDesempenho() {
    const horas = calcularHorasEstudadas();
    const concluidasTarefas = tarefas.filter((t) => t.concluida).length;
    const concluidasAulas = aulas.filter((a) => a.concluida).length;

    const acertos = exercicios.filter((e) => e.acertou).length;
    const taxa = exercicios.length > 0 ? Math.round((acertos / exercicios.length) * 100) : 0;

    definirTexto("performance-horas", formatarHorasMinutos(horas * 60));
    definirTexto("performance-tarefas", `${concluidasTarefas} de ${tarefas.length}`);
    definirTexto("performance-aulas", concluidasAulas);
    definirTexto("performance-taxa", `${taxa}% (${acertos}/${exercicios.length})`);

    renderizarEvolucaoSemanal();
    renderizarProgressoMaterias();
    renderizarHistoricoSessoesFoco();
    renderizarAtividadeRecente();
}

function renderizarEvolucaoSemanal() {
    const container = document.getElementById("desempenho-semanal");
    if (!container) return;

    container.innerHTML = "";

    const diasSemanaNomes = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const hoje = new Date();
    const diasGrafico = [];

    // Gerar últimos 7 dias cronológicos
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(hoje.getDate() - i);
        const dataStr = d.toISOString().split("T")[0];
        const nomeDia = diasSemanaNomes[d.getDay()];

        // Minutos de foco deste dia
        const minutosFocoDia = sessoesFoco
            .filter((s) => s.data && s.data.split("T")[0] === dataStr)
            .reduce((total, s) => total + (Number(s.minutos) || 0), 0);

        // Tarefas concluídas neste dia
        const tarefasDia = tarefas.filter((t) => t.concluida && t.data === dataStr).length;

        // Total de "pontos" de esforço para altura da barra
        const pontuacao = minutosFocoDia + tarefasDia * 20;

        diasGrafico.push({
            dataStr: dataStr,
            nomeDia: nomeDia,
            minutosFoco: minutosFocoDia,
            tarefas: tarefasDia,
            pontuacao: pontuacao,
            isHoje: dataStr === dataHoje()
        });
    }

    const maxPontos = Math.max(60, ...diasGrafico.map((d) => d.pontuacao));

    diasGrafico.forEach((item) => {
        const col = document.createElement("div");
        col.className = "weekly-bar-col";

        const alturaPercent = Math.max(6, Math.min(100, Math.round((item.pontuacao / maxPontos) * 100)));

        col.innerHTML = `
            <span class="weekly-bar-value">${item.minutosFoco}m</span>
            <div class="weekly-bar-container">
                <div class="weekly-bar-fill ${item.isHoje ? "active" : ""}" style="height: ${alturaPercent}%"></div>
            </div>
            <span class="weekly-bar-day ${item.isHoje ? "today" : ""}">${item.nomeDia}</span>
        `;
        container.appendChild(col);
    });
}

function renderizarProgressoMaterias() {
    const container = document.getElementById("materias-performance");
    if (!container) return;

    container.innerHTML = "";

    if (materias.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-book"></i>
                <h4>Nenhuma matéria cadastrada</h4>
                <p>Cadastre suas matérias para visualizar seu progresso e evolução detalhada.</p>
            </div>
        `;
        return;
    }

    materias.forEach((materia) => {
        const tarefasMateria = tarefas.filter((t) => t.materia === materia);
        const tarefasConcluidas = tarefasMateria.filter((t) => t.concluida).length;

        const aulasMateria = aulas.filter((a) => a.materia === materia);
        const aulasConcluidas = aulasMateria.filter((a) => a.concluida).length;

        const questoesMateria = exercicios.filter((e) => e.materia === materia);
        const questoesAcertos = questoesMateria.filter((e) => e.acertou).length;
        const taxaQuestoes = questoesMateria.length > 0 ? Math.round((questoesAcertos / questoesMateria.length) * 100) : 0;

        // Minutos de aula concluídas nesta matéria
        const minutosAulas = aulasMateria
            .filter((a) => a.concluida)
            .reduce((acc, a) => acc + (Number(a.duracao) || 0), 0);

        // Progresso geral da matéria
        let itensTotais = tarefasMateria.length + aulasMateria.length;
        let itensConcluidos = tarefasConcluidas + aulasConcluidas;
        let progressoGeral = itensTotais > 0 ? Math.round((itensConcluidos / itensTotais) * 100) : 0;

        const card = document.createElement("div");
        card.className = "subject-perf-card";
        card.innerHTML = `
            <div class="subject-perf-top">
                <strong>${escaparHTML(materia)}</strong>
                <span>${progressoGeral}% concluído</span>
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${progressoGeral}%"></div>
            </div>
            <div class="subject-perf-details">
                <span><i class="fa-solid fa-list-check"></i> ${tarefasConcluidas}/${tarefasMateria.length} tarefas</span>
                <span><i class="fa-solid fa-video"></i> ${aulasConcluidas}/${aulasMateria.length} aulas (${minutosAulas}m)</span>
                <span><i class="fa-solid fa-bullseye"></i> ${taxaQuestoes}% de acerto (${questoesAcertos}/${questoesMateria.length})</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderizarHistoricoSessoesFoco() {
    const container = document.getElementById("historico-sessoes-foco");
    if (!container) return;

    container.innerHTML = "";

    if (sessoesFoco.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-stopwatch"></i>
                <h4>Nenhuma sessão de foco realizada</h4>
                <p>Inicie e complete sessões no 'Modo Foco' para registrar suas horas de estudo concentrado.</p>
            </div>
        `;
        return;
    }

    const lista = document.createElement("div");
    lista.className = "focus-history-list";

    sessoesFoco
        .slice()
        .reverse()
        .slice(0, 6)
        .forEach((sessao) => {
            const dataObj = new Date(sessao.data);
            const horaStr = !isNaN(dataObj.getTime())
                ? dataObj.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
                : "--:--";

            const row = document.createElement("div");
            row.className = "focus-history-item";
            row.innerHTML = `
                <div class="focus-history-item-left">
                    <div class="focus-history-icon">
                        <i class="fa-solid fa-fire"></i>
                    </div>
                    <div>
                        <strong class="focus-history-duration">${sessao.minutos || 25} minutos de foco</strong>
                        <div style="font-size: 10px; color: var(--text-muted);">
                            ${formatarData(sessao.data)} às ${horaStr}
                        </div>
                    </div>
                </div>
                <span class="badge-baixa" style="padding: 4px 8px; border-radius: 6px; font-weight: 700;">
                    Concluída
                </span>
            `;
            lista.appendChild(row);
        });

    container.appendChild(lista);
}

function renderizarAtividadeRecente() {
    const container = document.getElementById("atividade-recente");
    if (!container) return;

    container.innerHTML = "";
    const atividades = [];

    tarefas.forEach((t) => {
        if (t.concluida) {
            atividades.push({
                tipo: "Tarefa Concluída",
                icone: "fa-list-check",
                cor: "var(--success)",
                texto: t.titulo,
                materia: t.materia,
                data: t.data || t.criadaEm
            });
        }
    });

    aulas.forEach((a) => {
        if (a.concluida) {
            atividades.push({
                tipo: "Aula Finalizada",
                icone: "fa-video",
                cor: "var(--cyan)",
                texto: a.titulo,
                materia: a.materia,
                data: a.data || a.criadaEm
            });
        }
    });

    exercicios.forEach((e) => {
        atividades.push({
            tipo: e.acertou ? "Questão Correta" : "Questão Incorreta",
            icone: e.acertou ? "fa-circle-check" : "fa-circle-xmark",
            cor: e.acertou ? "var(--success)" : "var(--danger)",
            texto: e.pergunta,
            materia: e.materia,
            data: e.data
        });
    });

    sessoesFoco.forEach((s) => {
        atividades.push({
            tipo: "Sessão de Foco",
            icone: "fa-stopwatch",
            cor: "var(--orange)",
            texto: `${s.minutos || 25} minutos de foco concentrado`,
            materia: "Estudo Geral",
            data: s.data
        });
    });

    if (atividades.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-clock"></i>
                <h4>Nenhuma atividade recente</h4>
                <p>Conclua tarefas, assista aulas e resolva exercícios para visualizar seu histórico de atividades.</p>
            </div>
        `;
        return;
    }

    atividades
        .sort((a, b) => new Date(b.data) - new Date(a.data))
        .slice(0, 8)
        .forEach((item) => {
            const div = document.createElement("div");
            div.className = "dashboard-task-item";
            div.style.marginBottom = "8px";
            div.innerHTML = `
                <div class="dashboard-task-check" style="color: ${item.cor}; background: rgba(255, 255, 255, 0.03);">
                    <i class="fa-solid ${item.icone}"></i>
                </div>
                <div class="dashboard-task-info">
                    <strong>${escaparHTML(item.tipo)}: ${escaparHTML(item.texto)}</strong>
                    <span>${escaparHTML(item.materia)} • ${formatarData(item.data)}</span>
                </div>
            `;
            container.appendChild(div);
        });
}

// ==========================================
// MATÉRIAS (GERENCIAMENTO)
// ==========================================
function configurarMaterias() {
    const form = document.getElementById("form-materia");
    if (form) {
        form.addEventListener("submit", adicionarMateria);
    }
}

function adicionarMateria(evento) {
    evento.preventDefault();
    const input = document.getElementById("nova-materia");
    if (!input) return;

    const nome = input.value.trim();
    if (!nome) return;

    const existe = materias.some((m) => m.toLowerCase() === nome.toLowerCase());
    if (existe) {
        mostrarToast("Essa matéria já está cadastrada.", "error");
        return;
    }

    materias.push(nome);
    salvarDados();

    input.value = "";
    renderizarMateriasPagina();
    atualizarSelectMaterias();
    mostrarToast("Matéria cadastrada com sucesso!", "success");
}

function removerMateria(index) {
    if (!materias[index]) return;

    const materia = materias[index];
    if (!confirm(`Deseja realmente remover a matéria "${materia}"? As tarefas associadas serão mantidas.`)) {
        return;
    }

    materias.splice(index, 1);
    salvarDados();

    renderizarMateriasPagina();
    atualizarSelectMaterias();
    renderizarDashboard();
    renderizarDesempenho();

    mostrarToast("Matéria removida.");
}
window.removerMateria = removerMateria;

function renderizarMateriasPagina() {
    const container = document.getElementById("materias-grid");
    if (!container) return;

    container.innerHTML = "";

    if (materias.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fa-solid fa-book"></i>
                <h4>Nenhuma matéria cadastrada</h4>
                <p>Adicione matérias no formulário acima para organizar suas tarefas e videoaulas.</p>
            </div>
        `;
        return;
    }

    materias.forEach((materia, index) => {
        const tarefasMateria = tarefas.filter((t) => t.materia === materia);
        const concluidas = tarefasMateria.filter((t) => t.concluida).length;
        const progresso = tarefasMateria.length > 0 ? Math.round((concluidas / tarefasMateria.length) * 100) : 0;

        const card = document.createElement("div");
        card.className = "subject-card";
        card.innerHTML = `
            <div class="subject-icon">
                <i class="fa-solid fa-book-open"></i>
            </div>
            <div class="subject-info">
                <h3>${escaparHTML(materia)}</h3>
                <p>${tarefasMateria.length} tarefa(s) cadastrada(s)</p>
                <div class="progress-bar-bg" style="margin-top: 10px;">
                    <div class="progress-bar-fill" style="width: ${progresso}%"></div>
                </div>
                <small style="color: var(--text-muted); font-size: 10px; margin-top: 4px; display: block;">
                    ${progresso}% concluído
                </small>
            </div>
            <button
                type="button"
                class="btn-icon-action delete"
                onclick="removerMateria(${index})"
                title="Excluir matéria"
                style="position: absolute; top: 14px; right: 14px;"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        container.appendChild(card);
    });
}

function atualizarSelectMaterias() {
    const selects = [
        document.getElementById("tarefa-materia"),
        document.getElementById("aula-materia"),
        document.getElementById("questao-materia")
    ];

    selects.forEach((select) => {
        if (!select) return;
        const valorAtual = select.value;

        select.innerHTML = `<option value="" disabled selected>Selecione uma matéria...</option>`;

        materias.forEach((materia) => {
            const option = document.createElement("option");
            option.value = materia;
            option.textContent = materia;
            select.appendChild(option);
        });

        if (materias.includes(valorAtual)) {
            select.value = valorAtual;
        }
    });
}

// ==========================================
// METAS
// ==========================================
function renderizarMetas() {
    const concluidas = tarefas.filter((t) => t.concluida).length;
    const progresso = Math.min(100, Math.round((concluidas / metaSemanal) * 100));

    definirTexto("goal-current", concluidas);
    definirTexto("goal-target", metaSemanal);

    const barra = document.getElementById("goal-progress");
    if (barra) {
        barra.style.width = progresso + "%";
    }

    atualizarMetaSidebar();
}

// ==========================================
// NOTIFICAÇÕES
// ==========================================
function configurarNotificacoes() {
    const botao = document.getElementById("notification-btn");
    const painel = document.getElementById("notification-panel");
    const fechar = document.getElementById("close-notifications");

    if (botao && painel) {
        botao.addEventListener("click", () => {
            painel.classList.toggle("open");
            renderizarNotificacoes();
        });
    }

    if (fechar && painel) {
        fechar.addEventListener("click", () => {
            painel.classList.remove("open");
        });
    }
}

function renderizarNotificacoes() {
    const container = document.getElementById("notification-list");
    if (!container) return;

    const hoje = dataHoje();
    const tarefasHoje = tarefas.filter((t) => t.data === hoje && !t.concluida);
    const pendentes = tarefas.filter((t) => !t.concluida).length;

    container.innerHTML = "";

    if (tarefasHoje.length === 0 && pendentes === 0) {
        container.innerHTML = `
            <div class="empty-state small">
                <i class="fa-regular fa-bell"></i>
                <p>Nenhuma notificação pendente no momento.</p>
            </div>
        `;
        return;
    }

    if (tarefasHoje.length > 0) {
        container.innerHTML += `
            <div class="dashboard-task-item" style="margin-bottom: 8px;">
                <div class="dashboard-task-check" style="color: var(--warning); background: rgba(255, 189, 0, 0.1);">
                    <i class="fa-solid fa-calendar-day"></i>
                </div>
                <div class="dashboard-task-info">
                    <strong>Tarefas para hoje!</strong>
                    <span>Você tem ${tarefasHoje.length} tarefa(s) para entregar hoje.</span>
                </div>
            </div>
        `;
    }

    if (pendentes > 0) {
        container.innerHTML += `
            <div class="dashboard-task-item">
                <div class="dashboard-task-check" style="color: var(--cyan); background: rgba(0, 245, 212, 0.1);">
                    <i class="fa-solid fa-list-check"></i>
                </div>
                <div class="dashboard-task-info">
                    <strong>Estudos em andamento</strong>
                    <span>Você tem um total de ${pendentes} tarefa(s) pendente(s).</span>
                </div>
            </div>
        `;
    }
}

// ==========================================
// CONFIGURAÇÕES
// ==========================================
function configurarConfiguracoes() {
    const btnLimpar = document.getElementById("btn-limpar-dados");
    if (btnLimpar) {
        btnLimpar.addEventListener("click", () => {
            if (!confirm("Tem certeza que deseja apagar os dados do StudyFlow neste dispositivo?")) {
                return;
            }

            localStorage.removeItem("studyflow_materias");
            localStorage.removeItem("studyflow_tarefas");
            localStorage.removeItem("studyflow_aulas");
            localStorage.removeItem("studyflow_exercicios");
            localStorage.removeItem("studyflow_questoes_custom");
            localStorage.removeItem("studyflow_sessoes");
            localStorage.removeItem("studyflow_meta");

            location.reload();
        });
    }
}

// ==========================================
// FUNÇÕES UTILITÁRIAS
// ==========================================
function definirTexto(id, valor) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.textContent = valor;
    }
}

function escaparHTML(texto) {
    if (texto === undefined || texto === null) return "";
    return String(texto)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function escaparURL(url) {
    try {
        const u = new URL(url, window.location.href);
        if (u.protocol === "http:" || u.protocol === "https:") {
            return escaparHTML(u.href);
        }
    } catch (e) {
        return "#";
    }
    return "#";
}

function formatarData(data) {
    if (!data) return "-";
    const partes = String(data).split("-");
    if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    const d = new Date(data);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("pt-BR");
}

function formatarPrioridade(p) {
    const valores = {
        baixa: "Baixa",
        media: "Média",
        alta: "Alta"
    };
    return valores[p] || "Média";
}

function prioridadeNumero(p) {
    const valores = {
        baixa: 1,
        media: 2,
        alta: 3
    };
    return valores[p] || 1;
}

function dataHoje() {
    const agora = new Date();
    return criarDataString(agora.getFullYear(), agora.getMonth(), agora.getDate());
}

function criarDataString(ano, mes, dia) {
    return `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}

function calcularHorasEstudadas() {
    const minutosFoco = sessoesFoco.reduce((acc, s) => acc + (Number(s.minutos) || 0), 0);
    const minutosAulas = aulas
        .filter((a) => a.concluida)
        .reduce((acc, a) => acc + (Number(a.duracao) || 0), 0);
    return (minutosFoco + minutosAulas) / 60;
}

function formatarHorasMinutos(minutosTotais) {
    const mins = Math.round(minutosTotais);
    if (mins <= 0) return "0h";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}min`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
}

function calcularSequencia() {
    const diasComEstudo = new Set();

    tarefas.forEach((t) => {
        if (t.concluida && t.data) diasComEstudo.add(t.data);
    });

    sessoesFoco.forEach((s) => {
        if (s.data) diasComEstudo.add(s.data.split("T")[0]);
    });

    aulas.forEach((a) => {
        if (a.concluida && a.data) diasComEstudo.add(a.data);
    });

    exercicios.forEach((e) => {
        if (e.data) diasComEstudo.add(e.data.split("T")[0]);
    });

    let sequencia = 0;
    const d = new Date();

    while (true) {
        const chave = d.toISOString().split("T")[0];
        if (diasComEstudo.has(chave)) {
            sequencia++;
            d.setDate(d.getDate() - 1);
        } else {
            // Se hoje ainda não tem registro, checar a partir de ontem
            if (sequencia === 0) {
                d.setDate(d.getDate() - 1);
                const chaveOntem = d.toISOString().split("T")[0];
                if (diasComEstudo.has(chaveOntem)) {
                    sequencia++;
                    d.setDate(d.getDate() - 1);
                    continue;
                }
            }
            break;
        }
    }

    return sequencia;
}

// Atalho Ctrl+K para pesquisar
document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const input = document.getElementById("search-input");
        if (input) input.focus();
    }
});

// Atualização de relógio e data
setInterval(() => {
    atualizarData();
    if (paginaAtual === "planejamento") {
        renderizarCalendarioCompleto();
    }
}, 60000);

console.log("StudyFlow inicializado com sucesso.");
