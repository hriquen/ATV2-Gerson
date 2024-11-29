import React, { Component } from "react";
import Cliente from "../modelos/Cliente";

type ListaClienteProps = {
  clientes: Cliente[];
  tema: string;
  aoExcluirCliente: (cpf: string) => void;
  setClienteSelecionado: (cliente: Cliente) => void;
};

class ListaCliente extends Component<ListaClienteProps> {
  render() {
    const { clientes, tema, setClienteSelecionado, aoExcluirCliente } = this.props;

    return (
      <div className="container-fluid">
        <div className="list-group">
          {clientes.map((cliente, index) => (
            <div key={index} className="list-group-item" style={{ backgroundColor: tema }}>
              <p>Nome: {cliente.getNome}</p>
              <p>CPF: {cliente.getCpf.getValor}</p>
              <p>Data de Cadastro: {cliente.getDataCadastro.toLocaleDateString()}</p>
              <p>Telefones:</p>
              <ul>
                {cliente.getTelefones.map((telefone, i) => (
                  <li key={i}>
                    ({telefone.getDdd}) {telefone.getNumero}
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-end">
                <button
                  onClick={() => setClienteSelecionado(cliente)}
                  className="btn btn-primary"
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => aoExcluirCliente(cliente.getCpf.getValor)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ListaCliente;
