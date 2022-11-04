
import { Arreglo } from "../arreglo";
import { Entorno } from "../entorno";
import { Instruccion } from "../instruccion";

export class AccesoArregloSimple extends Instruccion {

  id: string;
  lista_accesos: Array<Instruccion>;

  constructor(linea: string, id: string, lista_accesos: Array<Instruccion>) {
    super(linea);
    Object.assign(this, { id, lista_accesos });
  }

  ejecutar(e: Entorno) {
    const variable = e.getVariable(this.id);
    let res = variable.getValor();

    for (let i = 0; i < this.lista_accesos.length; i++) {
      const index = this.lista_accesos[i].ejecutar(e);
      if (i == this.lista_accesos.length - 1) {
        if (res instanceof Arreglo) {
          return res.getValue(index);
        }
      }
      else {
        if (res instanceof Arreglo) {
          res = res.getValue(index);
        }
      }
    }
  }

}
