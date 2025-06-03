// Abrir modal ao clicar em qualquer botão .btn-alterar
const btnsAlterar = document.querySelectorAll('.btn-alterar');
const modalEncerrar = document.getElementById('modalEncerrar');
let linhaSelecionada = null;

btnsAlterar.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        modalEncerrar.classList.add('ativo');
        document.body.style.overflow = 'hidden';
        // Salva a linha da tabela referente ao botão clicado
        linhaSelecionada = btn.closest('tr');
    });
});

function fecharModalEncerrar() {
    modalEncerrar.classList.remove('ativo');
    document.body.style.overflow = 'auto';
    linhaSelecionada = null;
}

// Fechar modal ao clicar fora do conteúdo
modalEncerrar.addEventListener('click', function(e) {
    if (e.target === modalEncerrar) fecharModalEncerrar();
});

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalEncerrar.classList.contains('ativo')) {
        fecharModalEncerrar();
    }
});

// Manipular envio do formulário
const formEncerrar = document.getElementById('formEncerrar');
formEncerrar.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = document.getElementById('dataEncerramento').value;
    const desc = document.getElementById('descricaoEncerramento').value.trim();
    if (!data || desc.length < 10) {
        alert('Preencha todos os campos corretamente (descrição com pelo menos 10 caracteres).');
        return;
    }
    // Atualiza a data de encerramento na tabela
    if (linhaSelecionada) {
        const celulaData = linhaSelecionada.querySelectorAll('td')[2];
        celulaData.textContent = data;
    }
    // Aqui você pode enviar os dados para o backend
    alert('Ordem de serviço encerrada com sucesso!');
    formEncerrar.reset();
    fecharModalEncerrar();
}); 