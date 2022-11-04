import { Instruccion } from "./instruccion";
import { TIPO_DATO } from "./tipo";
import { Variable } from "./variable";

export class Funcion{
  id: string;
  instrucciones: Array<Instruccion>;
  tipo: string;
  lista_parametros: Array<Variable>;
  fila: string;
  columna: string;

  constructor(id: string, instrucciones: Array<Instruccion>, tipo: string, lista_parametros: Array<Variable> = null, fila: string, columna: string){
    Object.assign(this, {id, instrucciones, tipo, lista_parametros, fila, columna});
  }

  hasParametros() : boolean{
    return this.lista_parametros != null;
  }

  getParametrosSize() : number{
    return this.hasParametros() ? this.lista_parametros.length : 0;
  }

  public toString() : string{
    let salida = `FUNCION <===> Id: ${this.id} <===> Tipo: ${this.tipo}  <===>  Fila: ${this.fila} <===> Columna: ${this.columna}`;
    return salida;
  }
}
