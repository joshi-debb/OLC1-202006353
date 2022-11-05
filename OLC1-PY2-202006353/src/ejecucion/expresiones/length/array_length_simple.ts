import { Error } from "../../../AST/error";
import { Errores } from "../../../AST/errores";
import { Arreglo } from "../../arreglo";
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";

export class ArrayLengthSimple extends Instruccion{
  id: string;

  constructor(linea: string, id: string){
    super(linea);
    Object.assign(this, {id});
  }

  ejecutar(e: Entorno) {
    const variable = e.getVariable(this.id);
    const arreglo = variable.getValor() as Arreglo
    return arreglo.getSize();
  }

}
