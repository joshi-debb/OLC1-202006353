
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";


export class ArrayPopAccesosType extends Instruccion {
  id: string;
  lista_accesos: Array<String | Array<Instruccion>>;

  constructor(linea: string, id: string, lista_accesos: Array<String | Array<Instruccion>>) {
    super(linea);
    Object.assign(this, { id, lista_accesos });
  }

  ejecutar(e: Entorno) {
    //Busqueda y validaciones de variable
    const variable = e.getVariable(this.id);
    let actual = variable.getValor();
    return actual.pop();
  }

}
