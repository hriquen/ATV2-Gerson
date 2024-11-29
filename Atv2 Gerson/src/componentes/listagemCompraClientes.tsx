import React, { Component } from "react";
import Cliente from "../modelos/Cliente";

type ListaComprasClienteProps = {
  cliente: Cliente;
  tema: string;
};

class ListaComprasCliente extends Component<ListaComprasClienteProps> {
  render() {
    const { cliente, tema } = this.props;
    const produtosConsumidos = cliente.getProdutosConsumidos;

    return (
      <div className="container-fluid">
        <h5 style={{ color: tema }}>Compras de {cliente.getNome}</h5>
        <ul className="list-group">
          {produtosConsumidos.length === 0 ? (
            <p>Este cliente ainda não comprou nada.</p>
          ) : (
            produtosConsumidos.map((item, index) => (
              <li key={index} className="list-group-item" style={{ backgroundColor: tema }}>
                Produto: {item.produto.getNomeProduto} - Quantidade: {item.quantidade}
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
}

export default ListaComprasCliente;
