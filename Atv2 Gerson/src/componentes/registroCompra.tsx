import React, { Component } from "react";
import Cliente from "../modelos/Cliente";
import Produto from "../modelos/Produto";

type RegistrarCompraProps = {
  clientes: Cliente[];
  produtos: Produto[];
  aoRegistrarCompra: (cliente: Cliente, produto: Produto, quantidade: number) => void;
  tema: string;
};

type RegistrarCompraState = {
  clienteSelecionado: Cliente | null;
  produtoSelecionado: Produto | null;
  quantidade: number;
};

class RegistrarCompra extends Component<RegistrarCompraProps, RegistrarCompraState> {
  constructor(props: RegistrarCompraProps) {
    super(props);
    this.state = {
      clienteSelecionado: null,
      produtoSelecionado: null,
      quantidade: 1,
    };
  }

  registrarCompra = (e: React.FormEvent) => {
    e.preventDefault();
    const { clienteSelecionado, produtoSelecionado, quantidade } = this.state;

    if (!clienteSelecionado || !produtoSelecionado || quantidade <= 0) {
      alert("Por favor, selecione um cliente, um produto/serviço e insira uma quantidade válida.");
      return;
    }

    this.props.aoRegistrarCompra(clienteSelecionado, produtoSelecionado, quantidade);
    alert(`Compra registrada: ${clienteSelecionado.getNome} comprou ${quantidade}x ${produtoSelecionado.getNomeProduto}.`);
    this.setState({ quantidade: 1 });
  };

  render() {
    const { clientes, produtos, tema } = this.props;
    const { quantidade } = this.state;

    return (
      <div className="container-fluid">
        <form onSubmit={this.registrarCompra}>
          <div className="input-group mb-3">
            <select
              className="form-control"
              onChange={(e) => this.setState({ clienteSelecionado: clientes[parseInt(e.target.value)] })}
              defaultValue=""
            >
              <option value="" disabled>
                Selecione um Cliente
              </option>
              {clientes.map((cliente, index) => (
                <option key={index} value={index}>
                  {cliente.getNome}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <select
              className="form-control"
              onChange={(e) => this.setState({ produtoSelecionado: produtos[parseInt(e.target.value)] })}
              defaultValue=""
            >
              <option value="" disabled>
                Selecione um Produto/Serviço
              </option>
              {produtos.map((produto, index) => (
                <option key={index} value={index}>
                  {produto.getNomeProduto}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Quantidade"
              value={quantidade}
              onChange={(e) => this.setState({ quantidade: Number(e.target.value) })}
            />
          </div>
          <button type="submit" className="btn btn-outline-secondary" style={{ background: tema }}>
            Registrar Compra
          </button>
        </form>
      </div>
    );
  }
}

export default RegistrarCompra;
