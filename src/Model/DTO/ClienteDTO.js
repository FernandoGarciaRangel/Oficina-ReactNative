"use strict";

export default class ClienteDTO {
  #cpf;
  #nome;
  #email;
  #telefone;
  #endereco;

  constructor(cliente) {
    this.#cpf = cliente.getCpf();
    this.#nome = cliente.getNome();
    this.#email = cliente.getEmail();
    this.#telefone = cliente.getTelefone();
    this.#endereco = cliente.getEndereco();
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

  getEndereco() {
    return this.#endereco;
  }
} 