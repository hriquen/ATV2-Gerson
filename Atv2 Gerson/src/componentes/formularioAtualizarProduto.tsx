import React, { Component } from "react";
import Produto from "../modelos/Produto";

type FormularioAtualizacaoProdutoProps = {
  produtoSelecionado: Produto | null;
  aoAtualizarProduto: (produto: Produto) => void;
  tema: string;
};

type FormularioAtualizacaoProdutoState = {
  nome: string;
  valor: string;
};

class FormularioAtualizacaoProduto extends Component<
  FormularioAtualizacaoProdutoProps,
  FormularioAtualizacaoProdutoState
> {
  constructor(props: FormularioAtualizacaoProdutoProps) {
    super(props);

    this.state = {
      nome: "",
      valor: "",
    };
  }

  componentDidUpdate(prevProps: FormularioAtualizacaoProdutoProps) {
    if (
      this.props.produtoSelecionado &&
      this.props.produtoSelecionado !== prevProps.produtoSelecionado
    ) {
      const { produtoSelecionado } = this.props;
      this.setState({
        nome: produtoSelecionado?.getNomeProduto || "",
        valor: produtoSelecionado?.getValor || "",
      });
    }
  }

  handleInputChange = (field: keyof FormularioAtualizacaoProdutoState) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      this.setState({ [field]: value } as Pick<FormularioAtualizacaoProdutoState, keyof FormularioAtualizacaoProdutoState>);
    };

  atualizarProduto = (e: React.FormEvent) => {
    e.preventDefault();
    const { produtoSelecionado, aoAtualizarProduto } = this.props;
    const { nome, valor } = this.state;

    if (produtoSelecionado) {
      produtoSelecionado.setNomeProduto = nome;
      produtoSelecionado.setValor = valor;

      aoAtualizarProduto(produtoSelecionado);
      alert(`Produto/Serviço atualizado: ${nome}`);
    }
  };

  render() {
    const { produtoSelecionado, tema } = this.props;
    const { nome, valor } = this.state;

    if (!produtoSelecionado) {
      return <p>Selecione um produto para atualizar.</p>;
    }

    return (
      <div className="container-fluid">
        <h5 style={{ color: tema }}>Atualizar Produto</h5>
        <form onSubmit={this.atualizarProduto}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do Produto/Serviço"
              value={nome}
              onChange={this.handleInputChange("nome")}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Valor"
              value={valor}
              onChange={this.handleInputChange("valor")}
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            style={{ background: tema }}
          >
            Atualizar Produto/Serviço
          </button>
        </form>
      </div>
    );
  }
}

export default FormularioAtualizacaoProduto;
