import React, { Component } from "react";
import Produto from "../modelos/Produto";

type FormularioCadastroProdutoProps = {
  adicionarProduto: (produto: Produto) => void;
  tema: string;
};

type FormularioCadastroProdutoState = {
  nomeProduto: string;
  valor: string;
};

class FormularioCadastroProduto extends Component<FormularioCadastroProdutoProps, FormularioCadastroProdutoState> {
  constructor(props: FormularioCadastroProdutoProps) {
    super(props);
    this.state = {
      nomeProduto: "",
      valor: "",
    };
  }

  handleInputChange = (field: keyof FormularioCadastroProdutoState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ [field]: e.target.value } as Pick<FormularioCadastroProdutoState, keyof FormularioCadastroProdutoState>);
    };

  cadastrarProduto = (e: React.FormEvent) => {
    e.preventDefault();
    const { nomeProduto, valor } = this.state;
    const { adicionarProduto } = this.props;

    if (!nomeProduto || !valor) {
      alert("Nome do produto e valor são obrigatórios!");
      return;
    }

    const novoProduto = new Produto(nomeProduto, valor);
    adicionarProduto(novoProduto);

    // Resetar o estado
    this.setState({
      nomeProduto: "",
      valor: "",
    });
  };

  render() {
    const { tema } = this.props;
    const { nomeProduto, valor } = this.state;

    return (
      <div className="container-fluid">
        <form onSubmit={this.cadastrarProduto}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do Produto"
              value={nomeProduto}
              onChange={this.handleInputChange("nomeProduto")}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
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
            Cadastrar Produto
          </button>
        </form>
      </div>
    );
  }
}

export default FormularioCadastroProduto;
