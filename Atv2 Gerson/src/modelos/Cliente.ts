import CPF from "./CPF";
import Pet from "./Pet";
import Produto from "./Produto";
import Telefone from "./Telefone";

type ProdutoConsumido = {
    produto: Produto;
    quantidade: number;
};

export default class Cliente {
    public nome: string;
    public nomeSocial: string;
    public cpf: CPF;
    private dataCadastro: Date;
    private telefones: Telefone[];
    private produtosConsumidos: ProdutoConsumido[];
    private pets: Pet[];

    constructor(nome: string, nomeSocial: string, cpf: CPF) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.cpf = cpf;
        this.dataCadastro = new Date();
        this.telefones = [];
        this.produtosConsumidos = [];
        this.pets = [];
    }

    public get getNome(): string {
        return this.nome;
    }

    public get getCpf(): CPF {
        return this.cpf;
    }


    public get getDataCadastro(): Date {
        return this.dataCadastro;
    }

    public get getTelefones(): Telefone[] {
        return this.telefones;
    }

    public adicionarTelefone(telefone: Telefone): void {
        this.telefones.push(telefone);
    }

    public get getProdutosConsumidos(): ProdutoConsumido[] {
        return this.produtosConsumidos;
    }


    public get getPets(): Pet[] {
        return this.pets;
    }

    public toString(): string {
        return `${this.nome} (${this.cpf.getValor})`;
    }

    public adicionarProdutoConsumido(produto: Produto, quantidade: number): void {
        this.produtosConsumidos.push({ produto, quantidade });
    }

    public adicionarPet(pet: Pet): void {
        this.pets.push(pet);
        pet.dono = this;
    }
}
