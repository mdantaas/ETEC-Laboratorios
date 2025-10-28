// Dados simulados
let currentUser = null;

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Inicializa a aplicação
function initializeApp() {
    setupLoginForm();
    setupModalListeners();
    renderAgendamentos();
    renderMateriais();
    renderKits();
    renderUsuarios();
}

// Configuração do formulário de login
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// Manipula o login
function handleLogin(e) {
    e.preventDefault();
    
    const profile = document.getElementById('userProfile').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validação simples (em produção, isso seria feito no backend)
    if (username && password && profile) {
        currentUser = {
            name: username,
            profile: profile
        };
        
        // Esconde tela de login
        document.getElementById('loginScreen').style.display = 'none';
        
        // Mostra dashboard
        document.getElementById('dashboardScreen').classList.add('active');
        
        // Atualiza nome do usuário
        document.getElementById('userNameDisplay').textContent = username;
        
        // Esconder tab de usuários se não for admin
        if (profile !== 'admin') {
            const tabUsuarios = document.getElementById('tabUsuarios');
            const sectionUsuarios = document.getElementById('section-usuarios');
            
            if (tabUsuarios) tabUsuarios.style.display = 'none';
            if (sectionUsuarios) sectionUsuarios.style.display = 'none';
        }
        
        // Atualiza mensagem de boas-vindas
        updateWelcomeMessage(profile, username);
        
        // Limpa mensagem de erro
        hideLoginError();
    } else {
        showLoginError('Por favor, preencha todos os campos');
    }
}

// Mostra erro de login
function showLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }
}

// Esconde erro de login
function hideLoginError() {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.classList.add('hidden');
    }
}

// Atualiza mensagem de boas-vindas baseada no perfil
function updateWelcomeMessage(profile, name) {
    const messages = {
        'admin': `Olá ${name}, você está logado como Administrador`,
        'tecnico': `Olá ${name}, bem-vindo ao painel do Técnico`,
        'professor': `Olá ${name}, organize suas aulas práticas`
    };
    
    const welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg) {
        welcomeMsg.textContent = messages[profile] || 'Bem-vindo ao sistema';
    }
}

// Função de logout
function logout() {
    if (confirm('Deseja realmente sair?')) {
        currentUser = null;
        
        // Esconde dashboard
        document.getElementById('dashboardScreen').classList.remove('active');
        
        // Mostra tela de login
        document.getElementById('loginScreen').style.display = 'flex';
        
        // Reseta formulário
        const loginForm = document.getElementById('loginForm');
        if (loginForm) loginForm.reset();
        
        // Esconde mensagem de erro
        hideLoginError();
    }
}

// Navegação por Tabs
function showTab(tabName) {
    // Remove active de todas as tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active de todas as seções
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Ativa a tab clicada
    event.target.classList.add('active');
    
    // Ativa a seção correspondente
    const section = document.getElementById('section-' + tabName);
    if (section) {
        section.classList.add('active');
    }
}

