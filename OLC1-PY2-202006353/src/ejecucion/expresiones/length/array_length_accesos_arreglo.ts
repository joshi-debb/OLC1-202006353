import { Error } from "../../../AST/error";
import { Errores } from "../../../AST/errores";
import { Arreglo } from "../../arreglo";
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";

export class ArrayLengthAccesosArreglo extends Instruccion{
  id: string;
  lista_accesos: Array<Instruccion>;

  constructor(linea: string, id: string, lista_accesos: Array<Instruccion>){
    super(linea);
    Object.assign(this, {id, lista_accesos});
  }

  ejecutar(e: Entorno) {
    const variable = e.getVariable(this.id);

    let arreglo = variable.getValor() as Arreglo;
    for(let instruccion of this.lista_accesos){
      const index = instruccion.ejecutar(e);
      arreglo = arreglo.getValue(index);
    }
    return arreglo.getSize();
  }

}
