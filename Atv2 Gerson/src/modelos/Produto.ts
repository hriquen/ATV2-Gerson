export default class Produto {
    public nomeProduto: string;
    public valor: string;

    constructor(nomeProduto: string, valor: string) {
        this.nomeProduto = nomeProduto;
        this.valor = valor;
    }

    public get getNomeProduto(): string {
        return this.nomeProduto;
    }
    public set setNomeProduto(nomeProduto: string) {
        this.nomeProduto = nomeProduto;
      }


    public get getValor(): string {
        return this.valor;
    }
    public set setValor(valor: string) {
        this.valor = valor;
      }
}
