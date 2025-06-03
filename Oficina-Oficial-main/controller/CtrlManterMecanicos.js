"use strict";

import Status from "/model/Status.js";
import Mecanico from "/model/Mecanico.js";
import MecanicoDTO from "/model/MecanicoDTO.js";
import DaoMecanico from "/model/dao/DaoMecanico.js";
import ViewerMecanico from "/viewer/ViewerMecanico.js";

export default class CtrlManterMecanicos {
  
  //-----------------------------------------------------------------------------------------//

  //
  // Atributos do Controlador
  //
  #daoMecanico; // Referência para o Data Access Object para o Store de Mecânicos
  #viewer;      // Referência para o gerenciador do viewer 
  #posAtual;    // Indica a posição do objeto Mecânico que estiver sendo apresentado
  #status;      // Indica o que o controlador está fazendo 
  
  //-----------------------------------------------------------------------------------------//

  constructor() {
    this.#daoMecanico = new DaoMecanico();
    this.#viewer = new ViewerMecanico(this);
    this.#posAtual = 1;
    this.#atualizarContextoNavegacao();    
  }
  
  //-----------------------------------------------------------------------------------------//

  async #atualizarContextoNavegacao() {
    // Guardo a informação que o controlador está navegando pelos dados
    this.#status = Status.NAVEGANDO;

    // Determina ao viewer que ele está apresentando dos dados 
    this.#viewer.statusApresentacao();
    
    // Solicita ao DAO que dê a lista de todos os mecânicos presentes na base
    let conjMecanicos = await this.#daoMecanico.obterMecanicos();
    
    console.log("---->", conjMecanicos);
    
    // Se a lista de mecânicos estiver vazia
    if(conjMecanicos.length == 0) {
      // Posição Atual igual a zero indica que não há objetos na base
      this.#posAtual = 0;
      
      // Informo ao viewer que não deve apresentar nada
      this.#viewer.apresentar(0, 0, null);
    }
    else {
      // Se é necessário ajustar a posição atual, determino que ela passa a ser 1
      if(this.#posAtual == 0 || this.#posAtual > conjMecanicos.length)
        this.#posAtual = 1;
      // Peço ao viewer que apresente o objeto da posição atual
      this.#viewer.apresentar(this.#posAtual, conjMecanicos.length, new MecanicoDTO(conjMecanicos[this.#posAtual - 1]));
    }
  }
  
  //-----------------------------------------------------------------------------------------//

  async apresentarPrimeiro() {
    let conjMecanicos = await this.#daoMecanico.obterMecanicos();
    if(conjMecanicos.length > 0)
      this.#posAtual = 1;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarProximo() {
    let conjMecanicos = await this.#daoMecanico.obterMecanicos();
    if(this.#posAtual < conjMecanicos.length)
      this.#posAtual++;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarAnterior() {
    let conjMecanicos = await this.#daoMecanico.obterMecanicos();
    if(this.#posAtual > 1)
      this.#posAtual--;
    this.#atualizarContextoNavegacao();
  }

  //-----------------------------------------------------------------------------------------//

  async apresentarUltimo() {
    let conjMecanicos = await this.#daoMecanico.obterMecanicos();
    this.#posAtual = conjMecanicos.length;
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
 
  async incluir(cpf, nome, email, telefone, especialidade) {
    if(this.#status == Status.INCLUINDO) {
      try {
        let mecanico = new Mecanico(cpf, nome, email, telefone, especialidade);
        await this.#daoMecanico.incluir(mecanico); 
        this.#status = Status.NAVEGANDO;
        this.#atualizarContextoNavegacao();
      }
      catch(e) {
        alert(e);
      }
    }    
  }

  //-----------------------------------------------------------------------------------------//
 
  async alterar(cpf, nome, email, telefone, especialidade) {
    if(this.#status == Status.ALTERANDO) {
      try {
        let mecanico = await this.#daoMecanico.obterMecanicoPeloCpf(cpf); 
        if(mecanico == null) {
          alert("Mecânico com o CPF " + cpf + " não encontrado.");
        } else {
          mecanico.setNome(nome);
          mecanico.setEmail(email);
          mecanico.setTelefone(telefone);
          mecanico.setEspecialidade(especialidade);
          await this.#daoMecanico.alterar(mecanico); 
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
        let mecanico = await this.#daoMecanico.obterMecanicoPeloCpf(cpf); 
        if(mecanico == null) {
          alert("Mecânico com o CPF " + cpf + " não encontrado.");
        } else {
          await this.#daoMecanico.excluir(mecanico); 
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