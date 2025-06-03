"use strict";

import ModelError from "/model/ModelError.js";

export default class Mecanico {
  #cpf;
  #nome;
  #email;
  #telefone;
  #especialidade;

  constructor(cpf, nome, email, telefone, especialidade) {
    this.setCpf(cpf);
    this.setNome(nome);
    this.setEmail(email);
    this.setTelefone(telefone);
    this.setEspecialidade(especialidade);
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

  setCpf(cpf) {
    Mecanico.validarCpf(cpf);
    this.#cpf = cpf;
  }

  setNome(nome) {
    Mecanico.validarNome(nome);
    this.#nome = nome;
  }

  setEmail(email) {
    Mecanico.validarEmail(email);
    this.#email = email;
  }

  setTelefone(telefone) {
    Mecanico.validarTelefone(telefone);
    this.#telefone = telefone;
  }

  setEspecialidade(especialidade) {
    Mecanico.validarEspecialidade(especialidade);
    this.#especialidade = especialidade;
  }

  static validarNome(nome) {
    if(nome == null || nome == "" || nome == undefined)
      throw new ModelError("O Nome do Mecânico não pode ser nulo!");
    if (nome.length > 40) 
      throw new ModelError("O Nome do Mecânico deve ter até 40 caracteres!");
    const padraoNome = /^[A-Za-zÀ-ÿ ]+$/;
    if (!padraoNome.test(nome)) 
      throw new ModelError("O Nome do Mecânico só pode conter letras!");
  }

  static validarCpf(strCpf) {
    let soma;
    let resto;
    let i;

    soma = 0;
    strCpf = strCpf.replace(".", "");
    strCpf = strCpf.replace(".", "");
    strCpf = strCpf.replace("-", "");

    if (strCpf == "00000000000") 
      throw new ModelError("O CPF não apresenta o formato 999.999.999-00");

    for (i = 1; i <= 9; i++)
      soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strCpf.substring(9, 10)))
      throw new ModelError("O CPF não foi digitado corretamente");

    soma = 0;
    for (i = 1; i <= 10; i++)
      soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strCpf.substring(10, 11))) 
      throw new ModelError("O CPF não foi digitado corretamente");
  }

  static validarTelefone(telefone) {
    if(telefone == null || telefone == "" || telefone == undefined)
      throw new ModelError("O Telefone do Mecânico não pode ser nulo!");

    const padraoTelefone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    if (!padraoTelefone.test(telefone)) 
      throw new ModelError("O Telefone do Mecânico não foi preenchido corretamente!");
  }

  static validarEmail(email) {
    if(email == null || email == "" || email == undefined)
      throw new ModelError("O Email do Mecânico não pode ser nulo!");

    const padraoEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!padraoEmail.test(email)) 
      throw new ModelError("O Email do Mecânico não foi preenchido corretamente!");
  }

  static validarEspecialidade(especialidade) {
    if(especialidade == null || especialidade == "" || especialidade == undefined)
      throw new ModelError("A Especialidade do Mecânico não pode ser nula!");
    if (especialidade.length > 50) 
      throw new ModelError("A Especialidade do Mecânico deve ter até 50 caracteres!");
  }
}
  