import { Error } from "../../../arbol/error";
import { Errores } from "../../../arbol/errores";
import { Arreglo } from "../../arreglo";
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";

export class PushArreglo extends Instruccion{
  id: string;
  exp: Instruccion;

  constructor(linea: string, id: string, exp: Instruccion){
    super(linea);
    Object.assign(this, {id, exp});
  }

  ejecutar(e: Entorno) {
    const variable = e.getVariable(this.id);
    const arreglo = variable.getValor();
    const valor = this.exp.ejecutar(e);
    if(arreglo instanceof Arreglo){
      arreglo.push(valor);
    }
  }

}
