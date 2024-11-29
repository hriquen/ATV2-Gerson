import React, { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import Cliente from "../modelos/Cliente";
import Produto from "../modelos/Produto";
import ListaProduto from "./listaProduto";
import FormularioCadastroProduto from "./formularioCadastroProduto";
import ListaPet from "./listaPet";
import FormularioCadastroPet from "./formularioCadastroPet";
import Pet from "../modelos/Pet";
import RegistroCompraCliente from "./registroCompra";
import FormularioAtualizacaoCliente from "./formularioAtualizarCliente";
import FormularioAtualizacaoPet from "./formularioAtualizarPet";
import FormularioAtualizacaoProduto from "./formularioAtualizarProduto";

type RoteadorState = {
  tela: string;
  clientes: Cliente[];
  clienteSelecionado: Cliente | null;
  petSelecionado: Pet | null;
  produtoSelecionado: Produto | null;
  produtos: Produto[];
  pets: Pet[];
};

class Roteador extends Component<{}, RoteadorState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tela: "Clientes",
      clientes: [],
      clienteSelecionado: null,
      petSelecionado: null,
      produtoSelecionado: null,
      produtos: [],
      pets: [],
    };
  }

  atualizarTela = (valor: string) => {
    this.setState({ tela: valor });
  };

  selecionarClienteParaAtualizacao = (cliente: Cliente) => {
    this.setState({ clienteSelecionado: cliente, tela: "Atualizar Cliente" });
  };

  selecionarPetParaAtualizacao = (pet: Pet) => {
    this.setState({ petSelecionado: pet, tela: "Atualizar Pet" });
  };

  selecionarProdutoParaAtualizacao = (produto: Produto) => {
    this.setState({ produtoSelecionado: produto, tela: "Atualizar Produto/Serviço" });
  };

  adicionarCliente = (cliente: Cliente) => {
    this.setState((prevState) => ({
      clientes: [...prevState.clientes, cliente],
    }));
  };

  adicionarProduto = (produto: Produto) => {
    this.setState((prevState) => ({
      produtos: [...prevState.produtos, produto],
    }));
  };

  excluirCliente = (cpf: string) => {
    this.setState((prevState) => ({
      clientes: prevState.clientes.filter(
        (cliente) => cliente.getCpf.getValor !== cpf
      ),
    }));
  };

  excluirPet = (nome: string) => {
    this.setState((prevState) => ({
      pets: prevState.pets.filter((pet) => pet.getNome !== nome),
    }));
  };

  excluirProduto = (nomeProduto: string) => {
    this.setState((prevState) => ({
      produtos: prevState.produtos.filter(
        (produto) => produto.getNomeProduto !== nomeProduto
      ),
    }));
  };

  adicionarPet = (pet: Pet, dono: Cliente) => {
    dono.adicionarPet(pet);
    this.setState((prevState) => ({
      pets: [...prevState.pets, pet],
    }));
  };

  registrarCompra = (cliente: Cliente, produto: Produto, quantidade: number) => {
    cliente.adicionarProdutoConsumido(produto, quantidade);
  };

  atualizarCliente = (clienteAtualizado: Cliente) => {
    this.setState((prevState) => ({
      clientes: prevState.clientes.map((cliente) =>
        cliente.getCpf.getValor === clienteAtualizado.getCpf.getValor
          ? clienteAtualizado
          : cliente
      ),
      clienteSelecionado: null,
    }));
  };

  atualizarPet = (petAtualizado: Pet) => {
    this.setState((prevState) => ({
      pets: prevState.pets.map((pet) =>
        pet.getNome === petAtualizado.getNome ? petAtualizado : pet
      ),
      petSelecionado: null,
    }));
  };

  atualizarProduto = (produtoAtualizado: Produto) => {
    this.setState((prevState) => ({
      produtos: prevState.produtos.map((produto) =>
        produto.getNomeProduto === produtoAtualizado.getNomeProduto
          ? produtoAtualizado
          : produto
      ),
      produtoSelecionado: null,
    }));
  };

  construirView = () => {
    const { tela, clientes, produtos, pets, clienteSelecionado, petSelecionado, produtoSelecionado } = this.state;

    switch (tela) {
      case "Clientes":
        return (
          <ListaCliente
            clientes={clientes}
            tema="#e3f2fd"
            setClienteSelecionado={this.selecionarClienteParaAtualizacao}
            aoExcluirCliente={this.excluirCliente}
          />
        );
      case "Cadastros Clientes":
        return <FormularioCadastroCliente adicionarCliente={this.adicionarCliente} tema="#e3f2fd" />;
      case "Pets":
        return <ListaPet pets={pets} clientes={clientes} setPetSelecionado={this.selecionarPetParaAtualizacao} aoExcluirPet={this.excluirPet} tema="#e3f2fd" />;
      case "Cadastros Pets":
        return <FormularioCadastroPet clientes={clientes} aoCadastrarPet={this.adicionarPet} tema="#e3f2fd" />;
      case "Produtos/Serviços":
        return <ListaProduto produtos={produtos} setProdutoSelecionado={this.selecionarProdutoParaAtualizacao} tema="#e3f2fd" aoExcluirProduto={this.excluirProduto} />;
      case "Cadastros Produtos/Serviços":
        return <FormularioCadastroProduto adicionarProduto={this.adicionarProduto} tema="#e3f2fd" />;
      case "Registrar Compra":
        return <RegistroCompraCliente clientes={clientes} produtos={produtos} aoRegistrarCompra={this.registrarCompra} tema="#e3f2fd" />;
      case "Atualizar Cliente":
        return (
          <FormularioAtualizacaoCliente
            clienteSelecionado={clienteSelecionado}
            aoAtualizarCliente={this.atualizarCliente}
            tema="#e3f2fd"
          />
        );
      case "Atualizar Pet":
        return (
          <FormularioAtualizacaoPet
            petSelecionado={petSelecionado}
            aoAtualizarPet={this.atualizarPet}
            tema="#e3f2fd"
            clientes={[]}
          />
        );
      case "Atualizar Produto/Serviço":
        return (
          <FormularioAtualizacaoProduto
            produtoSelecionado={produtoSelecionado}
            aoAtualizarProduto={this.atualizarProduto}
            tema="#e3f2fd"
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <BarraNavegacao
          seletorView={this.atualizarTela}
          tema="#e3f2fd"
          botoes={[
            "Clientes",
            "Cadastros Clientes",
            "Pets",
            "Cadastros Pets",
            "Produtos/Serviços",
            "Cadastros Produtos/Serviços",
            "Registrar Compra",
          ]}
        />
        {this.construirView()}
      </>
    );
  }
}

export default Roteador;