// Modais
function openModal(modalName) {
    const modal = document.getElementById('modal' + capitalizeFirst(modalName));
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalName) {
    const modal = document.getElementById('modal' + capitalizeFirst(modalName));
    if (modal) {
        modal.classList.remove('active');
    }
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Configuração dos listeners dos modais
function setupModalListeners() {
    // Fechar modal ao clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

// ========== FUNÇÕES DE GERENCIAMENTO DE DADOS ==========

// Simulação de dados de agendamentos
const agendamentosData = [
    {
        id: 1,
        data: '2025-10-25',
        hora: '14:00',
        laboratorio: 'Lab 1',
        professor: 'Maria Silva',
        kit: 'Neutralização Ácido-Base',
        status: 'separado'
    },
    {
        id: 2,
        data: '2025-10-26',
        hora: '10:00',
        laboratorio: 'Lab 2',
        professor: 'João Santos',
        kit: 'Reações Orgânicas',
        status: 'pendente'
    },
    {
        id: 3,
        data: '2025-10-27',
        hora: '15:00',
        laboratorio: 'Lab 3',
        professor: 'Ana Costa',
        kit: 'Titulação',
        status: 'pendente'
    }
];

// Simulação de dados de materiais
const materiaisData = [
    {
        id: 1,
        nome: 'Ácido Clorídrico',
        categoria: 'Reagente',
        quantidade: 15,
        unidade: 'L',
        minimoEstoque: 5
    },
    {
        id: 2,
        nome: 'Béquer 250ml',
        categoria: 'Vidraria',
        quantidade: 5,
        unidade: 'unid',
        minimoEstoque: 10
    },
    {
        id: 3,
        nome: 'Hidróxido de Sódio',
        categoria: 'Reagente',
        quantidade: 20,
        unidade: 'kg',
        minimoEstoque: 5
    },
    {
        id: 4,
        nome: 'Pipeta 10ml',
        categoria: 'Vidraria',
        quantidade: 25,
        unidade: 'unid',
        minimoEstoque: 15
    }
];

// Simulação de dados de kits
const kitsData = [
    {
        id: 1,
        nome: 'Neutralização Ácido-Base',
        criadoPor: 'Maria Silva',
        numeroItens: 8,
        vezesUsado: 12,
        materiais: [
            { nome: 'Ácido Clorídrico', quantidade: 100, unidade: 'ml' },
            { nome: 'Hidróxido de Sódio', quantidade: 50, unidade: 'g' },
            { nome: 'Béquer 250ml', quantidade: 2, unidade: 'unid' }
        ]
    },
    {
        id: 2,
        nome: 'Reações Orgânicas',
        criadoPor: 'João Santos',
        numeroItens: 6,
        vezesUsado: 8,
        materiais: [
            { nome: 'Álcool Etílico', quantidade: 200, unidade: 'ml' },
            { nome: 'Pipeta 10ml', quantidade: 3, unidade: 'unid' }
        ]
    }
];

// Simulação de dados de usuários
const usuariosData = [
    {
        id: 1,
        nome: 'Maria Silva',
        email: 'maria.silva@etec.sp.gov.br',
        perfil: 'Professor',
        status: 'ativo'
    },
    {
        id: 2,
        nome: 'João Santos',
        email: 'joao.santos@etec.sp.gov.br',
        perfil: 'Professor',
        status: 'ativo'
    },
    {
        id: 3,
        nome: 'Rafael Costa',
        email: 'rafael.costa@etec.sp.gov.br',
        perfil: 'Técnico',
        status: 'ativo'
    },
    {
        id: 4,
        nome: 'Mariana Admin',
        email: 'mariana.admin@etec.sp.gov.br',
        perfil: 'Administrador',
        status: 'ativo'
    }
];

// Função para renderizar tabela de agendamentos
function renderAgendamentos() {
    const tbody = document.getElementById('agendamentosTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    agendamentosData.forEach(agendamento => {
        const statusClass = agendamento.status === 'separado' ? 'badge-success' : 
                           agendamento.status === 'pendente' ? 'badge-warning' : 'badge-danger';
        const statusText = agendamento.status === 'separado' ? 'Separado' : 
                          agendamento.status === 'pendente' ? 'Pendente' : 'Faltando Item';
        
        const row = `
            <tr>
                <td>${formatarData(agendamento.data)} - ${agendamento.hora}</td>
                <td>${agendamento.laboratorio}</td>
                <td>${agendamento.professor}</td>
                <td>${agendamento.kit}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
                <td><button class="btn-secondary" onclick="verDetalhesAgendamento(${agendamento.id})">Ver Detalhes</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Função para renderizar tabela de materiais
function renderMateriais() {
    const tbody = document.getElementById('materiaisTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    materiaisData.forEach(material => {
        const statusClass = material.quantidade > material.minimoEstoque ? 'badge-success' : 'badge-warning';
        const statusText = material.quantidade > material.minimoEstoque ? 'OK' : 'Baixo';
        
        const row = `
            <tr>
                <td>${material.nome}</td>
                <td>${material.categoria}</td>
                <td>${material.quantidade}</td>
                <td>${material.unidade}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
                <td><button class="btn-secondary" onclick="editarMaterial(${material.id})">Editar</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Função para renderizar tabela de kits
function renderKits() {
    const tbody = document.getElementById('kitsTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    kitsData.forEach(kit => {
        const row = `
            <tr>
                <td>${kit.nome}</td>
                <td>${kit.criadoPor}</td>
                <td>${kit.numeroItens}</td>
                <td>${kit.vezesUsado} vezes</td>
                <td><button class="btn-secondary" onclick="verDetalhesKit(${kit.id})">Ver/Editar</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Função para renderizar tabela de usuários
function renderUsuarios() {
    const tbody = document.getElementById('usuariosTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    usuariosData.forEach(usuario => {
        const statusClass = usuario.status === 'ativo' ? 'badge-success' : 'badge-danger';
        const statusText = usuario.status === 'ativo' ? 'Ativo' : 'Inativo';
        
        const row = `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.perfil}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
                <td><button class="btn-secondary" onclick="editarUsuario(${usuario.id})">Editar</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Funções auxiliares
function formatarData(data) {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Funções de ação
function verDetalhesAgendamento(id) {
    const agendamento = agendamentosData.find(a => a.id === id);
    if (agendamento) {
        alert(`Detalhes do Agendamento:\n\nData: ${formatarData(agendamento.data)} às ${agendamento.hora}\nLaboratório: ${agendamento.laboratorio}\nProfessor: ${agendamento.professor}\nKit: ${agendamento.kit}\nStatus: ${agendamento.status}`);
    }
}

function editarMaterial(id) {
    const material = materiaisData.find(m => m.id === id);
    if (material) {
        const novaQtd = prompt(`Editar quantidade de ${material.nome}\nQuantidade atual: ${material.quantidade} ${material.unidade}`, material.quantidade);
        if (novaQtd !== null && !isNaN(novaQtd)) {
            material.quantidade = parseInt(novaQtd);
            renderMateriais();
            alert('Quantidade atualizada com sucesso!');
        }
    }
}

function verDetalhesKit(id) {
    const kit = kitsData.find(k => k.id === id);
    if (kit) {
        let materiaisList = kit.materiais.map(m => `- ${m.nome}: ${m.quantidade} ${m.unidade}`).join('\n');
        alert(`Detalhes do Kit: ${kit.nome}\n\nCriado por: ${kit.criadoPor}\nNúmero de itens: ${kit.numeroItens}\nUsado: ${kit.vezesUsado} vezes\n\nMateriais:\n${materiaisList}`);
    }
}

function editarUsuario(id) {
    const usuario = usuariosData.find(u => u.id === id);
    if (usuario) {
        alert(`Editar Usuário: ${usuario.nome}\nEmail: ${usuario.email}\nPerfil: ${usuario.perfil}\n\n(Funcionalidade em desenvolvimento)`);
    }
}