
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import { Variable } from "../../variable";

export class DecId extends Instruccion{
  id: string;
  reasignable: boolean;
  columna: string;

  constructor(linea: string, columna:string, reasignable: boolean, id: string){
    super(linea);
    Object.assign(this, {id, reasignable});
    this.columna = columna;
  }

  ejecutar(e: Entorno) {
    let variable = e.getVariable(this.id);
    variable = new Variable({valor: null, id: this.id, tipo: null, fila: this.linea, columna: this.columna});
    e.setVariable(variable);
  }
}
