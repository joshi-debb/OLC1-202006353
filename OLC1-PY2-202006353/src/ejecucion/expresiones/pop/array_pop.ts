
import { Arreglo } from "../../arreglo";
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";

export class ArrayPop extends Instruccion{
  id: string;

  constructor(linea: string, id: string){
    super(linea);
    Object.assign(this, {id});
  }

  ejecutar(e: Entorno) {
    const variable = e.getVariable(this.id);
    const arreglo = variable.getValor() as Arreglo;
    return arreglo.pop();
  }

}
