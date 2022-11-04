
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";

export class Not extends Instruccion {
  exp: Instruccion;

  constructor(linea: string, exp: Instruccion) {
    super(linea);
    Object.assign(this, { exp });
  }

  ejecutar(e: Entorno) {
    const exp1 = this.exp.ejecutar(e);
    return !exp1;
  }
}
