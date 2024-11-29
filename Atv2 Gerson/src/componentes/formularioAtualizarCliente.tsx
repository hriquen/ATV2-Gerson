import React, { Component } from "react";
import Cliente from "../modelos/Cliente";

type FormularioAtualizacaoClienteProps = {
  clienteSelecionado: Cliente | null;
  aoAtualizarCliente: (cliente: Cliente) => void;
  tema: string;
};

type FormularioAtualizacaoClienteState = {
  nome: string;
  nomeSocial: string;
  cpf: string;
};

class FormularioAtualizacaoCliente extends Component<
  FormularioAtualizacaoClienteProps,
  FormularioAtualizacaoClienteState
> {
  constructor(props: FormularioAtualizacaoClienteProps) {
    super(props);

    this.state = {
      nome: "",
      nomeSocial: "",
      cpf: "",
    };
  }

  componentDidUpdate(prevProps: FormularioAtualizacaoClienteProps) {
    if (
      this.props.clienteSelecionado &&
      this.props.clienteSelecionado !== prevProps.clienteSelecionado
    ) {
      const { clienteSelecionado } = this.props;
      this.setState({
        nome: clienteSelecionado?.getNome || "",
        nomeSocial: clienteSelecionado?.nomeSocial || "",
        cpf: clienteSelecionado?.getCpf.getValor || "",
      });
    }
  }

  atualizarCliente = (e: React.FormEvent) => {
    e.preventDefault();
    const { clienteSelecionado, aoAtualizarCliente } = this.props;
    const { nome, nomeSocial } = this.state;

    if (clienteSelecionado) {
      clienteSelecionado.nome = nome;
      clienteSelecionado.nomeSocial = nomeSocial;
      // eslint-disable-next-line no-self-assign
      clienteSelecionado.cpf = clienteSelecionado.cpf; // Mantendo o CPF
      aoAtualizarCliente(clienteSelecionado);
      alert(`Cliente atualizado: ${nome}`);
    }
  };

  handleInputChange = (field: keyof FormularioAtualizacaoClienteState) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ [field]: e.target.value } as Pick<
        FormularioAtualizacaoClienteState,
        keyof FormularioAtualizacaoClienteState
      >);
    };

  render() {
    const { clienteSelecionado, tema } = this.props;
    const { nome, nomeSocial, cpf } = this.state;

    if (!clienteSelecionado) {
      return <p>Selecione um cliente para atualizar.</p>;
    }

    return (
      <div className="container-fluid">
        <h5 style={{ color: tema }}>Atualizar Cliente</h5>
        <form onSubmit={this.atualizarCliente}>
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
              disabled
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            style={{ background: tema }}
          >
            Atualizar Cliente
          </button>
        </form>
      </div>
    );
  }
}

export default FormularioAtualizacaoCliente;
