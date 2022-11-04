export class Variable {

  valor: any;
  id: string;
  tipo: string;
  fila: string;
  columna: string


  constructor({valor = null, id, tipo, fila, columna}: {valor: any, id:string, tipo: any, fila: any,columna: any}) {
    Object.assign(this, {valor, id, tipo, fila, columna});
  }

  getValor() : any {
    return this.valor;
  }

  public toString() : string{
    let salida = `VARIABLE  <===>  Id: ${this.id} <===>  Tipo: ${this.tipo}  <===>  Fila: ${this.fila}  <===>  Columna: ${this.columna} `;
    return salida;
  }

}