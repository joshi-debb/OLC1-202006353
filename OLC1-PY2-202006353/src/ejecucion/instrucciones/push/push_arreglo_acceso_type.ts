import { Error } from "../../../arbol/error";
import { Errores } from "../../../arbol/errores";
import { Arreglo } from "../../arreglo";
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import { Type } from "../../type";

export class PushArregloAccesoType extends Instruccion {
  id: string;
  lista_accesos: Array<String | Array<Instruccion>>;
  exp: Instruccion;

  constructor(linea: string, id: string, lista_accesos: Array<String | Array<Instruccion>>, exp: Instruccion) {
    super(linea);
    Object.assign(this, { id, lista_accesos, exp });
  }

  ejecutar(e: Entorno) {
    const variable = e.getVariable(this.id);
    let actual = variable.getValor();
    const valor = this.exp.ejecutar(e);
    actual.push(valor);
  }
}
