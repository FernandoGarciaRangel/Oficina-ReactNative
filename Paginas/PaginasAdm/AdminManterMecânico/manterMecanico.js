function deletarLinha(button) {
    if (confirm('Tem certeza que deseja excluir este mecânico?')) {
        const card = button.closest('.card');
        
        // Anima a remoção do card
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            card.remove();
        }, 300);
    }
}

function alterarSituacao(button) {
    const card = button.closest('.card');
    const statusElement = card.querySelector('.status');
    const situacaoAtual = statusElement.classList.contains('status-ativo') ? 'ativo' : 'inativo';
    const novaSituacao = situacaoAtual === 'ativo' ? 'inativo' : 'ativo';
    
    // Atualiza o status com animação
    statusElement.style.transition = 'all 0.3s ease';
    statusElement.style.opacity = '0';
    
    setTimeout(() => {
        statusElement.className = `status status-${novaSituacao}`;
        statusElement.textContent = novaSituacao === 'ativo' ? 'Ativo' : 'Inativo';
        statusElement.style.opacity = '1';
    }, 300);
}

// Funções para controlar o modal
function abrirModal() {
    const modal = document.getElementById('modalMecanico');
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    
    // Anima a entrada do modal
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function fecharModal() {
    const modal = document.getElementById('modalMecanico');
    modal.style.opacity = '0';
    
    // Fecha o modal após a animação
    setTimeout(() => {
        modal.style.display = 'none';
        limparFormulario();
    }, 300);
}

function limparFormulario() {
    document.getElementById('matricula').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('situacao').value = 'ativo';
}

// Funções para gerenciar os mecânicos
function adicionarMecanico(event) {
    event.preventDefault();
    
    const matricula = document.getElementById('matricula').value;
    const nome = document.getElementById('nome').value;
    const situacao = document.getElementById('situacao').value;
    
    // Cria o novo card
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <div class="card-header">
            <h3>${nome}</h3>
            <span class="status status-${situacao}">${situacao === 'ativo' ? 'Ativo' : 'Inativo'}</span>
        </div>
        <div class="card-body">
            <p class="matricula"><strong>Matrícula:</strong> ${matricula}</p>
        </div>
        <div class="card-footer">
            <button class="botao-acao botao-editar" onclick="alterarSituacao(this)">
                <i class="fas fa-edit"></i> Alterar
            </button>
            <button class="botao-acao botao-excluir" onclick="deletarLinha(this)">
                <i class="fas fa-trash"></i> Deletar
            </button>
        </div>
    `;
    
    // Adiciona o card com animação
    card.style.opacity = '0';
    card.style.transform = 'translateY(-20px)';
    document.querySelector('.cards-container').appendChild(card);
    
    // Anima a entrada do card
    setTimeout(() => {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 10);
    
    // Fecha o modal
    fecharModal();
}

// Adiciona os event listeners quando o documento carregar
document.addEventListener('DOMContentLoaded', function() {
    // Formulário
    const formulario = document.querySelector('.formulario');
    formulario.addEventListener('submit', adicionarMecanico);
});
