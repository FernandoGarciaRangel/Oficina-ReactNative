"use strict";

import Mecanico from "/model/Mecanico.js";
import ModelError from "/model/ModelError.js";

export default class DaoMecanico {
  #mecanicos;

  constructor() {
    this.#mecanicos = [];
  }

  async incluir(mecanico) {
    if (mecanico == null)
      throw new ModelError("Mecânico não pode ser nulo");
    if (mecanico.getCpf() == null || mecanico.getCpf() == "")
      throw new ModelError("CPF do mecânico não pode ser nulo ou vazio");
    if (this.#mecanicos.some(m => m.getCpf() === mecanico.getCpf()))
      throw new ModelError("CPF já cadastrado");
    this.#mecanicos.push(mecanico);
  }

  async alterar(mecanico) {
    if (mecanico == null)
      throw new ModelError("Mecânico não pode ser nulo");
    if (mecanico.getCpf() == null || mecanico.getCpf() == "")
      throw new ModelError("CPF do mecânico não pode ser nulo ou vazio");
    let pos = this.#mecanicos.findIndex(m => m.getCpf() === mecanico.getCpf());
    if (pos < 0)
      throw new ModelError("Mecânico não encontrado");
    this.#mecanicos[pos] = mecanico;
  }

  async excluir(mecanico) {
    if (mecanico == null)
      throw new ModelError("Mecânico não pode ser nulo");
    if (mecanico.getCpf() == null || mecanico.getCpf() == "")
      throw new ModelError("CPF do mecânico não pode ser nulo ou vazio");
    let pos = this.#mecanicos.findIndex(m => m.getCpf() === mecanico.getCpf());
    if (pos < 0)
      throw new ModelError("Mecânico não encontrado");
    this.#mecanicos.splice(pos, 1);
  }

  async obterMecanicoPeloCpf(cpf) {
    if (cpf == null || cpf == "")
      throw new ModelError("CPF do mecânico não pode ser nulo ou vazio");
    return this.#mecanicos.find(m => m.getCpf() === cpf);
  }

  async obterMecanicos() {
    return this.#mecanicos;
  }
} 