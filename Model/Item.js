import ModelError from "/model/ModelError.js";

class Item {
    constructor(precoPrat, precoProd, quantidade) {
      this.setProduto(produto);
      this.setQuantidade(quantidade);
      this.setPrecoPraticado(preco_praticado)
    }
  
    setQuantidade(quantidade) {
      Item.validarQuantidade(quantidade)
      this.quantidade = quantidade;
    }
  
    setPrecoPrat(precoPrat) {
      Item.validarPrecoPrat(precoPrat)
      this.precoPrat = precoPrat;
    }
    setPrecoProd(precoProd) {
      Item.validarPrecoProd(precoProd)
      this.precoProd = precoProd;
    }
    
    getQuantidade() {
      return this.quantidade
  }
    getPrecoPrat() {
      return this.precoPrat
  }
    getPrecoProd() {
      return this.precoProd
  }

    static validarQuantidade(quantidade){
          if (typeof quantidade !== 'number' || quantidade < 0) {
            throw new ModelError("É obrigatório que seja um número e maior que 0");
    }
        }

    static validarPrecoPrat(precoPrat) {
          if (typeof precoPrat !== 'number' || precoPrat < 0) {
              throw new ModelError("É obrigatório que seja um número e maior que 0");
      }
    }
    
    static validarPrecoProd(precoProd) {
        if (typeof precoProd !== 'number' || precoProd < 0) {
          throw new ModelError("É obrigatório que seja um número e maior que 0");
        }
    }

}
  