import React, { Component } from "react";
import Cliente from "../modelos/Cliente";
import CPF from "../modelos/CPF";
import Telefone from "../modelos/Telefone";

type FormularioCadastroClienteProps = {
  adicionarCliente: (cliente: Cliente) => void;
  tema: string;
};

type FormularioCadastroClienteState = {
  nome: string;
  nomeSocial: string;
  cpf: string;
  ddd: string;
  numero: string;
};

class FormularioCadastroCliente extends Component<
  FormularioCadastroClienteProps,
  FormularioCadastroClienteState
> {
  constructor(props: FormularioCadastroClienteProps) {
    super(props);
    this.state = {
      nome: "",
      nomeSocial: "",
      cpf: "",
      ddd: "",
      numero: "",
    };
  }

  handleInputChange = (field: keyof FormularioCadastroClienteState) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      this.setState({ [field]: value } as Pick<
        FormularioCadastroClienteState,
        keyof FormularioCadastroClienteState
      >);
    };

  cadastrarCliente = (e: React.FormEvent) => {
    e.preventDefault();
    const { nome, nomeSocial, cpf, ddd, numero } = this.state;
    const { adicionarCliente } = this.props;

    if (!nome || !cpf || !ddd || !numero) {
      alert("Nome, CPF e Telefone são obrigatórios!");
      return;
    }

    const novoCliente = new Cliente(nome, nomeSocial, new CPF(cpf, new Date()));
    const novoTelefone = new Telefone(ddd, numero);
    novoCliente.adicionarTelefone(novoTelefone);
    adicionarCliente(novoCliente);

    // Resetar o estado
    this.setState({
      nome: "",
      nomeSocial: "",
      cpf: "",
      ddd: "",
      numero: "",
    });
  };

  render() {
    const { tema } = this.props;
    const { nome, nomeSocial, cpf, ddd, numero } = this.state;

    return (
      <div className="container-fluid">
        <form onSubmit={this.cadastrarCliente}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome"
              value={nome}
              onChange={this.handleInputChange("nome")}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome Social"
              value={nomeSocial}
              onChange={this.handleInputChange("nomeSocial")}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="CPF"
              value={cpf}
              onChange={this.handleInputChange("cpf")}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="DDD"
              value={ddd}
              onChange={this.handleInputChange("ddd")}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Número"
              value={numero}
              onChange={this.handleInputChange("numero")}
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            style={{ background: tema }}
          >
            Cadastrar
          </button>
        </form>
      </div>
    );
  }
}

export default FormularioCadastroCliente;
