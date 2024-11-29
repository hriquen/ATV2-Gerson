import Cliente from "./Cliente";

export default class Pet {
  public nome: string;
  public tipo: string;
  public raca: string;
  public genero: string;
  public dono: Cliente | null;

  constructor(
    nome: string,
    tipo: string,
    raca: string,
    genero: string,
    dono: Cliente | null = null
  ) {
    this.nome = nome;
    this.tipo = tipo;
    this.raca = raca;
    this.genero = genero;
    this.dono = dono;
  }

  public get getNome(): string {
    return this.nome;
  }

  public get getTipo(): string {
    return this.tipo;
  }

  public get getRaca(): string {
    return this.raca;
  }

  public get getGenero(): string {
    return this.genero;
  }

  public get getDono(): Cliente | null {
    return this.dono;
  }

  // Setters
  public set setNome(nome: string) {
    this.nome = nome;
  }

  public set setTipo(tipo: string) {
    this.tipo = tipo;
  }

  public set setRaca(raca: string) {
    this.raca = raca;
  }

  public set setGenero(genero: string) {
    this.genero = genero;
  }

  public set setDono(dono: Cliente | null) {
    this.dono = dono;
  }

  public toString(): string {
    const dono = this.dono ? this.dono.getNome : "Sem dono";
    return `Pet: ${this.nome}, Tipo: ${this.tipo}, Raça: ${this.raca}, Gênero: ${this.genero}, Dono: ${dono}`;
  }
}
