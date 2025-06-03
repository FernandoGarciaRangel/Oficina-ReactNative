"use strict";

import Status from "/model/Status.js";
import Cliente from "/model/Cliente.js";
import ClienteDTO from "/model/ClienteDTO.js";
import DaoCliente from "/model/dao/DaoCliente.js";
import ViewerCliente from "/viewer/ViewerCliente.js";

export default class CtrlManterClientes {
  
  //-----------------------------------------------------------------------------------------//

  //
  // Atributos do Controlador
  //
  #daoCliente; // Referência para o Data Access Object para o Store de Clientes
  #viewer;     // Referência para o gerenciador do viewer 
  #posAtual;   // Indica a posição do objeto Cliente que estiver sendo apresentado
  #status;     // Indica o que o controlador está fazendo 
  
  //-----------------------------------------------------------------------------------------//

  constructor() {
    this.#daoCliente = new DaoCliente();
    this.#viewer = new ViewerCliente(this);
    this.#posAtual = 1;
    this.#atualizarContextoNavegacao();    
  }
  
  //-----------------------------------------------------------------------------------------//

  async #atualizarContextoNavegacao() {
    // Guardo a informação que o controlador está navegando pelos dados
    this.#status = Status.NAVEGANDO;

    // Determina ao viewer que ele está apresentando dos dados 
    this.#viewer.statusApresentacao();
    
    // Solicita ao DAO que dê a lista de todos os clientes presentes na base
    let conjClientes = await this.#daoCliente.obterClientes();
    
    console.log("---->", conjClientes);
    
    // Se a lista de clientes estiver vazia
    if(conjClientes.length == 0) {
      // Posição Atual igual a zero indica que não há objetos na base
      this.#posAtual = 0;
      
      // Informo ao viewer que não deve apresentar nada
      this.#viewer.apresentar(0, 0, null);
    }
    else {
      // Se é necessário ajustar a posição atual, determino que ela passa a ser 1
      if(this.#posAtual == 0 || this.#posAtual > conjClientes.length)
        this.#posAtual = 1;
      // Peço ao viewer que apresente o objeto da posição atual
      this.#viewer.apresentar(this.#posAtual, conjClientes.length, new ClienteDTO(conjClientes[this.#posAtual - 1]));
    }
  }
  
  //-----------------------------------------------------------------------------------------//

  async apresentarPrimeiro() {
    let conjClientes = await this.#daoCliente.obterClientes();
    if(conjClientes.length > 0)
      this.#posAtual = 1;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarProximo() {
    let conjClientes = await this.#daoCliente.obterClientes();
    if(this.#posAtual < conjClientes.length)
      this.#posAtual++;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarAnterior() {
    let conjClientes = await this.#daoCliente.obterClientes();
    if(this.#posAtual > 1)
      this.#posAtual--;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarUltimo() {
    let conjClientes = await this.#daoCliente.obterClientes();
    this.#posAtual = conjClientes.length;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//
  
  iniciarIncluir() {
    this.#status = Status.INCLUINDO;
    this.#viewer.statusEdicao(Status.INCLUINDO);
    this.efetivar = this.incluir;
  }

  //-----------------------------------------------------------------------------------------//
  
  iniciarAlterar() {
    this.#status = Status.ALTERANDO;
    this.#viewer.statusEdicao(Status.ALTERANDO);
    this.efetivar = this.alterar;
  }

  //-----------------------------------------------------------------------------------------//
  
  iniciarExcluir() {
    this.#status = Status.EXCLUINDO;
    this.#viewer.statusEdicao(Status.EXCLUINDO);
    this.efetivar = this.excluir;
  }

  //-----------------------------------------------------------------------------------------//
 
  async incluir(cpf, nome, email, telefone, endereco) {
    if(this.#status == Status.INCLUINDO) {
      try {
        let cliente = new Cliente(cpf, nome, email, telefone, endereco);
        await this.#daoCliente.incluir(cliente); 
        this.#status = Status.NAVEGANDO;
        this.#atualizarContextoNavegacao();
      }
      catch(e) {
        alert(e);
      }
    }    
  }

  //-----------------------------------------------------------------------------------------//
 
  async alterar(cpf, nome, email, telefone, endereco) {
    if(this.#status == Status.ALTERANDO) {
      try {
        let cliente = await this.#daoCliente.obterClientePeloCpf(cpf); 
        if(cliente == null) {
          alert("Cliente com o CPF " + cpf + " não encontrado.");
        } else {
          cliente.setNome(nome);
          cliente.setEmail(email);
          cliente.setTelefone(telefone);
          cliente.setEndereco(endereco);
          await this.#daoCliente.alterar(cliente); 
        }
        this.#status = Status.NAVEGANDO;
        this.#atualizarContextoNavegacao();
      }
      catch(e) {
        alert(e);
      }
    }    
  }

  //-----------------------------------------------------------------------------------------//
 
  async excluir(cpf) {
    if(this.#status == Status.EXCLUINDO) {
      try {
        let cliente = await this.#daoCliente.obterClientePeloCpf(cpf); 
        if(cliente == null) {
          alert("Cliente com o CPF " + cpf + " não encontrado.");
        } else {
          await this.#daoCliente.excluir(cliente); 
        }
        this.#status = Status.NAVEGANDO;
        this.#atualizarContextoNavegacao();
      }
      catch(e) {
        alert(e);
      }
    }    
  }

  //-----------------------------------------------------------------------------------------//

  cancelar() {
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  getStatus() {
    return this.#status;
  }

  //-----------------------------------------------------------------------------------------//
} 