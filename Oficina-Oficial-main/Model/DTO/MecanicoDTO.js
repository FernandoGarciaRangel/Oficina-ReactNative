"use strict";

export default class MecanicoDTO {
  #cpf;
  #nome;
  #email;
  #telefone;
  #especialidade;

  constructor(mecanico) {
    this.#cpf = mecanico.getCpf();
    this.#nome = mecanico.getNome();
    this.#email = mecanico.getEmail();
    this.#telefone = mecanico.getTelefone();
    this.#especialidade = mecanico.getEspecialidade();
  }

  getCpf() {
    return this.#cpf;
  }

  getNome() {
    return this.#nome;
  }

  getEmail() {
    return this.#email;
  }

  getTelefone() {
    return this.#telefone;
  }

  getEspecialidade() {
    return this.#especialidade;
  }
} 