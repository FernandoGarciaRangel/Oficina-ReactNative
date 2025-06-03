"use strict";

import Cliente from "/model/Cliente.js";
import ModelError from "/model/ModelError.js";

export default class DaoCliente {
  #clientes;

  constructor() {
    this.#clientes = [];
  }

  async incluir(cliente) {
    if (cliente == null)
      throw new ModelError("Cliente não pode ser nulo");
    if (cliente.getCpf() == null || cliente.getCpf() == "")
      throw new ModelError("CPF do cliente não pode ser nulo ou vazio");
    if (this.#clientes.some(c => c.getCpf() === cliente.getCpf()))
      throw new ModelError("CPF já cadastrado");
    this.#clientes.push(cliente);
  }

  async alterar(cliente) {
    if (cliente == null)
      throw new ModelError("Cliente não pode ser nulo");
    if (cliente.getCpf() == null || cliente.getCpf() == "")
      throw new ModelError("CPF do cliente não pode ser nulo ou vazio");
    let pos = this.#clientes.findIndex(c => c.getCpf() === cliente.getCpf());
    if (pos < 0)
      throw new ModelError("Cliente não encontrado");
    this.#clientes[pos] = cliente;
  }

  async excluir(cliente) {
    if (cliente == null)
      throw new ModelError("Cliente não pode ser nulo");
    if (cliente.getCpf() == null || cliente.getCpf() == "")
      throw new ModelError("CPF do cliente não pode ser nulo ou vazio");
    let pos = this.#clientes.findIndex(c => c.getCpf() === cliente.getCpf());
    if (pos < 0)
      throw new ModelError("Cliente não encontrado");
    this.#clientes.splice(pos, 1);
  }

  async obterClientePeloCpf(cpf) {
    if (cpf == null || cpf == "")
      throw new ModelError("CPF do cliente não pode ser nulo ou vazio");
    return this.#clientes.find(c => c.getCpf() === cpf);
  }

  async obterClientes() {
    return this.#clientes;
  }
} 