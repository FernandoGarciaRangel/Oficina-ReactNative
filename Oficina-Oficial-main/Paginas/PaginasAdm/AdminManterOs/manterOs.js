// Funções para controlar o modal
function abrirModal() {
    const modal = document.getElementById('modalOs');
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    
    // Limpa o ID e o título se for uma nova OS
    if (!document.getElementById('osId').value) {
        document.querySelector('.modal-titulo').textContent = 'Adicionar Ordem de Serviço';
    }
    
    // Anima a entrada do modal
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function fecharModal() {
    const modal = document.getElementById('modalOs');
    modal.style.opacity = '0';
    
    // Fecha o modal após a animação
    setTimeout(() => {
        modal.style.display = 'none';
        limparFormulario();
    }, 300);
}

function limparFormulario() {
    document.getElementById('osId').value = '';
    document.getElementById('cliente').value = '';
    document.getElementById('mecanico').value = '';
    document.getElementById('data').value = '';
    document.getElementById('status').value = 'pendente';
    document.getElementById('descricao').value = '';
}

// Funções para gerenciar as OS
function adicionarOs(event) {
    event.preventDefault();
    
    const osId = document.getElementById('osId').value;
    const cliente = document.getElementById('cliente').value;
    const mecanico = document.getElementById('mecanico').value;
    const data = document.getElementById('data').value;
    const status = document.getElementById('status').value;
    const descricao = document.getElementById('descricao').value;
    
    if (osId) {
        // Modo de edição
        const linha = document.querySelector(`tr[data-id="${osId}"]`);
        if (linha) {
            linha.children[1].textContent = cliente;
            linha.children[2].textContent = mecanico;
            linha.children[3].textContent = data;
            
            const statusElement = linha.querySelector('.status');
            statusElement.className = `status status-${status}`;
            statusElement.textContent = formatarStatus(status);
            
            const descricaoPreview = linha.querySelector('.descricao-preview');
            descricaoPreview.setAttribute('data-descricao', descricao);
            descricaoPreview.textContent = descricao.length > 50 ? descricao.substring(0, 50) + '...' : descricao;
        }
    } else {
        // Modo de criação
        const id = document.querySelectorAll('.tabela tbody tr').length + 1;
        
        const tbody = document.querySelector('.tabela tbody');
        const novaLinha = document.createElement('tr');
        novaLinha.setAttribute('data-id', id);
        
        novaLinha.innerHTML = `
            <td>${id}</td>
            <td>${cliente}</td>
            <td>${mecanico}</td>
            <td>${data}</td>
            <td><span class="status status-${status}">${formatarStatus(status)}</span></td>
            <td>
                <div class="descricao-preview" data-descricao="${descricao}" onclick="visualizarDescricao(${id})">
                    ${descricao.length > 50 ? descricao.substring(0, 50) + '...' : descricao}
                </div>
            </td>
            <td class="acoes">
                <button class="botao-acao botao-editar" onclick="editarOs(${id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="botao-acao botao-excluir" onclick="excluirOs(${id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </td>
        `;
        
        // Adiciona a nova linha com animação
        novaLinha.style.opacity = '0';
        novaLinha.style.transform = 'translateY(-20px)';
        tbody.appendChild(novaLinha);
        
        // Anima a entrada da nova linha
        setTimeout(() => {
            novaLinha.style.transition = 'all 0.3s ease';
            novaLinha.style.opacity = '1';
            novaLinha.style.transform = 'translateY(0)';
        }, 10);
    }
    
    // Fecha o modal
    fecharModal();
}

function editarOs(id) {
    const linha = document.querySelector(`tr[data-id="${id}"]`);
    if (!linha) return;
    
    // Preenche o formulário com os dados da OS
    document.getElementById('cliente').value = linha.children[1].textContent;
    document.getElementById('mecanico').value = linha.children[2].textContent;
    document.getElementById('data').value = linha.children[3].textContent;
    
    const statusAtual = linha.querySelector('.status').classList[1].replace('status-', '');
    document.getElementById('status').value = statusAtual;
    
    // Obtém a descrição completa do elemento de descrição
    const descricaoCompleta = linha.querySelector('.descricao-preview').getAttribute('data-descricao');
    document.getElementById('descricao').value = descricaoCompleta;
    
    // Atualiza o ID do formulário para edição
    document.getElementById('osId').value = id;
    
    // Atualiza o título do modal
    document.querySelector('.modal-titulo').textContent = 'Editar Ordem de Serviço';
    
    // Abre o modal
    abrirModal();
}

function excluirOs(id) {
    if (confirm('Tem certeza que deseja excluir esta Ordem de Serviço?')) {
        const linha = document.querySelector(`tr[data-id="${id}"]`);
        if (!linha) return;
        
        // Anima a remoção da linha
        linha.style.transition = 'all 0.3s ease';
        linha.style.opacity = '0';
        linha.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            linha.remove();
        }, 300);
    }
}

// Funções para visualizar e editar descrição
function visualizarDescricao(id) {
    const linha = document.querySelector(`tr[data-id="${id}"]`);
    if (!linha) return;
    
    const descricaoPreview = linha.querySelector('.descricao-preview');
    const descricaoCompleta = descricaoPreview.getAttribute('data-descricao');
    
    if (!descricaoCompleta) {
        console.error('Descrição não encontrada para a OS:', id);
        return;
    }
    
    const modal = document.getElementById('modalDescricao');
    const descricaoElement = document.getElementById('descricaoCompleta');
    
    descricaoElement.textContent = descricaoCompleta;
    modal.setAttribute('data-os-id', id);
    
    // Abre o modal
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function fecharModalDescricao() {
    const modal = document.getElementById('modalDescricao');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function editarDescricao() {
    const modal = document.getElementById('modalDescricao');
    const osId = modal.getAttribute('data-os-id');
    
    // Fecha o modal de descrição
    fecharModalDescricao();
    
    // Abre o modal de edição
    editarOs(osId);
}

function formatarStatus(status) {
    const statusMap = {
        'pendente': 'Pendente',
        'andamento': 'Em andamento',
        'concluida': 'Concluída',
        'cancelada': 'Cancelada'
    };
    return statusMap[status] || status;
}

// Adiciona os event listeners quando o documento carregar
document.addEventListener('DOMContentLoaded', function() {
    // Botão de adicionar
    const botaoAdicionar = document.querySelector('.botao-adicionar');
    botaoAdicionar.addEventListener('click', abrirModal);
    
    // Botão de cancelar
    const botaoCancelar = document.querySelector('.botao-cancelar');
    botaoCancelar.addEventListener('click', fecharModal);
    
    // Formulário
    const formulario = document.querySelector('.formulario');
    formulario.addEventListener('submit', adicionarOs);
});
