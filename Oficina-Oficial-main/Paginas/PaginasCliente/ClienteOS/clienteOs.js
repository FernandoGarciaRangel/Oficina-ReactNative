// Funções para controlar o popup
function abrirPopup() {
    const popup = document.getElementById('popupServico');
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Adiciona a classe active após um pequeno delay para a animação funcionar
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);
}

function fecharPopup() {
    const popup = document.getElementById('popupServico');
    popup.classList.remove('active');
    
    // Espera a animação terminar antes de esconder o popup
    setTimeout(() => {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Fechar popup ao clicar fora dele
window.onclick = function(event) {
    const popup = document.getElementById('popupServico');
    if (event.target == popup) {
        fecharPopup();
    }
}

// Fechar popup com a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const popup = document.getElementById('popupServico');
        if (popup.style.display === 'block') {
            fecharPopup();
        }
    }
});

// Função para mostrar o toast de sucesso
function mostrarToastSucesso() {
    const toast = document.getElementById('toastSucesso');
    toast.classList.add('mostrar');
    setTimeout(() => {
        toast.classList.remove('mostrar');
    }, 3000);
}

// Manipular envio do formulário
document.getElementById('formServico').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const descricao = document.getElementById('descricao').value.trim();
    
    // Validação básica
    if (descricao.length < 10) {
        alert('Por favor, forneça uma descrição mais detalhada do serviço (mínimo 10 caracteres).');
        return;
    }
    
    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    console.log('Descrição do serviço:', descricao);
    
    // Mostrar indicador de carregamento
    const btnSubmit = this.querySelector('button[type="submit"]');
    const btnText = btnSubmit.textContent;
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Enviando...';
    
    // Simular envio (remover em produção)
    setTimeout(() => {
        // Limpar formulário e fechar popup
        this.reset();
        fecharPopup();
        
        // Restaurar botão
        btnSubmit.disabled = false;
        btnSubmit.textContent = btnText;
        
        // Mostrar toast de sucesso
        mostrarToastSucesso();
    }, 1000);
});