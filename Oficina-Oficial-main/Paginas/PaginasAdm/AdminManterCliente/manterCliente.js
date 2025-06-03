// Variáveis globais
let clientes = [];
let clienteEmEdicao = null;

// Função para abrir o modal
function abrirModal() {
    const modal = document.getElementById('modalCliente');
    const titulo = modal.querySelector('.modal-titulo');
    const form = document.getElementById('formCliente');
    
    // Resetar o formulário e o cliente em edição
    form.reset();
    clienteEmEdicao = null;
    titulo.textContent = 'Adicionar Cliente';
    
    // Limpar a lista de veículos
    document.getElementById('lista-veiculos').innerHTML = '';
    
    // Adicionar um campo de veículo vazio
    adicionarCampoVeiculo();
    
    modal.style.display = 'flex';
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('modalCliente');
    modal.style.display = 'none';
}

// Função para adicionar campo de veículo
function adicionarCampoVeiculo(placa = '', modelo = '') {
    const listaVeiculos = document.getElementById('lista-veiculos');
    const veiculoDiv = document.createElement('div');
    veiculoDiv.className = 'veiculo-campo';
    veiculoDiv.innerHTML = `
        <div class="campo-formulario">
            <input type="text" placeholder="Placa" value="${placa}" class="veiculo-placa">
            <input type="text" placeholder="Modelo" value="${modelo}" class="veiculo-modelo">
            <button type="button" class="botao-remover" onclick="removerCampoVeiculo(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    listaVeiculos.appendChild(veiculoDiv);
}

// Função para remover campo de veículo
function removerCampoVeiculo(button) {
    const veiculoDiv = button.closest('.veiculo-campo');
    veiculoDiv.remove();
}

// Função para editar cliente
function editarCliente(button) {
    const card = button.closest('.cliente-card');
    const nome = card.querySelector('h3').textContent;
    const telefone = card.querySelector('.cliente-detalhe').textContent.replace(/[^\d()-]/g, '').trim();
    const cpf = card.querySelectorAll('.cliente-detalhe')[1].textContent.replace(/[^\d.-]/g, '').trim();
    const status = card.querySelector('.status').textContent.toLowerCase();
    
    // Coletar veículos
    const veiculos = [];
    card.querySelectorAll('.veiculo-card').forEach(veiculo => {
        veiculos.push({
            placa: veiculo.querySelector('.veiculo-placa').textContent,
            modelo: veiculo.querySelector('.veiculo-detalhe').textContent
        });
    });
    
    // Criar objeto do cliente
    const cliente = {
        nome,
        telefone,
        cpf,
        status,
        veiculos
    };
    
    // Atualizar cliente em edição
    clienteEmEdicao = cliente;
    
    // Abrir modal e preencher formulário
    const modal = document.getElementById('modalCliente');
    const titulo = modal.querySelector('.modal-titulo');
    const form = document.getElementById('formCliente');
    
    // Preencher o formulário
    form.nome.value = cliente.nome;
    form.telefone.value = cliente.telefone;
    form.cpf.value = cliente.cpf;
    form.status.value = cliente.status;
    
    // Limpar e preencher veículos
    const listaVeiculos = document.getElementById('lista-veiculos');
    listaVeiculos.innerHTML = '';
    
    cliente.veiculos.forEach(veiculo => {
        adicionarCampoVeiculo(veiculo.placa, veiculo.modelo);
    });
    
    titulo.textContent = 'Editar Cliente';
    modal.style.display = 'flex';
}

// Função para excluir cliente
function excluirCliente(button) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        const card = button.closest('.cliente-card');
        const nome = card.querySelector('h3').textContent;
        
        // Remover do array
        clientes = clientes.filter(c => c.nome !== nome);
        
        // Remover do DOM
        card.remove();
        
        // Salvar no localStorage
        salvarClientes();
    }
}

// Função para salvar clientes no localStorage
function salvarClientes() {
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

// Função para carregar clientes do localStorage
function carregarClientes() {
    const clientesSalvos = localStorage.getItem('clientes');
    if (clientesSalvos) {
        clientes = JSON.parse(clientesSalvos);
    } else {
        // Dados iniciais para teste
        clientes = [{
            nome: "João Silva",
            telefone: "(11) 99999-9999",
            cpf: "123.456.789-00",
            status: "ativo",
            veiculos: [
                { placa: "ABC-1234", modelo: "Toyota Corolla 2020" },
                { placa: "DEF-5678", modelo: "Honda Civic 2019" }
            ]
        }];
    }
    atualizarGridClientes();
}

// Função para atualizar a grid de clientes
function atualizarGridClientes() {
    const grid = document.querySelector('.clientes-grid');
    grid.innerHTML = '';
    
    clientes.forEach(cliente => {
        const card = criarCardCliente(cliente);
        grid.appendChild(card);
    });
}

// Função para criar card de cliente
function criarCardCliente(cliente) {
    const card = document.createElement('div');
    card.className = 'cliente-card';
    
    card.innerHTML = `
        <div class="cliente-avatar">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(cliente.nome)}&background=1a237e&color=fff" alt="${cliente.nome}">
            <span class="status status-${cliente.status}">${cliente.status}</span>
        </div>
        <div class="cliente-info">
            <h3>${cliente.nome}</h3>
            <p class="cliente-detalhe">
                <i class="fas fa-phone"></i> ${cliente.telefone}
            </p>
            <p class="cliente-detalhe">
                <i class="fas fa-id-card"></i> ${cliente.cpf}
            </p>
        </div>
        <div class="veiculos-info">
            <h4><i class="fas fa-car"></i> Veículos</h4>
            ${cliente.veiculos.map(veiculo => `
                <div class="veiculo-card">
                    <p class="veiculo-placa">${veiculo.placa}</p>
                    <p class="veiculo-detalhe">${veiculo.modelo}</p>
                </div>
            `).join('')}
        </div>
        <div class="cliente-acoes">
            <button type="button" class="botao-acao botao-editar" onclick="editarCliente(this)">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="botao-acao botao-excluir" onclick="excluirCliente(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return card;
}

