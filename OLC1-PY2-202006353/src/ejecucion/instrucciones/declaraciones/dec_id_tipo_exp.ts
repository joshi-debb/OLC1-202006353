
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import { Variable } from "../../variable";

export class DecIdTipoExp extends Instruccion{
  reasignable: boolean;
  id: string;
  tipo: string;
  exp: Instruccion;
  type_generador: string;
  columna: string;

  constructor(linea: string, columna:string, reasignable: boolean, id: string, tipo: string, exp: Instruccion, type_generador: String){
    super(linea);
    Object.assign(this, {reasignable, id, tipo, exp, type_generador});
    this.columna = columna;
  }

  ejecutar(e: Entorno) {
    let variable = e.getVariable(this.id);
    const valor = this.exp.ejecutar(e);
    variable = new Variable({valor, id: this.id, tipo: this.tipo, fila:  this.linea, columna: this.columna });
    e.setVariable(variable);
  }

}