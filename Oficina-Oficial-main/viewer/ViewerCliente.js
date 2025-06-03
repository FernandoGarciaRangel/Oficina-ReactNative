"use strict";

import Status from "/model/Status.js";

export default class ViewerCliente {
  #ctrl;
  #divApresentacao;
  #divEdicao;
  #inputCpf;
  #inputNome;
  #inputEmail;
  #inputTelefone;
  #inputEndereco;
  #btnSalvar;
  #btnCancelar;

  constructor(ctrl) {
    this.#ctrl = ctrl;
    this.#divApresentacao = document.getElementById("divApresentacao");
    this.#divEdicao = document.getElementById("divEdicao");
    this.#inputCpf = document.getElementById("inputCpf");
    this.#inputNome = document.getElementById("inputNome");
    this.#inputEmail = document.getElementById("inputEmail");
    this.#inputTelefone = document.getElementById("inputTelefone");
    this.#inputEndereco = document.getElementById("inputEndereco");
    this.#btnSalvar = document.getElementById("btnSalvar");
    this.#btnCancelar = document.getElementById("btnCancelar");

    this.#btnSalvar.addEventListener("click", () => this.#ctrl.efetivar(
      this.#inputCpf.value,
      this.#inputNome.value,
      this.#inputEmail.value,
      this.#inputTelefone.value,
      this.#inputEndereco.value
    ));

    this.#btnCancelar.addEventListener("click", () => this.#ctrl.cancelar());
  }

  statusApresentacao() {
    this.#divApresentacao.style.display = "block";
    this.#divEdicao.style.display = "none";
  }

  statusEdicao(status) {
    this.#divApresentacao.style.display = "none";
    this.#divEdicao.style.display = "block";

    if (status == Status.INCLUINDO) {
      this.#inputCpf.value = "";
      this.#inputNome.value = "";
      this.#inputEmail.value = "";
      this.#inputTelefone.value = "";
      this.#inputEndereco.value = "";
      this.#inputCpf.disabled = false;
    } else {
      this.#inputCpf.disabled = true;
    }
  }

  apresentar(pos, total, clienteDTO) {
    if (clienteDTO == null) {
      document.getElementById("lblCpf").textContent = "";
      document.getElementById("lblNome").textContent = "";
      document.getElementById("lblEmail").textContent = "";
      document.getElementById("lblTelefone").textContent = "";
      document.getElementById("lblEndereco").textContent = "";
      document.getElementById("lblPos").textContent = "0/0";
    } else {
      document.getElementById("lblCpf").textContent = clienteDTO.getCpf();
      document.getElementById("lblNome").textContent = clienteDTO.getNome();
      document.getElementById("lblEmail").textContent = clienteDTO.getEmail();
      document.getElementById("lblTelefone").textContent = clienteDTO.getTelefone();
      document.getElementById("lblEndereco").textContent = clienteDTO.getEndereco();
      document.getElementById("lblPos").textContent = pos + "/" + total;
    }
  }
} 