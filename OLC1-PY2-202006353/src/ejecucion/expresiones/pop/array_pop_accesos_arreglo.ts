
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";

export class ArrayPopAccesosArreglo extends Instruccion{
  id: string;
  lista_accesos: Array<Instruccion>;

  constructor(linea: string, id: string, lista_accesos: Array<Instruccion>){
    super(linea);
    Object.assign(this, {id, lista_accesos});
  }

  ejecutar(e: Entorno) {
    const variable = e.getVariable(this.id);
    let arreglo = variable.getValor();
    for(let exp of this.lista_accesos){
      const index = exp.ejecutar(e);
      arreglo = arreglo.getValue(index);
    }
    return arreglo.pop();
  }

}
