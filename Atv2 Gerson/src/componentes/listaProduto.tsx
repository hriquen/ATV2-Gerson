import React, { Component } from "react";
import Produto from "../modelos/Produto";

type ListaProdutoProps = {
  produtos: Produto[];
  tema: string;
  setProdutoSelecionado: (produto: Produto) => void;
  aoExcluirProduto: (nomeProduto: string) => void;
};

class ListaProduto extends Component<ListaProdutoProps> {
  render() {
    const { produtos, tema, setProdutoSelecionado, aoExcluirProduto } = this.props;

    return (
      <div className="container-fluid">
        <div className="list-group">
          {produtos.map((produto, index) => (
            <div key={index} className="list-group-item" style={{ backgroundColor: tema }}>
              <p>Nome do Produto/Serviço: {produto.getNomeProduto}</p>
              <p>Valor: R$ {produto.getValor}</p>
              <button
                className="btn btn-primary"
                onClick={() => setProdutoSelecionado(produto)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => aoExcluirProduto(produto.getNomeProduto)}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ListaProduto;
