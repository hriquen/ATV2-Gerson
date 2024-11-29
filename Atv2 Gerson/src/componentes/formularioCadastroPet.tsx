import React, { Component } from "react";
import Pet from "../modelos/Pet";
import Cliente from "../modelos/Cliente";

type FormularioCadastroPetProps = {
  clientes: Cliente[];
  aoCadastrarPet: (pet: Pet, dono: Cliente) => void;
  tema: string;
};

type FormularioCadastroPetState = {
  nome: string;
  tipo: string;
  raca: string;
  genero: string;
  dono: Cliente | null;
};

class FormularioCadastroPet extends Component<FormularioCadastroPetProps, FormularioCadastroPetState> {
  constructor(props: FormularioCadastroPetProps) {
    super(props);
    this.state = {
      nome: "",
      tipo: "",
      raca: "",
      genero: "",
      dono: null,
    };
  }

  handleInputChange = (field: keyof FormularioCadastroPetState) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      this.setState({ [field]: value } as unknown as Pick<
        FormularioCadastroPetState,
        keyof FormularioCadastroPetState
      >);
    };

  cadastrarPet = (e: React.FormEvent) => {
    e.preventDefault();
    const { nome, tipo, raca, genero, dono } = this.state;
    const { aoCadastrarPet } = this.props;

    if (!nome || !tipo || !raca || !genero || !dono) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    const novoPet = new Pet(nome, tipo, raca, genero, dono);
    aoCadastrarPet(novoPet, dono);

    // Resetar o estado
    this.setState({
      nome: "",
      tipo: "",
      raca: "",
      genero: "",
      dono: null,
    });
  };

  render() {
    const { clientes, tema } = this.props;
    const { nome, tipo, raca, genero, dono } = this.state;

    return (
      <div className="container-fluid">
        <form onSubmit={this.cadastrarPet}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do Pet"
              value={nome}
              onChange={this.handleInputChange("nome")}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tipo"
              value={tipo}
              onChange={this.handleInputChange("tipo")}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Raça"
              value={raca}
              onChange={this.handleInputChange("raca")}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Gênero"
              value={genero}
              onChange={this.handleInputChange("genero")}
            />
          </div>
          <div className="input-group mb-3">
            <select
              className="form-control"
              value={dono ? dono.getNome : ""}
              onChange={(e) =>
                this.setState({ dono: clientes.find((c) => c.getNome === e.target.value) || null })
              }
            >
              <option value="">Selecione um dono</option>
              {clientes.map((cliente) => (
                <option key={cliente.getCpf.getValor} value={cliente.getNome}>
                  {cliente.getNome}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            style={{ background: tema }}
          >
            Cadastrar Pet
          </button>
        </form>
      </div>
    );
  }
}

export default FormularioCadastroPet;
