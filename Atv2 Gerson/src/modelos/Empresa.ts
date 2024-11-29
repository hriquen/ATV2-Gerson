import Cliente from "./Cliente";
import Produto from "./Produto";


export default class Empresa {
    private clientes: Cliente[];
    private produtos: Produto[];

    constructor() {
        this.clientes = [];
        this.produtos = [];
    }

    public get getClientes(): Cliente[] {
        return this.clientes;
    }

    public get getProdutos(): Produto[] {
        return this.produtos;
    }

}
