import React, { Component } from "react";
import Pet from "../modelos/Pet";
import Cliente from "../modelos/Cliente";

type FormularioAtualizacaoPetProps = {
  petSelecionado: Pet | null;
  clientes: Cliente[];
  aoAtualizarPet: (pet: Pet) => void;
  tema: string;
};

type FormularioAtualizacaoPetState = {
  nome: string;
  tipo: string;
  raca: string;
  genero: string;
  dono: Cliente | null;
};

class FormularioAtualizacaoPet extends Component<
  FormularioAtualizacaoPetProps,
  FormularioAtualizacaoPetState
> {
  constructor(props: FormularioAtualizacaoPetProps) {
    super(props);

    this.state = {
      nome: "",
      tipo: "",
      raca: "",
      genero: "",
      dono: null,
    };
  }

  componentDidUpdate(prevProps: FormularioAtualizacaoPetProps) {
    if (
      this.props.petSelecionado &&
      this.props.petSelecionado !== prevProps.petSelecionado
    ) {
      const { petSelecionado } = this.props;
      this.setState({
        nome: petSelecionado?.getNome || "",
        tipo: petSelecionado?.getTipo || "",
        raca: petSelecionado?.getRaca || "",
        genero: petSelecionado?.getGenero || "",
        dono: petSelecionado?.getDono || null,
      });
    }
  }

  handleInputChange = (field: keyof FormularioAtualizacaoPetState) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      this.setState({
        [field]: field === "dono"
          ? this.props.clientes.find((c) => c.getNome === value) || null
          : value,
      } as Pick<FormularioAtualizacaoPetState, keyof FormularioAtualizacaoPetState>);
    };

  atualizarPet = (e: React.FormEvent) => {
    e.preventDefault();
    const { petSelecionado, aoAtualizarPet } = this.props;
    const { nome, tipo, raca, genero, dono } = this.state;

    if (petSelecionado) {
      petSelecionado.setNome = nome;
      petSelecionado.setTipo = tipo;
      petSelecionado.setRaca = raca;
      petSelecionado.setGenero = genero;
      petSelecionado.setDono = dono;

      aoAtualizarPet(petSelecionado);
      alert(`Pet atualizado: ${nome}`);
    }
  };

  render() {
    const { petSelecionado, clientes, tema } = this.props;
    const { nome, tipo, raca, genero, dono } = this.state;

    if (!petSelecionado) {
      return <p>Selecione um pet para atualizar.</p>;
    }

    return (
      <div className="container-fluid">
        <h5 style={{ color: tema }}>Atualizar Pet</h5>
        <form onSubmit={this.atualizarPet}>
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
              onChange={this.handleInputChange("dono")}
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
            Atualizar Pet
          </button>
        </form>
      </div>
    );
  }
}

export default FormularioAtualizacaoPet;
