
import { Arreglo } from "../../arreglo";
import { Entorno } from "../../entorno";
import { Instruccion } from "../../instruccion";
import * as _ from 'lodash';

export class AsignacionArreglo extends Instruccion {
  linea: string;
  id: string;
  lista_accesos: Array<Instruccion>;
  tipo_igual: string;
  exp: Instruccion;

  constructor(linea: string, id: string, lista_accesos: Array<Instruccion>, tipo_igual: string, exp: Instruccion) {
    super(linea);
    Object.assign(this, { id, lista_accesos, tipo_igual, exp });
  }

  ejecutar(e: Entorno) {
    //Busqueda en el entorno
    const variable = e.getVariable(this.id);

    let res = variable.getValor();
    let valor_a_asignar = this.exp.ejecutar(e);
    valor_a_asignar = _.cloneDeep(valor_a_asignar);

    for (let i = 0; i < this.lista_accesos.length; i++) {
      const index = this.lista_accesos[i].ejecutar(e);

      if (res instanceof Arreglo) {
        if (!res.hasIndex(index)) {
        }
        //Si ya es el ultimo acceso
        if (i == this.lista_accesos.length - 1) {
          if(this.tipo_igual == '='){
            res.setValue(index, valor_a_asignar);
          }
          else {
            const nuevo_valor = this.tipo_igual == '+=' ? res.getValue(index) + valor_a_asignar : res.getValue(index) - valor_a_asignar;
            res.setValue(index, nuevo_valor);
          }
        }
        //Si aun no es el ultimo acceso
        else {
          res = res.getValue(index);
        }
      }
    }

  }

}
