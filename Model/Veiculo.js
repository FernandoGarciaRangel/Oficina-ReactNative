import ModelError from "/model/ModelError.js";

class Veiculo {
    constructor(placa, modelo, ano, cliente) {
      this.setPlaca(placa);
      this.setModelo(modelo);
      this.setAno(ano);
      this.setCliente(cliente);
    }

    getPlaca() {
        return this.placa
    }

    getModelo() {
        return this.modelo
    }

    getAno() {
        return this.ano
    }

  
    setPlaca(placa) {
        Veiculo.validarPlaca(placa)
        this.placa = placa;
    }
  
    setModelo(modelo) {
        Veiculo.validarPlaca(placa)
        this.modelo = modelo;
    }
  
    setAno(ano) {
        Veiculo.validarAno(placa)
        this.ano = ano;
    }
  
    setCliente(cliente) {
        Veiculo.validarAno(placa)
        this.cliente = cliente;
    }

    static validarPlaca(placa) {
        // Verificar se a placa é uma string
        if (typeof placa !== 'string') {
            throw new ModelError("A placa deve ser uma string!");
        }

        // Expressão regular para validar o formato de placas brasileiras
        const regex = /^[A-Z]{3}-\d{1}[A-Z]{1}\d{2}$/i; // Formato ABC-1D23 ou ABC1D23 (sem hífen)

        // Verificar se a placa corresponde ao formato
        if (!regex.test(placa)) {
            throw new ModelError("A placa não está no formato válido de placas brasileira!");
        }
    }

    static validarAno(ano) {
        // Verificar se o ano é um número
        if (typeof ano !== 'number') {
            throw new ModelError("O ano deve ser um número!");
        }

        // Verificar se o ano está no intervalo válido (de 1900 até o ano atual)
        const anoAtual = new Date().getFullYear(); // Obtém o ano atual
        if (ano < 1900 || ano > anoAtual) {
            throw new ModelError(`O ano deve estar entre 1900 e ${anoAtual}!`);
        }
    }

    static validarCliente(cliente) {
        if(cliente == null || cliente == undefined)
            throw new ModelError("É necessário indicar qual é o Cliente do Veiculo");
          if(cliente.constructor.name !== "Clinete" && cliente.constructor.name !== "Promise" )
            throw new ModelError("Cliente Inválido");
    }

  }