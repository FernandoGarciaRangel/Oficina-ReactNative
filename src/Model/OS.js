import ModelError from "/model/ModelError.js";

class OS {
    constructor(preco, veiculo,descricao, data_inicio, data_fim) {
      this.setPreco(preco);
      this.setVeiculo(veiculo);
      this.setDataInicio(data_inicio);
      this.setDataFim(data_fim);
      this.setDescricao(descricao);
    }
  
    setPreco(preco) {
        OS.validarPreco(preco)
        this.preco = preco;
    }
  
    setVeiculo(veiculo) {
        OS.validarVeiculo(veiculo)
        this.veiculo = veiculo;
    }
  
    setData_inicio(data_inicio) {
        OS.validarDatainicio(data_inicio)
        this.data_inicio = data_inicio;
    }
    setData_fim(data_fim) {
        OS.validarDatafim(data_fim)
      this.data_fim = data_fim;
    }
  
    setDescricao(descricao) {
        OS.validarDescricao(descricao)
        this.descricao = descricao;
    }


    getPreco() {
        return this.preco;
    }

    getDescricao() {
      return this.descricao
    }

    getDataInicio() {
        return this.data_inicio
    }

    getDataFim() {
        return this.data_fim
    }




    static validarDatainicio(data_inicio) {
        // Verificar se a data de início é uma string
        if (typeof data_inicio !== 'string') {
            throw new ModelError("A data de início deve ser uma string no formato 'YYYY-MM-DD'.");
        }

        // Tentar converter a string para um objeto Date
        const data = new Date(data_inicio);

        // Verificar se a conversão resultou em uma data válida
        if (isNaN(data.getTime())) {
            throw new ModelError("A data de início não é válida. Use o formato 'YYYY-MM-DD'.");
        }

        // Verificar se a data de início não é no futuro
        const dataAtual = new Date();
        if (data > dataAtual) {
            throw new ModelError("A data de início não pode ser no futuro.");
        }

    }

    static validarDatafim(data_fim, data_inicio) {
        // Verificar se a data de fim é uma string
        if (typeof data_fim !== 'string') {
            throw new ModelError("A data de fim deve ser uma string no formato 'YYYY-MM-DD'.");
        }

        // Tentar converter a string para um objeto Date
        const dataFim = new Date(data_fim);

        // Verificar se a conversão resultou em uma data válida
        if (isNaN(dataFim.getTime())) {
            throw new ModelError("A data de fim não é válida. Use o formato 'YYYY-MM-DD'.");
        }

        // Verificar se a data de fim não é no futuro
        const dataAtual = new Date();
        if (dataFim > dataAtual) {
            throw new ModelError("A data de fim não pode ser no futuro.");
        }

        // Verificar se a data de fim não é anterior à data de início
        if (dataFim < data_inicio) {
            throw new ModelError("A data de fim não pode ser anterior à data de início.");
        }
    }

    
    static validarDescricao(descricao) {
      if (descricao == null || typeof descricao !== 'string' || descricao.trim() === '' ) {
        throw new ModelError("O campo descrição não pode ser vazio");

      }
      const regex = /[a-zA-Z]/;
      if (!regex.test(descricao)) {
        throw new ModelError("O campo descrição não deve conter apenas números ou símbolos");
      }
    }
    
    static validarPreco(preco) {
      if (typeof preco !== 'number' || preco < 0) {
        throw new ModelError("É obrigatório que seja um número e maior que 0");
    }
  }

    static validarVeiculo(veiculo) {
        if(veiculo == null || veiculo == undefined)
            throw new ModelError("É necessário indicar qual é o Veiculo da OS");
        if (veiculo.constructor.name !== "Veiculo" && veiculo.constructor.name !== "Promise")
            throw new ModelError("Veiculo Inválido");
    }

 }
  