// Abrir modal ao clicar em qualquer botão .btn-alterar
const btnsSolicitar = document.querySelectorAll('.btn-alterar');
const modalSolicitar = document.getElementById('modalSolicitar');

btnsSolicitar.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        modalSolicitar.classList.add('ativo');
        document.body.style.overflow = 'hidden';
    });
});

function fecharModalSolicitar() {
    modalSolicitar.classList.remove('ativo');
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora do conteúdo
modalSolicitar.addEventListener('click', function(e) {
    if (e.target === modalSolicitar) fecharModalSolicitar();
});

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalSolicitar.classList.contains('ativo')) {
        fecharModalSolicitar();
    }
});

// Manipular envio do formulário
const formSolicitar = document.getElementById('formSolicitar');
formSolicitar.addEventListener('submit', function(e) {
    e.preventDefault();
    const motivo = document.getElementById('motivoSolicitacao').value.trim();
    const qtd = document.getElementById('quantidadeSolicitada').value;
    if (!motivo || motivo.length < 5 || !qtd || qtd < 1) {
        alert('Preencha todos os campos corretamente (motivo com pelo menos 5 caracteres e quantidade maior que 0).');
        return;
    }
    // Aqui você pode enviar os dados para o backend
    alert('Solicitação enviada com sucesso!');
    formSolicitar.reset();
    fecharModalSolicitar();
}); 