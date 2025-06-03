import ModelError from "/model/ModelError.js";

class Produto {
    constructor(codigo, quantidade, nome, preco) {
      this.setCodigo(codigo);
      this.setDescricao(nome);
      this.setPreco(preco);
    }
  
    setCodigo(codigo) {
      Produto.validarCodigo(codigo)
      this.codigo = codigo;
    }

    setQuantidade(quantidade){
      Produto.validarQuantidade(quantidade)
      this.quantidade = quantidade;
    }
  
    setNome(nome) {
        Produto.validarNome(nome)
        this.nome = nome;
    }
  
    setPreco(preco) {
      Produto.validarPreco(preco)
      this.preco = preco;
    }

    getCodigo() {
        return this.codigo
    }

    getDescricao() {
        return this.descricao
    }

    getPreco() {
        return this.preco
    }

    static validarCodigo(codigo) {
        // Verificar se o código do produto é uma string
        if (typeof codigo !== 'string') {
            throw new ModelError("O código do produto deve ser uma string.");
        }

        // Verificar se o código do produto possui mais de 6 dígitos
        if (codigo.length > 6) {
            throw new ModelError("O código do produto não pode ter mais de 6 dígitos.");
        }

        return true; // Código do produto válido
    }

    static validarQuantidade(quantidade){
      if (typeof quantidade !== 'number' || quantidade < 0) {
        throw new ModelError("É obrigatório que seja um número e maior que 0");
}
    }

    static validarNome(nome) {
        if (nome == null || typeof nome !== 'string' || nome.trim() === '' ) {
            throw new ModelError("O campo nome não pode ser vazio");
        }
    }

    static validarPreco(preco) {
        if (typeof preco !== 'number' || preco < 0) {
            throw new ModelError("É obrigatório que seja um número e maior que 0");
    }
  }
}