// Função para coletar dados do formulário
function coletarDadosFormulario() {
    const form = document.getElementById('formCliente');
    const veiculos = [];
    
    // Coletar veículos
    document.querySelectorAll('.veiculo-campo').forEach(campo => {
        const placa = campo.querySelector('.veiculo-placa').value;
        const modelo = campo.querySelector('.veiculo-modelo').value;
        if (placa && modelo) {
            veiculos.push({ placa, modelo });
        }
    });
    
    return {
        nome: form.nome.value,
        telefone: form.telefone.value,
        cpf: form.cpf.value,
        status: form.status.value,
        veiculos: veiculos
    };
}

// Event listener para o formulário
document.getElementById('formCliente').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const dados = coletarDadosFormulario();
    
    if (clienteEmEdicao) {
        // Atualizar cliente existente
        const index = clientes.findIndex(c => c.nome === clienteEmEdicao.nome);
        if (index !== -1) {
            clientes[index] = dados;
        }
    } else {
        // Adicionar novo cliente
        clientes.push(dados);
    }
    
    // Salvar e atualizar a interface
    salvarClientes();
    atualizarGridClientes();
    fecharModal();
});

// Event listener para busca
document.getElementById('busca').addEventListener('input', function(e) {
    const termo = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.cliente-card');
    
    cards.forEach(card => {
        const nome = card.querySelector('h3').textContent.toLowerCase();
        const cpf = card.querySelector('.cliente-detalhe:nth-child(3)').textContent.toLowerCase();
        const placa = card.querySelector('.veiculo-placa')?.textContent.toLowerCase() || '';
        
        if (nome.includes(termo) || cpf.includes(termo) || placa.includes(termo)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    carregarClientes();
});
