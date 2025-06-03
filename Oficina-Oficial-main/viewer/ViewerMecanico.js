"use strict";

import Status from "/model/Status.js";

export default class ViewerMecanico {
  #ctrl;
  #divApresentacao;
  #divEdicao;
  #inputCpf;
  #inputNome;
  #inputEmail;
  #inputTelefone;
  #inputEspecialidade;
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
    this.#inputEspecialidade = document.getElementById("inputEspecialidade");
    this.#btnSalvar = document.getElementById("btnSalvar");
    this.#btnCancelar = document.getElementById("btnCancelar");

    this.#btnSalvar.addEventListener("click", () => this.#ctrl.efetivar(
      this.#inputCpf.value,
      this.#inputNome.value,
      this.#inputEmail.value,
      this.#inputTelefone.value,
      this.#inputEspecialidade.value
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
      this.#inputEspecialidade.value = "";
      this.#inputCpf.disabled = false;
    } else {
      this.#inputCpf.disabled = true;
    }
  }

  apresentar(pos, total, mecanicoDTO) {
    if (mecanicoDTO == null) {
      document.getElementById("lblCpf").textContent = "";
      document.getElementById("lblNome").textContent = "";
      document.getElementById("lblEmail").textContent = "";
      document.getElementById("lblTelefone").textContent = "";
      document.getElementById("lblEspecialidade").textContent = "";
      document.getElementById("lblPos").textContent = "0/0";
    } else {
      document.getElementById("lblCpf").textContent = mecanicoDTO.getCpf();
      document.getElementById("lblNome").textContent = mecanicoDTO.getNome();
      document.getElementById("lblEmail").textContent = mecanicoDTO.getEmail();
      document.getElementById("lblTelefone").textContent = mecanicoDTO.getTelefone();
      document.getElementById("lblEspecialidade").textContent = mecanicoDTO.getEspecialidade();
      document.getElementById("lblPos").textContent = pos + "/" + total;
    }
  }
} 