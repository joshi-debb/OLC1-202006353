import { Error } from "../../../arbol/error";
import { Errores } from "../../../arbol/errores";
import { Arreglo } from "../../arreglo";
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import { Type } from "../../type";

export class ArrayLengthAccesosType extends Instruccion {
  id: string;
  lista_accesos: Array<String | Array<Instruccion>>;

  constructor(linea: string, id: string, lista_accesos: Array<String | Array<Instruccion>>) {
    super(linea);
    Object.assign(this, { id, lista_accesos });
  }

  ejecutar(e: Entorno) {
    //Busqueda y validaciones de variable
    const variable = e.getVariable(this.id);
    
    
  }

}
