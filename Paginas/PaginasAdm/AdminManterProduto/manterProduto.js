// Lista de produtos em memória
let produtos = [];

function abrirModalProduto() {
    document.getElementById('modalProduto').style.display = 'flex';
    document.getElementById('modalProduto').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('modalProduto').style.opacity = '1';
    }, 10);
}

function fecharModalProduto() {
    document.getElementById('modalProduto').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('modalProduto').style.display = 'none';
        limparFormularioProduto();
    }, 300);
}

function limparFormularioProduto() {
    document.getElementById('produtoId').value = '';
    document.getElementById('codigo').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('preco').value = '';
    document.querySelector('.modal-titulo').textContent = 'Adicionar Produto';
}

function renderizarProdutos() {
    const tbody = document.getElementById('produtos-tbody');
    tbody.innerHTML = '';
    produtos.forEach((produto, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${Number(produto.preco).toFixed(2)}</td>
            <td class="acoes">
                <button class="botao-acao botao-editar" onclick="editarProduto(${idx})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="botao-acao botao-excluir" onclick="excluirProduto(${idx})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function adicionarOuEditarProduto(event) {
    event.preventDefault();
    const id = document.getElementById('produtoId').value;
    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const preco = document.getElementById('preco').value;

    if (id) {
        // Editar produto existente
        produtos[id] = { codigo, nome, quantidade, preco };
    } else {
        // Adicionar novo produto
        produtos.push({ codigo, nome, quantidade, preco });
    }
    renderizarProdutos();
    fecharModalProduto();
}

function editarProduto(idx) {
    const produto = produtos[idx];
    document.getElementById('produtoId').value = idx;
    document.getElementById('codigo').value = produto.codigo;
    document.getElementById('nome').value = produto.nome;
    document.getElementById('quantidade').value = produto.quantidade;
    document.getElementById('preco').value = produto.preco;
    document.querySelector('.modal-titulo').textContent = 'Editar Produto';
    abrirModalProduto();
}

function excluirProduto(idx) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        produtos.splice(idx, 1);
        renderizarProdutos();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formProduto').addEventListener('submit', adicionarOuEditarProduto);
    // Fechar modal ao clicar fora do conteúdo
    document.getElementById('modalProduto').addEventListener('click', function(e) {
        if (e.target === this) fecharModalProduto();
    });
});
